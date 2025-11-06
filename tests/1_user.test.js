import request from 'supertest';

import app from '../src/app.js';
import { pool } from '../src/config/index.js';

describe('User API', () => {
  afterAll(async () => {
    await pool.end();
  });

  const newUser = {
    name: 'test',
    email: 'test@gmail.com',
    password: 'test123',
  };
  const statuses = ['rejected', 'approved'];
  let userId, cookies;

  test('POST /api/auth/register -> register user', async () => {
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

  test('POST /api/auth/login -> login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: newUser.email, password: newUser.password })
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();

    cookies = res.headers['set-cookie'];
    cookies = res.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
  });

  test.each(statuses)(`PATCH /api/users/${userId} -> should update status to %s`, async status => {
    const res = await request(app)
      .patch(`/api/users/${userId}`)
      .send({ status })
      .set('Accept', 'application/json')
      .set('Cookie', cookies);

    expect(res.statusCode).toBe(200);
  });

  test('GET /api/users -> should return a paginated list', async () => {
    const res = await request(app).get('/api/users').set('Cookie', cookies);

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

  test('GET /api/auth/me -> get me', async () => {
    const res = await request(app).get('/api/auth/me').set('Cookie', cookies);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.stringMatching(/@/),
      role: expect.any(String),
      is_email_verifed: expect.any(Boolean),
    });
  });

  test('GET /api/auth/refresh -> should refesh access token', async () => {
    const res = await request(app)
      .get('/api/auth/refresh')
      .set('Accept', 'application/json')
      .set('Cookie', cookies);

    expect(res.statusCode).toBe(200);

    expect(res.headers['set-cookie']).toBeDefined();
    cookies = res.headers['set-cookie'];
    cookies = res.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
  });

  test('POST /api/auth/change-password - should change user password', async () => {
    const newPassword = 'test1234';

    const res = await request(app)
      .post('/api/auth/change-password')
      .send({ old_password: newUser.password, password: newPassword })
      .set('Accept', 'application/json')
      .set('Cookie', cookies);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    newUser.password = newPassword;

    const newLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: newUser.email, password: newUser.password })
      .set('Accept', 'application/json');

    cookies = newLogin.headers['set-cookie'];
    cookies = newLogin.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
  });

  test('POST /api/auth/logout -> should logout user (delete session)', async () => {
    const res = await request(app).post('/api/auth/logout').set('Cookie', cookies);

    expect(res.statusCode).toBe(200);
  });
});
