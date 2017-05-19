$(function(){
	var d_height = $(document).height();
	var w_height = $(window).height();
	$('.sign_wrap').css('height',d_height);
	$('.sign_con').css('top',w_height*0.5);
	
	$('#nav li').find('ul').slideUp();
	$('#nav li').mouseenter(function(){
		$(this).find('ul').slideDown('slow');
	}).mouseleave(function(){
        $(this).find('ul').slideUp();
    });
	
	// if($(window).height()>=$(document).height()){
	// 	$('.footer').css('position','fixed');
	// }else{
	// 	$('.footer').css('position','');
	// }
});

