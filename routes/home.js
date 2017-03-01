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
	intentions.intentions.reverse();
	res.render('previous-intention', {
		"intentions": intentions.intentions
	});
}

exports.intermediate_page = function(req,res){
	var id = req.params.id;

	var intention_found = false;

	for (var i = 0; i < intentions.intentions.length; i++){
		if (parseInt(intentions.intentions[i].id) == parseInt(id)){
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
