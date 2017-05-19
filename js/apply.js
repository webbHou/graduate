/**
 * Created by 侯江伟T on 2017/5/19.
 */
window.onload = function () {
    var name = document.getElementById('name');
    var Oclass = document.getElementById('class');
    var Professional  = document.getElementById('Professional');
    var studio  = document.getElementById('studio');
    var tel  = document.getElementById('tel');
    var email  = document.getElementById('email');
    var intro  = document.getElementById('intro');
    var submit  = document.getElementById('submit');
    var message  = document.getElementById('message');
    intro.onblur = function () {
        if(!name.value || !Oclass.value || !Professional.value || !studio.value || !tel.value || !email.value || !intro.value ){
            message.innerHTML = '每一项为必填项，请认真填写！';
            return;
        }
        submit.onclick = function () {
            ajax('post', '../php/user/index.php', 'm=index&a=apply&name=' + encodeURI(name.value) + '&class=' + encodeURI(Oclass.value) + '&Professional='+encodeURI(Professional.value)+'&studio='+encodeURI(studio.value)+'&tel='+tel.value+'&email='+email.value+'&intro='+encodeURI(intro.value), function (data) {
                var d = JSON.parse(data);
                console.log(d);
                if(!d.code){
                   message.innerHTML = '提交成功！';
                    setTimeout(function () {
                        window.location = window.location;
                    },1000);
                }else {
                    message.innerHTML = '提交失败！';
                }
            });
        }
    }




}


