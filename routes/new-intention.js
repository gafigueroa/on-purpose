'use strict';

var data = require('../intentions.json');

exports.view = function(req, res){
	res.render('new-intention', {
		"intentions": data.intentions
	});
};


exports.save_intention = function(req, res){
	var new_data = req.body;
	data.intentions.push(new_data);
}