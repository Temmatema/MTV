$(document).ready(function(){
	$('.hamburger-button').click(function(){
		$(this).toggleClass('hamburger-button__active');
		$('.main-nav__list').slideToggle(400);      
		return false;
	});
});

$('.product__button').click(function () {
	$('.modal').addClass('modal-open');
	$('.modal').removeClass('modal-closed')
	$('.modal').removeClass('modal-disappear')
})

let modal = document.querySelector(".modal");

window.onclick = function(event) {
    if (event.target == modal) {
		modal.classList.remove("modal-open");
		modal.classList.add("modal-disappear");
		setTimeout(() => {
			modal.classList.add("modal-closed");
		}, 300);
    }
}

$('#buttonWr button').on('click', function(){
    $('#buttonWr button.modal__button-size--current').removeClass('modal__button-size--current');
    $(this).addClass('modal__button-size--current');
});