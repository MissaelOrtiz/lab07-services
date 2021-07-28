import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reading from '../lib/models/Reading.js';

describe('demo reading routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new reading via POST', async () => {
    const reading = { spread: '3' };
    const res = await request(app).post('/api/v1/readings').send(reading);
    // const fakeCards = expect.any(String);
    // This will be inserted into cards later.
    expect(res.body).toEqual({ id: '1', ...reading, cards: null });
  });
});
