$(document).ready(function(){
	$('.hamburger-button').click(function(){
		$(this).toggleClass('hamburger-button__active');
		$('.main-nav__list').slideToggle(400);      
		return false;
	});
});