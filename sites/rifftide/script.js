$(function() {
	$('#imagery li').click(click_hander);
	$('#text li').click(click_hander2);
});

var click_hander = function() {
	// Hide all the media.
	$('#media').children().removeClass('active');

	// Figure out what was clicked.
	var clicked = $(this).data().content;

	// Show the appropriate media.
	$(document.getElementById(clicked)).addClass('active');

	// Darken the buttons.
	$('#imagery li').removeClass('chosen');

	// Highlight the clicked button.
	$(this).addClass('chosen');
};

var click_hander2 = function() {
	// Hide all the text.
	$('#blahblah').children().removeClass('active');

	// Figure out what was clicked.
	var clicked = $(this).data().content;

	// Show the appropriate text.
	$(document.getElementById(clicked)).addClass('active');

	// Darken the buttons.
	$('#text li').removeClass('chosen');

	// Highlight the clicked button.
	$(this).addClass('chosen');
};