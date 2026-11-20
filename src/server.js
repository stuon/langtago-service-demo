const http = require('node:http');

const CONFIG = {
  port: process.env.PORT || 3000,
  tlsMinVersion: 'TLSv1.2', // Baseline before DEMO-14 upgrade
  serviceName: 'payment-ingress-gateway'
};

function createServer() {
  return http.createServer((req, res) => {
    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ status: 'UP', service: CONFIG.serviceName, minTls: CONFIG.tlsMinVersion }));
    }

    if (req.url === '/v1/charge' && req.method === 'POST') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ success: true, transactionId: 'txn_' + Date.now() }));
    }

    res.writeHead(404);
    res.end();
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(CONFIG.port, () => {
    console.log(`Payment ingress running on port ${CONFIG.port} with ${CONFIG.tlsMinVersion}`);
  });
}

module.exports = { createServer, CONFIG };
