var mongoose = require('mongoose');
var db = require('../../db').db;
var schema = exports.Schema = mongoose.Schema(
		{
			type:'string',
			fbid:'number',
			accessToken:'string',
			refreshToken:'string',
			username:"string",
			website:{type:'string', default:''},
			screen_name:"string",
			following:{type:'number', default:0},
			following_l:[{user:{type:mongoose.Schema.Types.ObjectId}, date:{type:'date', default:Date.now}}],
			followers:{type:'number', default:0},
			raw:{},
			featured:'boolean',
			date:'date',
			ip:'string',
			permissions:'array'
		},
		{
			strict:false
		}
	);

module.exports = db.model('users', schema);

var permissions = [
	"articles *",
	"articles create",
	"articles update",
	"articles delete",
	"articles publish",
	"articles view",
	"articles search",
	"comments *",
	"comments create",
	"comments delete",
	"comments view",
	"comments approve",
	"comments flag",
	"users *",
	"users create",
	"users view",
	"users update",
	"users delete"
];