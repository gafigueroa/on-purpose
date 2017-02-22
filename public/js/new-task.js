'use strict';


function initializePage() {


}

function pressed(name) {
	$("#location-info").hide();
	$("#description-info").hide();
	$("#duration-info").hide();
	$("#"+name).fadeIn();
}


function startIntention(title, description, duration) {
	$.post("/save_intention",{
		"title": title,
		"description": description,
		"duration": duration
	})
}




