jQuery(function() {

    var tabs = $('nav li');
    tabs.on('click', tab_click_handler);
});

var tab_click_handler = function() {

    var current_tab = $(this);

    var prev_active_tab = $('nav .highlight');
    prev_active_tab.removeClass('highlight');

    current_tab.addClass('highlight');

    var tabName = current_tab.attr('id');

    var prev_active_section = $('#content .active');
    prev_active_section.removeClass('active');

    var section = $(tabName);

    section.addClass('active');
};
