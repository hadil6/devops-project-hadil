const request = require('supertest');
const app = require('../index.js');

describe('API DevOps Tests', () => {
  test('GET /health returns UP', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  test('GET /fruits returns fruit list', async () => {
    const res = await request(app).get('/fruits');
    expect(res.statusCode).toBe(200);
    expect(res.body.fruits).toContain('pomme');
  });

  test('POST /fruits adds a new fruit', async () => {
    const res = await request(app).post('/fruits').send({ name: 'kiwi' });
    expect(res.statusCode).toBe(200);
    expect(res.body.fruits).toContain('kiwi');
  });

  test('POST /fruits without name returns 400', async () => {
    const res = await request(app).post('/fruits').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Nom de fruit manquant');
  });
});
