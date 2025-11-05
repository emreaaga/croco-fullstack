import request from 'supertest';
import app from '../src/app.js';
import { pool } from '../src/config/index.js';

describe('Application API', () => {
  afterAll(async () => {
    await pool.end();
  });

  let appId;

  test('POST /api/applications -> should create new application', async () => {
    const newApp = {
      name: 'test application',
      siteUrl: 'https://github.com/emreaaga',
      email: 'test@gmail.com',
      phoneNumber: '+998912345678',
    };
    const res = await request(app)
      .post('/api/applications')
      .send(newApp)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);

    appId = res.body.data?.id || res.body.id;
    expect(appId).toBeDefined();
  });

  test('GET /api/applications -> should return a paginated list', async () => {
    const res = await request(app).get('/api/applications');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);

    expect(res.body.data[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      siteUrl: expect.stringMatching(/^https?:\/\//),
      email: expect.stringMatching(/@/),
      phoneNumber: expect.any(String),
      createdAt: expect.any(String),
    });

    expect(res.body.pagination).toMatchObject({
      total: expect.any(Number),
      totalPages: expect.any(Number),
      hasNext: expect.any(Boolean),
      page: expect.any(String),
      page_size: expect.any(String),
    });
  });

  test('DELETE /api/applications delete application', async () => {
    const res = await request(app).delete(`/api/applications/${appId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
