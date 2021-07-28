import { Router } from 'express';
import Reading from '../models/Reading';
// import { ReadingService } from '../services/ReadingService';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const reading = await Reading.insert(req.body);

      res.send(reading);
    } catch (err) {
      next(err);
    }
  });
