import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Reading from '../lib/models/Reading.js';

describe('demo reading routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
});
