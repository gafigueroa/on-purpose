'use strict';

var answers = [];

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".question-info").hide();
	$('div.question-info:eq(0)').fadeIn();
}


function pressed(name, question, answer) {
	var saved = {
		"question":question,
		"answer":answer
	}
	answers.push(saved);
	$(".question-info").hide();
	$("#"+name).fadeIn();
}

function getColor(colors){
	var color = colors[0];
	colors.splice(0,1);
	return color;
}

function saveAnswers(id){
	console.log(answers);
	$.post("/save_answers",{
		"id": id,
		"answers":answers
	})
}




