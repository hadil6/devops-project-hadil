const express = require('express');
const pino = require('pino');
const { collectDefaultMetrics, Counter, Histogram, register } = require('prom-client');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(express.json());

const logger = pino();

collectDefaultMetrics();
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP Requests',
  labelNames: ['method', 'route', 'status']
});
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestsTotal.inc({ method: req.method, route: req.path, status: res.statusCode });
    httpRequestDuration.observe({ method: req.method, route: req.path, status: res.statusCode }, duration);
    logger.info({ msg: 'Incoming request', id: uuidv4(), method: req.method, url: req.url });
  });
  next();
});

app.get('/', (req, res) => res.json({ message: 'Bienvenue sur mon API DevOps !' }));
app.get('/health', (req, res) => res.json({ status: 'UP' }));

const fruits = ['pomme','banane','orange'];
app.get('/fruits', (req, res) => res.json({ fruits }));
app.post('/fruits', (req, res) => {
  const { name } = req.body;
  if (name) {
    fruits.push(name);
    res.json({ message: `Fruit ${name} ajouté !`, fruits });
  } else {
    res.status(400).json({ error: 'Nom de fruit manquant' });
  }
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
// Ajouter après les autres routes
app.get('/trace', (req, res) => {
  const traceId = uuidv4(); // Génère un identifiant unique
  logger.info({ msg: 'Trace request received', id: traceId, method: req.method, url: req.url });
  res.json({ message: 'Trace enregistrée !', traceId });
});


module.exports = app; // ← important pour les tests
