var express = require('express');
var async = require('async');
var User = require('./User');    

var router = express.Router();

function log(msg){
	console.log("admin: " + msg);
}

router.all('*', function(req,res,next){
	if(req.isAuthenticated()){
		log(req.ip + " requesting");
		return next();
	}
	log("unauthorized request, redirecting");
	return res.redirect('/');
});
router.get('/templates.js');

//generate menu
router.use(function(req,res,next){
	console.log(req.client.authorized)
	//find permissions
	User.findById(req.user._id, function(err,user){
		if(err) throw err;
		var menus = {
			articles:[],
			users:[],

		}
		req.user.menus = menus;
		next();
	});
})

router.get('/', function(req, res) {
	res.render('secret', {menus:req.user.menus});
});
router.get('/users', function(req, res) {
	res.render('users', { title: 'Express' });
});

module.exports = router;
