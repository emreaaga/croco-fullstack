import request from 'supertest';
import app from '../src/app.js';

describe('Application API', () => {
  test('GET /api/applications should return a list of paginated applications', async () => {
    const res = await request(app).get('/api/applications');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
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
});
