var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/', function(req, res) {
	res.render('home', { title: 'Express' });
});

module.exports = router;
