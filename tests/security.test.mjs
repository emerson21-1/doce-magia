import {
  sanitizeUserUpdate,
  assertOwnsResource,
  rateLimit,
  assertPriceFromCatalog,
  esc
} from '../src/js/security.js';

let pass = 0, fail = 0;
function t(name, fn) {
  try { fn(); pass++; console.log('  PASS  ' + name); }
  catch (e) { fail++; console.log('  FAIL  ' + name + ' :: ' + e.message); }
}

console.log('\n=== Test 1: Mass-assignment / privilege escalation ===');
t('bloqueia is_admin', () => {
  const out = sanitizeUserUpdate({ name: 'Ana', is_admin: true });
  if (out.is_admin !== undefined) throw new Error('is_admin passou!');
  if (out.name !== 'Ana') throw new Error('nome válido foi perdido');
});
t('bloqueia plan/credits/premium', () => {
  const out = sanitizeUserUpdate({ plan: 'pro', credits: 9999, premium: true });
  if (Object.keys(out).length !== 0) throw new Error('campos proibidos escaparam');
});
t('bloqueia trocar id/user_id', () => {
  const out = sanitizeUserUpdate({ id: 'outro', user_id: 'outro' });
  if (Object.keys(out).length !== 0) throw new Error('id escapou!');
});
t('strip campo desconhecido com warning', () => {
  const out = sanitizeUserUpdate({ name: 'Ana', cpf: '123' });
  if (out.cpf !== undefined) throw new Error('cpf escapou');
  if (out.name !== 'Ana') throw new Error('name perdido');
});
t('bloqueia payload não-objeto', () => {
  try { sanitizeUserUpdate(null); throw new Error('não bloqueou null'); }
  catch (e) { if (!e.message.includes('payload')) throw e; }
});

console.log('\n=== Test 2: IDOR ===');
t('bloqueia trocar ID pra ler outro user', () => {
  try { assertOwnsResource('meu-id-123', 'outro-id-456'); throw new Error('deixou passar'); }
  catch (e) { if (!e.message.includes('IDOR')) throw e; }
});
t('permite mesmo user', () => {
  assertOwnsResource('meu-id-123', 'meu-id-123');
});
t('bloqueia sem login', () => {
  try { assertOwnsResource(null, 'qualquer'); throw new Error('deixou sem user'); }
  catch (e) { if (!e.message.includes('No current user')) throw e; }
});
t('trata ID como string (evita bypass de tipo)', () => {
  // Atacante pode mandar "123" vs 123; ambos devem virar string pra comparar.
  try { assertOwnsResource('123', 456); throw new Error('deixou ID numerico diferente'); }
  catch (e) { if (!e.message.includes('IDOR')) throw e; }
});
t('allowAdmin respeitado', () => {
  assertOwnsResource('admin-1', 'user-2', { allowAdmin: true });
});

console.log('\n=== Test 3: Rate limit ===');
t('permite ate o limite', () => {
  for (let i = 0; i < 5; i++) {
    if (!rateLimit('test3', { max: 5, windowMs: 60000 })) throw new Error('bloqueou cedo demais');
  }
});
t('bloqueia na 6a chamada', () => {
  if (rateLimit('test3', { max: 5, windowMs: 60000 })) throw new Error('6a deveria bloquear');
});
t('chaves diferentes tem buckets separados', () => {
  if (!rateLimit('test3-outra', { max: 5, windowMs: 60000 })) throw new Error('cross-talk');
});

console.log('\n=== Test 4: Tampering de preco ===');
const CATALOG = [{ id: 1, price: 64 }, { id: 2, price: 85 }];
t('preco correto passa', () => {
  const total = assertPriceFromCatalog({ productId: 1, qty: 2, unitPrice: 64 }, CATALOG);
  if (total !== 128) throw new Error('total errado: ' + total);
});
t('preco adulterado ($0.01) bloqueia', () => {
  try { assertPriceFromCatalog({ productId: 1, qty: 1, unitPrice: 0.01 }, CATALOG); throw new Error('aceitou'); }
  catch (e) { if (!e.message.includes('tampering')) throw e; }
});
t('preco adulterado (R$1) bloqueia', () => {
  try { assertPriceFromCatalog({ productId: 1, qty: 1, unitPrice: 1 }, CATALOG); throw new Error('aceitou'); }
  catch (e) { if (!e.message.includes('tampering')) throw e; }
});
t('produto inexistente bloqueia', () => {
  try { assertPriceFromCatalog({ productId: 999, qty: 1, unitPrice: 64 }, CATALOG); throw new Error('aceitou'); }
  catch (e) { if (!e.message.includes('Unknown')) throw e; }
});
t('unitPrice invalido bloqueia', () => {
  try { assertPriceFromCatalog({ productId: 1, qty: 1 }, CATALOG); throw new Error('aceitou sem unitPrice'); }
  catch (e) { if (!e.message.includes('missing')) throw e; }
});

console.log('\n=== Test 5: XSS via esc() ===');
t('escapa <script>', () => {
  const out = esc('<script>alert(1)</script>');
  if (out.includes('<script>')) throw new Error('XSS escapou: ' + out);
});
t('escapa atributo malicioso', () => {
  const out = esc('" onerror="alert(1)');
  if (!out.includes('&quot;')) throw new Error('aspas não escaparam');
});
t('escapa null/undefined', () => {
  if (esc(null) !== '' || esc(undefined) !== '') throw new Error('não trata nulos');
});

console.log('\n=== Resultado ===');
console.log(`  ${pass} passaram, ${fail} falharam`);
if (fail > 0) process.exit(1);
