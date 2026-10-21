import { jest } from '@jest/globals';
import request from 'supertest';

jest.unstable_mockModule('./models/User.js', () => ({
  default: {
    find: jest.fn(() => ({
      select: jest.fn().mockResolvedValue([])
    }))
  }
}));

const { default: app } = await import('./app.js');

describe('GET /api/', () => {
  test('debe responder con el código 200', async () => {
    const response = await request(app).get('/api/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});