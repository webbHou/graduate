/* banner */

var timer = null;
var len = $('#banner .wrap>img').length;
num = 0;
autoplay();
var color = ['#beab8d','#fcfbf7','#beab8d','#ffd741'];

function autoplay(){
	timer = setInterval(function(){
		num++;
		num%=len;
		$('#banner .wrap>img').fadeOut();
		$('#banner').css('background',color[num]);
		$('#banner .wrap>img').eq(num).fadeIn();
	},2000);
}

$('#banner').mouseenter(function(){
	clearInterval(timer);
})
$('#banner').mouseleave(function(){
	autoplay();
});

$('#banner .prev').click(function(){
	num++;
	num%=len;
	$('#banner .wrap>img').fadeOut();
	$('#banner').css('background',color[num]);
	$('#banner .wrap>img').eq(num).fadeIn();
});
$('#banner .next').click(function(){
	num--;
	num%=len;
	$('#banner .wrap>img').fadeOut();
	$('#banner').css('background',color[num+len]);
	$('#banner .wrap>img').eq(num).fadeIn();
});