const { describe, it } = require('node:test');
const assert = require('node:assert');
const { CONFIG } = require('../src/server');

describe('Payment Ingress TLS 1.3 Hardening Tests (DEMO-14)', () => {
  it('enforces TLS 1.3 as minimum protocol version', () => {
    assert.strictEqual(CONFIG.tlsMinVersion, 'TLSv1.3');
  });

  it('configures modern AEAD cipher suites', () => {
    assert.ok(CONFIG.supportedCiphers.includes('TLS_AES_256_GCM_SHA384'));
    assert.ok(CONFIG.supportedCiphers.includes('TLS_CHACHA20_POLY1305_SHA256'));
  });

  it('exposes repository traceability under DEMO-21 requirements', () => {
    assert.strictEqual(CONFIG.serviceName, 'payment-ingress-gateway');
  });
});
