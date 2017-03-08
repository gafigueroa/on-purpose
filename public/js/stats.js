'use strict';

$(document).ready(function() {
	initializePage();
})

function initializePage() {
	updateStats();
}

function updateStats(){
	$.get("/intentions.json", showStats)
}

function explainScore(){
	$("#statsExplanation").toggle();
}

var moods = ["really positive",
			"positive", 
			"somewhat positive", 
			"normal", 
			"somewhat negative", 
			"negative",
			"really negative"];

function showStats(result){
	var total_score = 0;
	var amount = 0;
	for (var i = 0; i < result.intentions.length; i++){
		var intention = result.intentions[i];
		if ("score" in intention){
			total_score += intention.score;
			amount++;
	
		}
	}	
	var mean_score = total_score/amount;
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
	console.log(mood_position);
	console.log(text);
	$("#avg_answers_score").text(text);
}




