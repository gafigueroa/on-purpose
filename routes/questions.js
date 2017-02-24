'use strict';

var data = require('../data.json');



//This function was obtained here http://stackoverflow.com/questions/7158654/how-to-get-random-elements-from-an-array
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

exports.view = function(req, res){
	
	var selected_questions = getRandomArrayElements(data.questions, 3);
	for (var i = 0; i < 3; i++) {
		if (selected_questions[i].placeholder == ""){
			selected_questions[i].placeholder = "Enter your answer";
		}
		selected_questions[i].id = i;
		selected_questions[i].color = data.colors[i];
	}
	console.log(req.params);
	res.render('questions',{
		'questions':selected_questions,
		'colors': data.colors
	});
};




