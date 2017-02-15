'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".question-info").hide();
	$('div.question-info:eq(0)').fadeIn();
}


function pressed(name, answer) {
	var sentiment = require('sentiment');
	console.log(name);
	console.log(sentiment(answer));
	$(".question-info").hide();
	$("#"+name).fadeIn();
}

function getColor(colors){
	var color = colors[0];
	colors.splice(0,1);
	return color;
}




