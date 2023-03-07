var express = require('express');
var router = express.Router();
const controller = require('../controles/main');

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
