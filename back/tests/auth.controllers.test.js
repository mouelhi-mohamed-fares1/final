// Assuming you're using supertest to test your Express app
const request = require('supertest');
const app = require('../server'); // Path to your server file
const User = require('../models/user.model'); // Path to your User model

describe('POST /register', () => {
  beforeEach(async () => {
    // Set up your test data before each test
    await User.create({ username: 'stainnntestUser', password: 'testPassword', role: 'user' });
  });

  it('should create a new user and return 201 status code', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'faridtest', password: 'faridtest', role: 'user'});

      // If the status code is not 200, log the response body
  if (res.statusCode !== 201) {
    console.log(res.statusCode, res.body);
  }
    // Check the HTTP status code
    expect(res.statusCode).toEqual(201);

    // Check the newly created user in the database
    const user = await User.findOne({ username: 'faridtest' });
    expect(user).not.toBeNull();
  });
});