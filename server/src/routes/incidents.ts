import { Router } from 'express';
let incidentsRouter = Router();
import { Incident } from '../models/incident';

incidentsRouter.get('/', function(req, res, next) {
  Incident.find({})
    .sort({ pubDate: -1 })
    .limit(100)
    .then(function(incidents) {
      res.json(incidents);
    });
});

export default incidentsRouter;
