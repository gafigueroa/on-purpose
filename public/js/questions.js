'use strict';

var answers = [];

var saved_question = {};

var intention_id = 0;

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".question-info").hide();
	$('div.question-info:eq(0)').fadeIn();
}


function pressed(name, question, answer, save) {
	$(".question-info").hide();
	$("#"+name).fadeIn();
	if (save){
		if (question in saved_question){

		}else{
			saved_question[question] = true;
			var saved = {
				"question":question,
				"answer":answer
			}
		answers.push(saved);
		}
	}
	var count = Object.keys(saved_question).length;
	if (count == 3){
		$("#sendButton").addClass("button-balanced");
	}
}

function getColor(colors){
	var color = colors[0];
	colors.splice(0,1);
	return color;
}

function saveAnswers(id, back){
	intention_id = id;
	var count = Object.keys(saved_question).length;
	if (count == 3){
		$.post("/save_answers",{
			"id": id,
			"answers":answers
		}, changeToHome);
	}
}

function changeToHome(result){
	/*
	If we want to test the intermediate page, uncomment this
	window.location.href = "/intermediate/"+intention_id;
	*/
	window.location.href = '/home';
	
}




