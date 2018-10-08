import { Router } from 'express';
let router = Router();
import { Incident } from '../models/incident';

router.get('/', function(req, res, next) {
  Incident.find({})
    .sort({ pubDate: -1 })
    .limit(100)
    .then(function(incidents) {
      res.json(incidents);
    });
});

module.exports = router;
