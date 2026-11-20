const assert = require('node:assert');
const { CONFIG } = require('../src/server');

describe('Payment Ingress Baseline Tests', () => {
  it('loads configuration with service identifier', () => {
    assert.strictEqual(CONFIG.serviceName, 'payment-ingress-gateway');
  });

  it('runs baseline network port configuration', () => {
    assert.ok(CONFIG.port >= 1000);
  });
});
