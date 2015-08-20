Handlebars.registerHelper("plus1", function(value, options)
{
    return parseInt(value) + 1;
});

var students = ["James", "Ben", "Jake", "Jason N.", "Shawn",
				"Martha", "Madeleine", "Kamie", "Kate", "Katie",
				"Liz", "Alan", "Jason S.", "Brook", "Garret", "Vas",
				 "Kim", "Matt", "Brenden" ];

var groups = [];// to store the randomized groups, cleared out and redone if needed
var groupSize;// global variable to store group size in

$(document).ready(function(){
	// processing for number of teams selection
	$('#num-of-teams').on('click', '.js-num-teams', function () {
		$('#control-panel').find('.selected').removeClass('selected');// clears out selected class from all buttons, in size or number categories
		$(this).addClass('selected');// adds selected class to button that was clicked
	});

	// processing for team size selection
	$('#team-size').on('click', '.js-team-size', function () {
		$('#control-panel').find('.selected').removeClass('selected');// clears out selected class from all buttons, in size or number categories
		$(this).addClass('selected');// adds selected class to button that was clicked
	});

	// listener for generate button
	$('#generator').on('click', function(){
			var $selected = $('#control-panel .selected');
			$('#group-container').empty();
			
		if($selected.length == 0)
		{
			alert("You need to select a number of groups or team size to generate groups.");
		}else
		{
			var randomArray = students.slice();// copies all of the student array leaving the original intact
			randomArray.sort(function() { return 0.5 - Math.random();});// sorts students in random order
			groupSize = $selected.data('num');// grabs the number data attribute to figure out how big a group or number of teams to create

			// if number of teams is selected, converts number of teams to how many per group
			if($selected.parent().attr('id') == 'num-of-teams') {
				groupSize = calcGroupSize(students.length, groupSize);
			}

			// calls randomizer, which creates the arrays for each group
			randomizer(randomArray);
		}

		console.log(groups, typeof groups);
		var source = $("#display-groups").html();
		var template = Handlebars.compile(source);

		$('#group-container').html(template(groups));
	});
});

// takes in array length and number of teams
function calcGroupSize(len, num)
{
	var size = Math.floor(len / num);
	if(size < 2)// checks if there will be groups of 1 with Math.floor. If will be group size under 2, will round up
	{
		size = Math.ceil(len / num);
	}
	return size;
}

// takes in an array and splits it up by global group size setting and pushes it to the global "groups" array
function randomizer(array){
	var counter = 0;
	groups = [];// clears out global groups, in case of re-randomization
	while(array.length > 0){
		if(array.length == groupSize + 1)// checks if there will be 1 person left by themselves and instead adds them to the last group
		{
			groups.push(array.splice(0, groupSize + 1));
		}else
		{
			groups.push(array.splice(0, groupSize));

		}
		counter += groupSize;
	}
}
