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

  it('should GET a user by id', () => {
    return request(app)
      .get('/api/users/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          email: 'a@aaa.com',
        });
      });
  });

  it('should throw a 400 error if email already exists', async () => {
    await UserService.create({
      email: 'a@aaa.com',
      pwd: '1234',
    });
    const res = await request(app).post('/api/auth/signup').send({
      email: 'a@aaa.com',
      pwd: '1234',
    });
    expect(res.status).toEqual(400);
  });

  it('should throw a 401 error if user inputs invalid credentials', async () => {
    await UserService.create({
      email: 'a@aaa.com',
      pwd: '1234',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'a@abc.com',
      pwd: '6789',
    });
    expect(res.status).toEqual(401);
  });
});
