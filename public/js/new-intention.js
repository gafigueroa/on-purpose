'use strict';

var saved = {};
var amount_cards = 0;

$(document).ready(function() {
	initializePage();
})


function initializePage() {
	amount_cards = parseInt($("#amount_cards").text());
	console.log(amount_cards);
}

function pressed(name, save) {
	if (save){
		saved[name] = true;
	}
	$("#location-info").hide();
	$("#description-info").hide();
	$("#duration-info").hide();
	$("#"+name).fadeIn();

	var count = Object.keys(saved).length;
	if (count == amount_cards){
		$("#sendButton").addClass("button-balanced");
	}

	console.log(count);
}

function explainIntention(){
	$("#intentionExplanation").toggle();
	ga('send', 'event', 'help', 'click');
}

function startIntention(title, description, duration) {
	var count = Object.keys(saved).length;

    var mean_amount = description.split(" ").length;
    if (amount_cards == 3){
    	mean_amount += duration.split(" ").length;
    }
    mean_amount /= (amount_cards-1);

    mean_amount = Math.round(mean_amount);

    ga('send', 'event', 'word', 'count', 'words in intention', mean_amount);

	if (count == amount_cards){
		$.post("/save_intention",{
			"title": title,
			"description": description,
			"duration": duration
		}, changeToQuestion);
	}
}

function editIntention(title, description, id) {
	$.post("/edit_intention",{
			"id": id,
			"title": title,
			"description": description
	}, changeToIntermediate);
	
}

function changeToIntermediate(result){
	window.location.href = "/intermediate/"+result.id;
}

function changeToQuestion(result){
	window.location.href = "/questions/"+result.id;
}




