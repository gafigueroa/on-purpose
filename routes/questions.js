'use strict';

var data = require('../data.json');

exports.view = function(req, res){
	console.log(data);
	res.render('questions',{
		'questions':data.questions
	});
};




