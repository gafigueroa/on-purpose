'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	$(".question-info").hide();
	$("#0").fadeIn();
}


function pressed(name) {
	console.log(name);
	$(".question-info").hide();
	$("#"+name).fadeIn();
}




