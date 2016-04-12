var $nav = $('#main-nav');
var $navItem = $("a#nav-link");

$navItem.on('click', function() {
	var jump_to = '#' + $(this).data('nav');
	console.log(jump_to);

	$(jump_to).velocity("scroll", { duration: 600 });

});