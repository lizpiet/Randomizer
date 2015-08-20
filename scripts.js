
var students = ["James", "Ben", "Jake", "Jason N.", "Shawn", 
				"Martha", "Madeleine", "Kamie", "Kate", "Katie", 
				"Liz", "Alan", "Jason S.", "Brook", "Garret", "Vas", 
				 "Kim", "Matt", "Brenden" ];

var groups = [];
var groupSize = 3;

// students.sort(function(){
// 	return 0.5 - Math.random();
// })
$(document).ready(function(){
	console.log("Ready");
	// processing for number of teams selection
	$('#num-of-teams').on('click', '.js-num-teams', function () {
		$('#team-size').find('.selected').removeClass('selected');
		$('#num-of-teams').find('.selected').removeClass('selected');
		$(this).addClass('selected');
		// alert("clicked");

	});
	// 
	$('#team-size').on('click', '.js-team-size', function () {
		$('#num-of-teams').find('.selected').removeClass('selected');
		$('#team-size').find('.selected').removeClass('selected');
		$(this).addClass('selected');

	});
	$('#generator').on('click', function(){
		// groupSize = parseInt($('#num-of-teams .js-num-teams').hasClass('selected').val());
		if($('#control-panel .selected').length == 0)
		{
			alert("You need to select a number of groups or team size to generate groups.");
		}else
		{
			students.sort(function() { return 0.5 - Math.random();});
			var randomArray = students.slice();
			// console.log("students", students);
			var $selected = $('#control-panel .selected');
			groupSize = $selected.data('num');
			if($selected.parent().attr('id') == 'team-size'){
				console.log('Select by team size: '+ groupSize);
			}else
			{
				groupSize = calcGroupSize(students.length, groupSize);
				console.log('Select by number of groups: '+ groupSize);
			}
			// var groups = [];
			randomizer(randomArray);
			console.log("after random", students);
			console.log(groups);
		}

	});
// takes in array length and number of teams
function calcGroupSize(len, num)
{
	console.log(len +" people, to break into "+ num +" teams: "+ Math.floor(len / num));
	return Math.floor(len / num);
}

function randomizer(array){
	var counter = 0;
	groups = [];
	while(array.length > 0){
		console.log("length", array.length);
		// if(array.length % groupSize == 1)
		if(array.length == groupSize + 1)
		{
			groups.push(array.splice(0, groupSize + 1));
		}else
		{
			groups.push(array.splice(0, groupSize));

		}
		counter += groupSize;
	}
}

// console.log(groups);

});








// function randomNumber(max){

// return Math.floor(Math.random() * max);				//Randomizer

// }

// 

// function randomizer(array){							//
// array.length --;

// }










console.log();