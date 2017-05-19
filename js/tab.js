

$(function(){
	var timer = null;
	var num = 0;
	autoplay();
	
	$('#show').mouseenter(function(){
		clearInterval(timer);
	});
	$('#show').mouseleave(function(){
		autoplay();
	});
	
	function autoplay(){
		timer = setInterval(function(){
			num-=1;
			if(num<-960)num=0;
			$('#tab').css('left',num);
		},20);
	}
	
	
});
