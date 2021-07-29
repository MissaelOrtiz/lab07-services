import { Router } from 'express';
import Reading from '../models/Reading';
import ReadingService from '../services/ReadingService.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const reading = await ReadingService.generateReading(req.body);

      res.send(reading);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const reading = await Reading.getById(id);

      res.send(reading);
    } catch (err) {
      next(err);
    }
  });
