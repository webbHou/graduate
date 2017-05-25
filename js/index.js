/**
 * Created by Administrator on 2017/5/15 0015.
 * 首页获取列表
 * a:getNews
 */


window.onload = function () {
    var Oul  =  document.getElementById('newList');
    var Oul2  =  document.getElementById('productlist');
    var Oul3  =  document.getElementById('tab');

    ajax('get', 'php/user/index.php', 'm=index&n=5&a=getNewsList', function (data){
        var d = JSON.parse(data);
        Oul.innerHTML = '';
        for(var i=0;i<d.data.list.length;i++){
            creaNewslist(d.data.list[i],true);
        }
    });
    ajax('get', 'php/user/index.php', 'm=index&n=8&a=getProductList', function (data){
        var d = JSON.parse(data);
        Oul2.innerHTML = '';
	console.log(d);
        for(var i=0;i<d.data.list.length;i++){
            creaProductlist(d.data.list[i]);
        }
    });

    ajax('get', 'php/user/index.php', 'm=index&n=10&a=getStudentList', function (data){
        var d = JSON.parse(data);
        Oul3.innerHTML = '';
        for(var i=0;i<d.data.list.length;i++){
            creaStudentlist(d.data.list[i]);
        }
    });


    function creaNewslist(data,insert) {
        var Oli = document.createElement('li');
        var Oa = document.createElement('a');
        Oa.href = 'html/News_detaile.html#id='+data.Nid;
        Oa.innerHTML = data.title;
        var Ospan = document.createElement('span');
        Ospan.innerHTML = data.date;
        Oli.appendChild(Oa);
        Oli.appendChild(Ospan);

        if (insert && Oul.children[0]) {
            Oul.insertBefore(Oli, Oul.children[0]);
        } else {
            Oul.appendChild(Oli);
        }
    }
    function creaProductlist(data) {
        var str = ' <li><a href="html/product_detaile.html#id='+data.pid+'"><img src="'+data.src.split(',')[0]+'"/><div class="text"> <div class="mask"></div><p>'+data.competition+'</p></div> <div class="text2"><div class="mask2"></div> <h3>'+data.name+'</h3> <p>'+data.description+'</p></div> </a></li>';
        Oul2.innerHTML +=str;
    }
    function creaStudentlist(data) {
        var str = '<li><a href="html/product_detaile.html#id='+data.tid+'"><img src="'+data.src.split(',')[0]+'"/><div class="mask"></div> <p>'+data.name+'</p> </a></li>';
        Oul3.innerHTML +=str;
    }




    var user = document.getElementById('user');
    var register = document.getElementById('register');
    var login = document.getElementById('login');
    var admin = document.getElementById('admin');
    var logout = document.getElementById('logout');
    var oUserInfo = document.getElementById('sign_wrap');


    var iPage = 1;

    var message2 = document.getElementById('message2');
    var oPassword1 = document.getElementById('password1');
    var oPassword1_e = document.getElementById('password1_e');
    var oUsername1 = document.getElementById('username1');
    var message1 = document.getElementById('message1');
    var oUsername2 = document.getElementById('username2');
    var oPassword2 = document.getElementById('password2');
    var oVerifyUserNameMsg = document.getElementById('verifyUserNameMsg');

    //初始化
    updateUserStatus(false);

    function updateUserStatus(isAdmin) {
        var uid = getCookie('uid');
        var username = getCookie('username');
        if (uid) {
            //如果是登陆状态
            user.style.display = 'block';
            user.innerHTML = '欢迎你'+username;
            if(isAdmin){
                admin.style.display = 'block';
            }else {
                logout.style.display = 'block';
            }
            login.style.display = 'none';
            register.style.display = 'none';
            oUserInfo.style.display = 'none';
        } else {
            user.style.display = 'none';
            logout.style.display = 'none';
            login.style.display = 'block';
            register.style.display = 'block';
            oUserInfo.style.display = 'none';
        }

    }


    /*
     验证用户名
     get
     guestbook/index.php
     m : index
     a : verifyUserName
     username : 要验证的用户名
     返回
     {
     code : 返回的信息代码 0 = 没有错误，1 = 有错误
     message : 返回的信息 具体返回信息
     }
     */
    oUsername1.onblur = function () {
        ajax('get', 'php/user/index.php', 'm=index&a=verifyUserName&username=' + this.value, function (data) {
            //alert(data);
            var d = JSON.parse(data);

            oVerifyUserNameMsg.innerHTML = d.message;

            if (d.code) {
                oVerifyUserNameMsg.style.color = 'red';
            } else {
                oVerifyUserNameMsg.style.color = 'green';
            }
        });
    }


    /*
     用户注册
     get/post
     guestbook/index.php
     m : index
     a : reg
     username : 要注册的用户名
     password : 注册的密码
     返回
     {
     code : 返回的信息代码 0 = 没有错误，1 = 有错误
     message : 返回的信息 具体返回信息
     }
     */
    password1_e.onblur = function () {
        if(oPassword1_e.value != oPassword1.value){
            message2.innerHTML = '两次输入的密码不一致!';
            return;
        }
        var oRegBtn = document.getElementById('btnReg');

        oRegBtn.onclick = function () {
            ajax('post', 'php/user/index.php', 'm=index&a=reg&username=' + encodeURI(oUsername1.value) + '&password=' + oPassword1.value, function (data) {
                var d = JSON.parse(data);
                message2.style.color = '#FFF400';
                message2.innerHTML = d.message;
                if(!d.code){
                    setTimeout(function () {
                        $('.sign_con li').removeClass('active');
                        $('.reg').css('display','none');
                        $('.sign_con li').eq(0).addClass('active');
                        $('.login').css('display','block');
                        oPassword1.innerHTML = '';
                        oUsername1.innerHTML = '';
                        message1.innerHTML = '';
                    },1000);
                }
            });
        }
    }


    /*
     用户登陆
     get/post
     guestbook/index.php
     m : index
     a : login
     username : 要登陆的用户名
     password : 登陆的密码
     返回
     {
     code : 返回的信息代码 0 = 没有错误，1 = 有错误
     message : 返回的信息 具体返回信息
     }
     */

    var oLoginBtn = document.getElementById('btnLogin');

    oLoginBtn.onclick = function () {
        ajax('post', 'php/user/index.php', 'm=index&a=login&username=' + encodeURI(oUsername2.value) + '&password=' + oPassword2.value, function (data) {
            var d = JSON.parse(data);
            message1.style.color = '#FFF400';
            message1.innerHTML = d.message;
            if (!d.code) {
                setTimeout(function () {
                    message1.innerHTML = d.message;
                    updateUserStatus(d.isAdmin);
                },1000);
            }
        });
    }

    /*
     用户退出
     get/post
     guestbook/index.php
     m : index
     a : logout
     返回
     {
     code : 返回的信息代码 0 = 没有错误，1 = 有错误
     message : 返回的信息 具体返回信息
     }
     */
    var oLogout = document.getElementById('logout');
    oLogout.onclick = function () {

        ajax('get', 'php/user/index.php', 'm=index&a=logout', function (data) {
            var d = JSON.parse(data);
            if (!d.code) {
                //退出成功
                setTimeout(function () {
                    updateUserStatus();
                },1000);
            }

        });

        return false;

    }



    function getCookie(key) {
        var arr1 = document.cookie.split('; ');
        for (var i = 0; i < arr1.length; i++) {
            var arr2 = arr1[i].split('=');
            if (arr2[0] == key) {
                return arr2[1];
            }
        }
    }


}