'use strict';

var intentions = require('../intentions.json');

exports.view = function(req, res){
	res.render('home');
	console.log(intentions.intentions);
};

exports.login = function(req, res){
	res.render('login');
};

exports.previous_intention = function(req, res){
	res.render('previous-intention', {
		"intentions": intentions.intentions
	});
}

