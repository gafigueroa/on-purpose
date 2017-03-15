'use strict';

function showMore(id) {
	$("#show-more-button_"+id.toString()).toggle();
	$("#intention-body_"+id.toString()).toggle();
}

function deleteIntention(id) {
	$.get("/delete/"+id);
	location.reload();
}

function edit(id) {

}


