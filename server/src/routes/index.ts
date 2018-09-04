let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    hey: "This is the response"
  });
});

module.exports = router;
