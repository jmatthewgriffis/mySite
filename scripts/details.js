$('.thing img').click(show_hide);
$('.thing h3').click(show_hide);

function show_hide() {
	var current = $(this).siblings('.details');
	if (current.is(':visible')) {
		current.hide('fast');
	} else {
		$('.details').hide('fast');
		current.show('fast');
	}
}