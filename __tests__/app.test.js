const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('complex-apis routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user with POST', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ email: 'a@aaa.com', password: '1234' });

    expect(res.body).toEqual({
      id: expect.any(String),
    });
  });
});
