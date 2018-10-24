import { Router } from 'express';
let indexRouter = Router();

indexRouter.get('/', function(req, res, next) {
  res.json({
    hey: "This is the response"
  });
});

export default indexRouter;
