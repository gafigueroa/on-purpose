'use strict';

function initializePage() {


}

function pressed(name) {
	$("#location-info").hide();
	$("#description-info").hide();
	$("#duration-info").hide();
	$("#"+name).fadeIn();
}




