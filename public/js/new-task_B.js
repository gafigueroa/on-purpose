'use strict';

var saved = {};

function initializePage() {


}

function pressed(name, save) {
	if (save){
		saved[name] = true;
	}
	$("#location-info").hide();
	$("#description-info").hide();
	$("#"+name).fadeIn();

	var count = Object.keys(saved).length;
	if (count == 2){
		$("#sendButton").addClass("button-balanced");
	}

	console.log(count);
}


function startIntention(title, description, duration) {
	var count = Object.keys(saved).length;
	if (count == 2){
		$.post("/save_intention",{
			"title": title,
			"description": description
		}, changeToQuestion);
	}
}

function changeToQuestion(result){
	console.log(result.id);
	window.location.href = "/questions/"+result.id;
}




