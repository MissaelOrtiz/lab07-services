import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
// import Reading from '../lib/models/Reading.js';
import ReadingService from '../lib/services/ReadingService.js';

describe('demo reading routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new reading via POST', async () => {
    const reading = { spread: '3' };
    const res = await request(app).post('/api/v1/readings').send(reading);
    const fakeCards = expect.any(String);
    // This will be inserted into cards later.
    expect(res.body).toEqual({ id: '1', ...reading, cards: fakeCards });
  });

  it('reads an existing reading by id via GET', async () => {
    const reading = await ReadingService.generateReading({ spread: 1 });
    const res = await request(app).get(`/api/v1/readings/${reading.id}`);

    expect(res.body).toEqual(reading);
  });

  it('gets all readings via GET', async () => {
    const reading1 = await ReadingService.generateReading({ spread: 1 });
    const reading2 = await ReadingService.generateReading({ spread: 1 });
    const res = await request(app).get('/api/v1/readings');

    expect(res.body).toEqual([reading1, reading2]);
  });
  
  it('updates a reading by id via PUT', async () => {
    const update = { spread: '2' };
    const reading = await ReadingService.generateReading({ spread: 1 });
    const res = await request(app).put(`/api/v1/readings/${reading.id}`).send(update);
    const fakeCards = expect.any(String);

    expect(res.body).toEqual({ id: '1', ...update, cards: fakeCards });
  });

  it('deletes a reading by id via DELETE', async () => {
    const reading = await ReadingService.generateReading({ spread: 1 });
    const res = await request(app).delete(`/api/v1/readings/${reading.id}`);

    expect(res.body).toEqual({ message: 'This reading does not exist.' });
  });
});
