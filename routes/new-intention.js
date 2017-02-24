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
	new_data["id"] = new_id;
	data.intentions.push(new_data);
	res.json(new_data);
}

exports.save_answers = function(req, res){
	var new_data = req.body;
	
	var id = new_data.id;
	var answers = new_data.answers;
	var data = require('../intentions.json');
	console.log(new_data);
	for (var i = 0; i < data.intentions.length; i++) {
		var intention = data.intentions[i];
		if (intention.id == id){
			intention["answers"] = [];
			for (var i = 0; i < answers.length; i++) {
				intention.answers.push(answers[i]);
			}
		}
	}
	console.log(data);
}