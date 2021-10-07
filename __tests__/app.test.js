const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const UserService = require('../lib/services/UserService.js');

describe('complex-apis routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user with POST', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      email: 'a@aaa.com',
      pwd: '1234',
    });

    expect(res.body).toEqual({
      id: '1',
      email: 'a@aaa.com',
    });
  });

  it('logs in a user via POST', async () => {
    await UserService.create({
      email: 'a@aaa.com',
      pwd: '1234',
    });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'a@aaa.com', pwd: '1234' });
    expect(res.body).toEqual({
      id: '1',
      email: 'a@aaa.com',
    });
  });
});
