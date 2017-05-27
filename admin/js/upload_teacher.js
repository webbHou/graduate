﻿//添加板块
var addteacher = document.getElementById('u_teacher');
var Tinput = addteacher.getElementsByTagName('input');
//上传
Tinput[1].onchange = function(){
	if(this.length<=0) return;
	var that = this;
	console.log(this.files);
	//ajax上传文件
	var Upload = document.getElementById('upload');
	var Utotal = document.getElementById('total');
	var Uloaded = document.getElementById('loaded');
	var Uname = Upload.getElementsByTagName('p')[0];
	var Uprogress = Upload.getElementsByTagName('span')[0];
	Upload.style.transform = 'translateY(0)';
    Uname.innerHTML = '正在上传：'+this.files[0].name;
    var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				var respon = JSON.parse(xhr.responseText);
				console.log(respon);
        			Upload.style.transform = 'translateY(-110px)';
     				Tinput[0].value = '/'+respon.url;
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}
		
	}
	var upload = xhr.upload;
	upload.onprogress = function(ev){
		var scale = ev.loaded/ev.total;
		Uprogress.innerHTML = Math.ceil(scale*100)+'%';
		Uloaded.style.width = scale*Utotal.clientWidth+'px';
	};
	xhr.open('post','user/post_file_teacher.php',true);
	xhr.setRequestHeader('X-Request-With','XMLHttpRequest');
	var oFormdata = new FormData();
	oFormdata.append('file',Tinput[1].files[0]);
	xhr.send(oFormdata);


};