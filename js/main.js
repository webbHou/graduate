/* 数字媒体实践教育基地 */

//翻转导航
var nav = document.getElementById('nav');
var header = document.getElementById('header');
var Oli = nav.getElementsByTagName('li');
var timer = null;
var timer2 = null;

for(var i=0;i<Oli.length;i++){
	var num = 0;
	Oli[i].onoff = true;
	Oli[i].onclick = function(){
		clearTimeout(timer2);
		var now = this;
		var Odiv = this.getElementsByTagName('div');
		if(this.onoff){	
			num = 0;
			Odiv[num].style.transform ='translateY(0px)';
			timer = setInterval(function(){
				Odiv[num].className = 'open';
				if(num>=Odiv.length-1){
					clearInterval(timer);
					now.onoff = false;
				}
				num++;
			},200);

		}else{
			num = Odiv.length-1;
			timer = setInterval(function(){
				Odiv[num].className = 'close';
				console.log(num);
				if(num<=0){
					clearInterval(timer);
					Odiv[num].style.transform ='translateY(-100px)';
					now.onoff = true;
				}
				num--;
			},100);
		}
		nav.onmouseout = function(){
				timer2 = setTimeout(function(){
					num = Odiv.length-1;
					timer = setInterval(function(){
						Odiv[num].className = 'close';
						console.log(num);
						if(num<=0){
							clearInterval(timer);
							Odiv[num].style.transform ='translateY(-100px)';
							now.onoff = true;
						}
						num--;
					},100);
				},100);
			
		}
	}
}
