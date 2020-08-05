var express = require('express');
var router = express.Router();




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* 
  http://localhost:3000/usres/find/
*/

router.get("/find/:name", function(req, res, next) {
    res.send("Hello USER!!!!");
});

module.exports = router;