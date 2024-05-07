// leave.controllers.test.js

require('dotenv').config({ path: '../../.env' });
const request = require('supertest');
const app = require('../server'); // Path to your Express server file
const Leave = require('../models/leave.model'); // Path to your Leave model
const User = require('../models/user.model'); // Path to your User model

describe('Leave Controller', () => {
  let userToken;
  let userId;
  
  beforeEach(async () => {
    try {
     
    
    
      userToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMyY2I1OWFkMDcxNGQyMjZiYjc0NDciLCJ1c2VybmFtZSI6ImtoYWxpbCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE0NjA0ODk5LCJleHAiOjE3MTQ3Nzc2OTl9.UgyCII9CTd4uqOMkKAHJIdH4uaQFE78dXNFEJyJ42X4";
    } catch (error) {
      console.error(error);
    }
  }, 30000);
  
  afterEach(async () => {
    // Delete the test user after each test
    await User.deleteOne({ username: 'khalil' });
  }, 30000);
  
  describe('POST /leave', () => {
  const startDate1=Date.parse("2024-01-01");
  const endDate1=Date.parse("2024-01-02");
    it('should create a new leave and return 201 status code', async () => {
      const res = await request(app)
        .post('/api/leaves')
        .set('Authorization', `${userToken}`)
        .send({ startDate: startDate1, endDate: endDate1 });
  
      expect(res.statusCode).toEqual(201);
      expect(new Date(res.body.startDate).getTime()).toEqual(startDate1);
      expect(new Date(res.body.endDate).getTime()).toEqual(endDate1);
    }, 30000);
  });
  
  describe('GET /leave', () => {
    it('should get all leaves for the user and return 200 status code', async () => {
  
  
  
      const res = await request(app)
        .get('/api/leaves')
        .set('Authorization', `${userToken}`);
  
      expect(res.statusCode).toEqual(200);
  
    }, 30000);
  });
});