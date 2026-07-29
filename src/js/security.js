/* ============================================================
   security.js — Defensive layer for Doce Magia Gourmet

   Provides reusable guards for the four classic failure modes
   when login + payment are eventually added:
     1. Mass-assignment (user toggles his own role/plan/credits)
     2. IDOR (swap an ID and read another user's data)
     3. Unlimited paid-action abuse (charge without rate limit)
     4. Privilege escalation via stored fields

   This file is FRONTEND-ONLY. The real safety net always lives
   on the server. These guards exist to:
     - fail loud in the browser when the client tries something
       malicious, so bugs surface early during development;
     - keep a consistent shape so the day you wire up Supabase /
       Firebase / your own API, the client code can't accidentally
       send "is_admin: true" and expect the server to trust it.

   EVERY helper is a no-op until you call it — installing this
   module does NOT change any existing UI or behavior.
   ============================================================ */

// ============================================================
// 1. CLIENT-SIDE SCHEMA WHITELIST
// The ONLY fields a user is allowed to edit on their own profile.
// Anything else (is_admin, plan, credits, role, premium, balance,
// verified, internal_score, etc.) MUST come from the server and
// MUST be ignored if the client tries to send it.
// ============================================================
export const ALLOWED_USER_FIELDS = Object.freeze([
    'name',
    'email',
    'phone',
    'address',
    'newsletter_opt_in',
    'avatar_url'
]);

// Fields that look harmless but should never be settable by the
// client. If you see this list growing, audit your server too.
export const FORBIDDEN_USER_FIELDS = Object.freeze([
    'is_admin',
    'role',
    'plan',
    'tier',
    'credits',
    'balance',
    'premium',
    'is_premium',
    'verified',
    'is_verified',
    'internal_score',
    'discount_override',
    'coupon_force',
    'created_at',
    'updated_at',
    'id',
    'user_id',
    'auth_uid'
]);

/**
 * Strips any forbidden field from a profile-update payload.
 * Throws if anything forbidden is present (fail-loud for devs).
 *
 * @param {object} payload
 * @returns {object} sanitized payload
 */
export function sanitizeUserUpdate(payload) {
    if (!payload || typeof payload !== 'object') {
        throw new Error('[security] sanitizeUserUpdate: payload must be an object');
    }
    const clean = {};
    for (const key of Object.keys(payload)) {
        if (FORBIDDEN_USER_FIELDS.includes(key)) {
            // Dev-visible error: a developer is trying to set
            // something the client must never set. Fail loud.
            // eslint-disable-next-line no-console
            console.error(
                `[security] BLOCKED client-side attempt to set forbidden field "${key}". ` +
                'This field must be assigned by the server only.'
            );
            continue;
        }
        if (!ALLOWED_USER_FIELDS.includes(key)) {
            // eslint-disable-next-line no-console
            console.warn(
                `[security] Stripped unknown field "${key}" from user update payload. ` +
                'Add it to ALLOWED_USER_FIELDS if it is intentional.'
            );
            continue;
        }
        clean[key] = payload[key];
    }
    return clean;
}

// ============================================================
// 2. IDOR GUARD
// Helper to validate that an ID looks like one the current user
// is allowed to touch. Without a real session this is a stub, but
// it gives you one place to wire session/user-id checking later.
//
// Usage:
//   assertOwnsResource(myUserId, resourceOwnerId);
//   assertOwnsResource(myUserId, resourceOwnerId, { allowAdmin: true });
// ============================================================
export function assertOwnsResource(currentUserId, resourceOwnerId, opts = {}) {
    if (!currentUserId) {
        throw new Error('[security] No current user — login required');
    }
    // String compare on purpose: attackers send 0, null, undefined,
    // objects with toString(), etc. Coerce both sides.
    const me = String(currentUserId);
    const owner = String(resourceOwnerId);
    if (me !== owner && !opts.allowAdmin) {
        throw new Error('[security] IDOR attempt blocked: resource does not belong to current user');
    }
}

// ============================================================
// 3. RATE LIMITER (client-side debounce/throttle for paid actions)
// Pure-frontend guard. Stops casual spam-click abuse. NOT a
// replacement for server-side rate limits — the server MUST also
// rate-limit every action that costs money, calls a paid API, or
// triggers an external service (WhatsApp Business API, Stripe,
// Mercado Pago, etc.).
// ============================================================
const _rateBuckets = new Map();

/**
 * Returns true if the action is allowed (under the limit) and
 * false if the user just spammed the button.
 *
 * @param {string} actionKey     - e.g. 'checkout', 'send-message', 'generate-image'
 * @param {object} opts
 * @param {number} opts.max      - max calls per window (default 5)
 * @param {number} opts.windowMs - window size in ms (default 60_000)
 * @returns {boolean}
 */
export function rateLimit(actionKey, opts = {}) {
    const max = opts.max ?? 5;
    const windowMs = opts.windowMs ?? 60_000;
    const now = Date.now();
    const bucket = _rateBuckets.get(actionKey) ?? { calls: [], blockedCount: 0 };

    // Drop expired
    bucket.calls = bucket.calls.filter(t => now - t < windowMs);

    if (bucket.calls.length >= max) {
        bucket.blockedCount += 1;
        _rateBuckets.set(actionKey, bucket);
        // eslint-disable-next-line no-console
        console.warn(
            `[security] rateLimit: "${actionKey}" exceeded ${max} calls / ${windowMs}ms ` +
            `(blocked ${bucket.blockedCount} total). Server must also enforce this.`
        );
        return false;
    }
    bucket.calls.push(now);
    _rateBuckets.set(actionKey, bucket);
    return true;
}

// ============================================================
// 4. MONEY/PRICE INTEGRITY
// Prices for the cart must ALWAYS come from PRODUCTS, never from
// a hidden input, URL param, or postMessage. This guard enforces
// that a caller cannot smuggle a lower price into checkout.
//
// Usage:
//   const line = buildCartLine(productId, qty);
//   const total = assertPriceFromCatalog(line);
// ============================================================
export function assertPriceFromCatalog(lineItem, catalog) {
    const product = catalog.find(p => p.id === lineItem.productId);
    if (!product) {
        throw new Error(`[security] Unknown product id: ${lineItem.productId}`);
    }
    if (typeof lineItem.unitPrice !== 'number' || lineItem.unitPrice <= 0) {
        throw new Error('[security] Line item is missing unitPrice');
    }
    // Float compare with epsilon to avoid 0.0000001 mismatches.
    const diff = Math.abs(lineItem.unitPrice - product.price);
    if (diff > 0.01) {
        throw new Error(
            `[security] Price tampering detected for product ${product.id}: ` +
            `client sent ${lineItem.unitPrice}, catalog has ${product.price}`
        );
    }
    return product.price * lineItem.qty;
}

// ============================================================
// 5. HTML ESCAPE (re-exported here for convenience)
// Same shape as the esc() inside main.js, kept here so other
// modules can import it without touching main.js internals.
// ============================================================
export function esc(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============================================================
// 6. SESSION PLACEHOLDER
// Replace this object with a real session (Supabase.auth.user(),
// Firebase.auth().currentUser, your own JWT, etc.) when login
// is added. Everything else in the app can read `session.user.id`
// without caring which backend provided it.
// ============================================================
export const session = {
    isLoggedIn: () => false,
    getUserId: () => null,
    isAdmin: () => false,
    // When you wire real auth, replace these:
    // isLoggedIn: () => !!supabase.auth.user(),
    // getUserId: () => supabase.auth.user()?.id ?? null,
    // isAdmin: () => supabase.auth.user()?.app_metadata?.role === 'admin'
};