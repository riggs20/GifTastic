// Variable to store array for topic
var topics = ["excited", "thankful", "sad", "happy", "concerned", "loved", "heartbroken", "annoyed",
"amused", "tired", "drained", "pained", "determined", "proud", "accomplished", "relaxed", "frustrated",
"entertained", "grateful", "sick", "exhausted"];

//Function to re-render HTML
function displayInfo() {
	//Store data and add attribute from clicking button
	var emotion = $(this).attr("data-name");

console.log(emotion);
	//Variable for queryURL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=gaKbQs9hMahpRXLWXAYU502KVYlBVaUe&limit=10";

	//AJAX request
	$.ajax({
		url: queryURL,
		method: "GET"
	})

	//After data returns from the request
	.done(function(response) {
		console.log(queryURL);
		console.log(response);

		//Store response data
		var results = response.data;

		//Loop through results
		for (var i = 0; i < results.length; i++) {
			//Create and store div tag
			var emotionDiv = $("<div id='emotionDiv'>");
			//Create p tag w/results rating
			var p = $("<p>").text("Rating: " + results[i].rating);

			//Create and store img tag
			var emotionImage = $("<img>");
			//Set source attirbute
			emotionImage.attr({
				src: results[i].images.fixed_height_still.url,
				"data-still": results[i].images.fixed_height_still.url,
				"data-animate": results[i].images.fixed_height.url,
				"data-state": "still",
				"class": "gif"
			});
			//Append paragraph and image tags to emotionDiv
			emotionDiv.append(p);
			emotionDiv.append(emotionImage);
			//Prepend the emotionDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(emotionDiv);

		};
	});
};

//Function to show inital topic buttons
function renderButtons() {

	// Empty buttons to avoid repeat of buttons
	$("#view-buttons").empty();

	// Loop through array of buttons
	for (var i = 0; i < topics.length; i++) {
		//Variable to create button tag
		var a = $("<button>");
		//Add class to button
		a.addClass("emotion");
		//Add attribut to button
		a.attr("data-name", topics[i]);
		//Add text to button
		a.text(topics[i]);
		//Append button to HTML
		$("#view-buttons").append(a);
	};
};

//Function to add new emotion button from form
$("#addEmotion").on("click", function(event) {
	event.preventDefault();
	//Get text from input
	var  emotion = $("#emotion-input").val().trim();
	//Add new emotion to array
	topics.push(emotion);
	//Call renderButtons
	renderButtons();
});

//$(".gif").on("click", function() {
$(document).on("click", ".gif", function() {
	var state = $(this).attr("data-state");
	console.log(this);

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		console.log(this);
		$(this).attr("data-state","animate");
		console.log(this);
	}
	else {
		$(this).attr("src", $(this).attr("data-still"));
		console.log(this);
		$(this).attr("data-state","still");
		console.log(this);
	}

});

//Add click event listener to all elements with a class of "emotion"
$(document).on("click", ".emotion", displayInfo);

renderButtons();







