const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.disconnect(); // Disconnect existing connection if any
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('API Tests', () => {
  describe('POST /api/contact', () => {
    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/contact')
        .send({ name: 'Test', message: 'Hello World' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/fields/i);
    });
  });

  describe('POST /api/projects', () => {
    it('should return 401 without API key', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send({
          title: 'Test',
          description: 'Desc',
          technologies: ['React'],
          imageUrl: 'http://test.com/img.png'
        });
      
      expect(res.statusCode).toBe(401);
    });

    it('should return 201 with valid API key and payload', async () => {
      process.env.ADMIN_API_KEY = 'test-key';
      
      const res = await request(app)
        .post('/api/projects')
        .set('x-api-key', 'test-key')
        .send({
          title: 'New Project',
          description: 'Great project',
          technologies: ['Node.js'],
          imageUrl: 'http://test.com/img.png'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('New Project');
    });
  });
});
