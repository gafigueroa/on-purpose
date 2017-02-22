'use strict';

var data = require('../intentions.json');

exports.view = function(req, res){
	res.render('new-intention', {
		"intentions": data.intentions
	});
};


exports.save_intention = function(req, res){
	var new_data = req.body;
	var new_id = data.intentions[data.intentions.length - 1].id + 1;
	console.log(new_id);
	new_data["id"] = new_id;
	data.intentions.push(new_data);
}