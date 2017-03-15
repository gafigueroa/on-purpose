'use strict';

var data = require('../intentions.json');

exports.view = function(req, res){
	res.render('new-intention', {
		"intentions": data.intentions,
		"new":  true
	});
};

exports.viewId = function(req,res){
	var id = req.params.id;
	var intention = null;
	for (var i = 0; i < data.intentions.length; i++){
		var intention = data.intentions[i];
		if (intention != null && parseInt(intention.id) == parseInt(id)){
			res.render('new-intention', {
				"intentions": data.intentions,
				"new": false,
				"title": intention.title,
				"description": intention.description,
				"id": id
			});
		}
	}
}

exports.viewAB = function(req, res){
	var chosenPage = Math.random() < 0.5;
	res.render('new-intention', {
		"intentions": data.intentions,
		"A_version": chosenPage
	});
}

exports.viewA = function(req, res){
	res.render('new-intention', {
		"intentions": data.intentions,
		"A_version": true
	});
};

exports.viewB = function(req, res){
	res.render('new-intention', {
		"intentions": data.intentions,
		"A_version": false
	});
};

exports.get_intentions_json = function(req, res){
	res.json(data);
}

exports.save_intention = function(req, res){
	var new_data = req.body;
	var new_id = 1;

	var intentions_copy = [];
	for (var i = data.intentions.length - 1; i >= 0; i--) {
		if (data.intentions[i] != null){
			intentions_copy.push(data.intentions[i]);
		}
	}
	if (intentions_copy.length > 0){
		var last_intention = intentions_copy[intentions_copy.length - 1];
		if (last_intention != null){
			new_id = last_intention.id + 1;
		}
	}
	new_data["id"] = new_id;
	data.intentions.push(new_data);
	res.json(new_data);
}

exports.edit_intention = function(req,res){
	var id = req.body.id;
	var intention = null;
	for (var i = 0; i < data.intentions.length; i++){
		var intention = data.intentions[i];
		if (intention != null && parseInt(intention.id) == parseInt(id)){
			intention.title = req.body.title;
			intention.description = req.body.description;
		}
	}
	res.json(req.body);
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
		if (intention != null && parseInt(intention.id) == parseInt(id)){
			console.log(intention);
			if (!("answers" in intention)){
				intention["answers"] = [];
			}
			console.log(intention);
			//intention["answers"] = [];
			for (var i = 0; i < answers.length; i++) {
				var sent = sentiment(answers[i].answer);

				//Saves the sentiment analysis results of the answer
				answers[i].score = sent.score;
				answers[i].comparative = sent.comparative;

				total_score += sent.score;
				quantity++;

				intention.answers.push(answers[i]);
				console.log(intention);
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