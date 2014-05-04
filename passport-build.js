(function(){
	var conf = require('./config');
	var passport = require('passport');
	var FacebookStrategy = require('passport-facebook').Strategy
	var User = require('./lib/User');
	passport.use(new FacebookStrategy({
			clientID: conf.fb.client_id,
			clientSecret: conf.fb.secret,
			callbackURL: conf.fb.callback
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({fbid:profile.id}, function(err, user){
				if(!user){
					new User({
						fbid:profile.id
					  , username: profile.username
					  , date:new Date()
					  , displayName: profile.displayName
					  , raw : profile._raw
					  , accessToken: accessToken
					  , refreshToken: refreshToken
					})
					.save(function(err, user){
						if(err) throw err;
						done(null, user);

					});
				}else{
					// update user
					user.username =  profile.username;
					user.displayName = profile.displayName;
					user.raw = profile._raw;
					user.accessToken = accessToken;
					user.refreshToken = refreshToken;
					user.save(function(err, user){
						if(err) throw err;
						done(null, user);
					});
				}
			});
		}
	));

	passport.serializeUser(function(user, done) {
	  done(null, user.fbid);
	});

	passport.deserializeUser(function(id, done) {
	  User.findOne({fbid:id}, function(err, user){
	  	done(err, user);
	  });
	});
})();
