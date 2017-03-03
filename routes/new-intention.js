'use strict';

var data = require('../intentions.json');

exports.view = function(req, res){
	res.render('new-intention', {
		"intentions": data.intentions
	});
};

exports.view_A = function(req, res){
	res.render('new-intention_A', {
		"intentions": data.intentions
	});
};

exports.view_B = function(req, res){
	res.render('new-intention_B', {
		"intentions": data.intentions
	});
};

exports.get_intentions_json = function(req, res){
	res.json(data);
}

exports.save_intention = function(req, res){
	var new_data = req.body;
	var new_id = data.intentions[data.intentions.length - 1].id + 1;
	new_data["id"] = new_id;
	data.intentions.push(new_data);
	res.json(new_data);
}


exports.save_answers = function(req, res){
	var sentiment = require('sentiment');

	var new_data = req.body;
	
	var id = new_data.id;
	var answers = new_data.answers;
	var data = require('../intentions.json');
	
	var total_score = 0;
	var quantity = 0;

	for (var i = 0; i < data.intentions.length; i++) {
		var intention = data.intentions[i];
		if (intention.id == id){
			//intention["answers"] = [];
			for (var i = 0; i < answers.length; i++) {
				var sent = sentiment(answers[i].answer);

				//Saves the sentiment analysis results of the answer
				answers[i].score = sent.score;
				answers[i].comparative = sent.comparative;

				total_score += sent.score;
				quantity++;

				intention.answers.push(answers[i]);
				console.log(answers[i]);
			}

			//Saves a mean score of the sentiment analysis
			if (quantity != 0){
				var mean_score = total_score/quantity;
				intention["score"] = mean_score;
			}
		}
	}

	res.json({});
}