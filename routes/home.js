'use strict';

var intentions = require('../intentions.json');

exports.view = function(req, res){
	res.render('home');
	console.log(intentions.intentions);
};

exports.login = function(req, res){
	res.render('login');
};

exports.delete_intention = function(req, res){
	var intention = null;
	for (var i = 0; i < intentions.intentions.length; i++){ 
		intention = intentions.intentions[i];
		if (intention != null && parseInt(intention.id) == parseInt(req.params.id)) {
			delete intentions.intentions[i];
		}
	}
	res.json({});
}

exports.previous_intention = function(req, res){
	var moods = ["very positive",
			"positive", 
			"somewhat positive", 
			"neutral", 
			"somewhat negative", 
			"negative",
			"very negative"];

	var intentions_copy = [];
	for (var i = intentions.intentions.length - 1; i >= 0; i--) {
		if (intentions.intentions[i] != null){
			intentions_copy.push(intentions.intentions[i]);
		}
	}
	console.log("start");
	for (var i = 0; i < intentions_copy; i++){
		var intention = intentions_copy[i];
		var mean_score = intention.score;
		if (mean_score < -10){
			mean_score = -10;
		}
		if (mean_score > 10){
			mean_score = 10;
		}
		mean_score += 10;
		var mood_position = 6 - Math.floor(mean_score/3); 
		var text = "Average mood of your answers: "
		text += moods[mood_position];
		intention['sentiment'] = text;

	}
	res.render('previous-intention', {
		"intentions": intentions_copy
	});
}

exports.intermediate_page = function(req,res){
	var id = req.params.id;

	var intention_found = false;

	for (var i = 0; i < intentions.intentions.length; i++){
		var intention = intentions.intentions[i];
		if (intention != null && parseInt(intention.id) == parseInt(id)){
			var intention = intentions.intentions[i];
			intention_found = true;
			res.render('intermediate', {
				'intention':intention.title,
				'id':id
			});
		}
	}

	if (!intention_found){
		res.render('intermediate', {
				'intention':"",
				'id':0
		});
	}
}
