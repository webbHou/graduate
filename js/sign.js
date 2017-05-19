$(function(){
	$('.sign_wrap').fadeOut();
	$('.sign a').click(function(){
		$('.sign_con li').removeClass('active');
		if($(this).html() == '注册'){
			$('.reg').css('display','block');
			$('.sign_con li').eq(1).addClass('active');
			$('.login').css('display','none');
            $('.sign_wrap').fadeIn();
		}else if($(this).html() == '登录'){
			$('.login').css('display','block');
			$('.reg').css('display','none');
			$('.sign_con li').eq(0).addClass('active');
            $('.sign_wrap').fadeIn();
		}
        clear();
	});
	
	$('.sign_con .close').click(function(){
		$('.sign_wrap').fadeOut();
	});
	
	$('.sign_con li a').click(function(){
		$('.sign_con li').removeClass('active');
		if($(this).html() == '注册'){
			$('.reg').css('display','block');
			$('.sign_con li').eq(1).addClass('active');
			$('.login').css('display','none');
		}else if($(this).html() == '登录'){
			$('.login').css('display','block');
			$('.reg').css('display','none');
			$('.sign_con li').eq(0).addClass('active');
		}
        clear();
	});
	
	$('.login .togo').click(function(){
		$('.sign_con li').removeClass('active');
		$('.reg').css('display','block');
		$('.login').css('display','none');		
		$('.sign_con li').eq(1).addClass('active');
        clear();
	});
	$('.reg .togo').click(function(){
		$('.sign_con li').removeClass('active');
		$('.reg').css('display','none');
		$('.login').css('display','block');		
		$('.sign_con li').eq(0).addClass('active');
        clear();
	});


	function  clear() {
        $('#message2').html('');
        $('#password2').html('');
        $('#username2').html('');
        $('#message1').html('');
        $('#password1').html('');
        $('#username1').html('');
    }


})
