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
  })
  .get('/', async (req, res, next) => {
    try {
      const readings = await Reading.getAll();

      res.send(readings);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { spread } = req.body;

      const updatedReading = await ReadingService.updateReading(id, spread);

      res.send(updatedReading);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Reading.deleteById(id);

      res.send({ message: 'This reading does not exist.' });
    }catch (err) {
      next(err);
    }
  });
