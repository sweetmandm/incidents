import { Router } from 'express';
let router = Router();

router.get('/', function(req, res, next) {
  res.json({
    hey: "This is the response"
  });
});

module.exports = router;
