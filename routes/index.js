var express = require('express');
var router = express.Router();
var request = require("request");

/* GET home page. */
router.get('/', function(req, res) {
	request("http://127.0.0.1:3000/sources/", function(err, resp, body){
		console.log(body);
		res.render('home', { title: 'Express' });
	});
});
router.get('/article', function(req, res) {
	res.render('article', { title: 'Express' });
});

module.exports = router;
