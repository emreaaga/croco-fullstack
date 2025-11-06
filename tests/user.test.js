import app from '../src/app.js';
import request from 'supertest';

import { pool } from '../src/config/index.js';

describe('User API', () => {
  afterAll(async () => {
    await pool.end();
  });

  let userId;
  const statuses = ['approved', 'rejected'];

  test('POST /auth/register -> register user', async () => {
    const newUser = {
      name: 'test',
      email: 'testttt@gmail.com',
      password: 'testexample',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data');

    expect(res.body.data).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.stringMatching(/@/),
    });

    userId = res.body.data.id;
  });

  test('GET /api/users -> should return a paginated list', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);

    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);

    expect(res.body.data[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.stringMatching(/@/),
      status: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(res.body.pagination).toMatchObject({
      total: expect.any(Number),
      totalPages: expect.any(Number),
      hasNext: expect.any(Boolean),
      page: expect.any(String),
      page_size: expect.any(String),
    });
  });

  test.each(statuses)(`PATCH /api/users/${userId} -> should update status to %s`, async status => {
    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .send({ status })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test(`DELETE /api/users/${userId} -> should delete a user successfully`, async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
  });
});
