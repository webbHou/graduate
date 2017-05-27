/**
 * Created by Administrator on 2017/5/15 0015.
 * 后台管理主程序
 */

window.onload = function () {

    var uid = getCookie('uid');
    var username = getCookie('username');
        if (!uid) {
		alert('您还有没登陆！请登录后再试！');
		return;
	}else{		
		if(username!='admin'){
			alert('对不起，您不是管理员，没有相应权限！');
			return;
		}
	}



    var key = window.location.hash.split('#')[1];
    var page = 1;
    var nav = document.getElementById('nav');
    var title = document.getElementById('title');
    var Oli = nav.getElementsByTagName('li');

	window.onhashchange = function(){
		page = 1;
		key = window.location.hash.split('#')[1];
		getlist(page,key);
	}

    var List  =  document.getElementById('List');
    var thead  =  List.getElementsByTagName('thead')[0];
    var tbody  =  List.getElementsByTagName('tbody')[0];

    var allpage  =  document.getElementById('allpage');
    var now  =  document.getElementById('now');
    var alldata  =  document.getElementById('alldata');

    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    getlist(page,key);

    prev.onclick = function () {
        page--;
        getlist(page,key);
    }
    next.onclick = function () {
        page++;
        getlist(page,key);
    }

    function getlist(page,key) {
 	   for(var i=0;i<Oli.length;i++){
                Oli[i].className = '';
           }
        ajax('get', '/php/user/index.php', 'm=index&n=5&a='+key+'&page='+page,function (data){
            var d = JSON.parse(data);
            if(d.code==2){
                return;
            }
            tbody.innerHTML = '';

            if(key == 'getUserList'){
                title.innerHTML = '用户管理';
                Oli[0].className = 'active';
                thead.innerHTML = '<tr><th>Id</th> <th>name</th><th>password</th> <th>isAdmin</th> <th>操作</th></tr>';
                for(var i=0;i<d.data.list.length;i++){
                    getUserList(d.data.list[i]);
                }
            }else if(key == 'getApply'){
                Oli[2].className = 'active';
                title.innerHTML = '申请信息管理';
                thead.innerHTML = '<tr><th>Id</th><th>name</th><th>class</th><th>professional</th> <th>studio</th><th>tel</th><th>email</th><th>intro</th><th>操作</th></tr>';
                for(var i=0;i<d.data.list.length;i++){
                    getApplyList(d.data.list[i]);
                }
            }else {
                Oli[1].className = 'active';
                title.innerHTML = '留言管理';
                thead.innerHTML = '<tr><th>Id</th> <th>name</th> <th>content</th> <th>date</th> <th>操作</th></tr>';
                for(var i=0;i<d.data.list.length;i++){
                    getList(d.data.list[i]);
                }
            }

            allpage.innerHTML = d.data.pages;
            now.innerHTML = d.data.page;
            alldata.innerHTML = d.data.count;
        });
    }



    function getUserList(data) {
        var Otr = document.createElement('tr');
        var Otd1 = document.createElement('td');
        var Otd2 = document.createElement('td');
        var Otd3 = document.createElement('td');
        var Otd4 = document.createElement('td');
        var Otd5 = document.createElement('td');

        Otd1.innerHTML = data.uid;
        Otd2.innerHTML = data.username;
        Otd3.innerHTML = data.password;
        Otd4.innerHTML = data.isAdmin;
        Otd5.innerHTML = '<a href="javascript:;" onclick="delUser('+data.uid+');">删除</a>';

        Otr.appendChild(Otd1);
        Otr.appendChild(Otd2);
        Otr.appendChild(Otd3);
        Otr.appendChild(Otd4);
        Otr.appendChild(Otd5);
        tbody.appendChild(Otr);

    }


    function getList(data) {
        var Otr = document.createElement('tr');
        var Otd1 = document.createElement('td');
        var Otd2 = document.createElement('td');
        var Otd3 = document.createElement('td');
        var Otd4 = document.createElement('td');
        var Otd5 = document.createElement('td');

        Otd1.innerHTML = data.cid;
        Otd2.innerHTML = data.username;
        Otd3.innerHTML = data.content;
        Otd4.innerHTML = data.dateline;
        Otd5.innerHTML = '<a  href="javascript:;" onclick="delGuset('+data.cid+');">删除</a>';

        Otr.appendChild(Otd1);
        Otr.appendChild(Otd2);
        Otr.appendChild(Otd3);
        Otr.appendChild(Otd4);
        Otr.appendChild(Otd5);
        tbody.appendChild(Otr);

    }

 function getApplyList(data) {
        var Otr = document.createElement('tr');
        var Otd1 = document.createElement('td');
        var Otd2 = document.createElement('td');
        var Otd3 = document.createElement('td');
        var Otd4 = document.createElement('td');
        var Otd5 = document.createElement('td');
 	var Otd6 = document.createElement('td');
        var Otd7 = document.createElement('td');
        var Otd8 = document.createElement('td');
        var Otd9 = document.createElement('td');

        Otd1.innerHTML = data.aid;
        Otd2.innerHTML = data.name;
        Otd3.innerHTML = data.class;
        Otd4.innerHTML = data.Professional;
 	Otd5.innerHTML = data.studio;
        Otd6.innerHTML = data.tel;
        Otd7.innerHTML = data.email;
        Otd8.innerHTML = data.intro;
        Otd9.innerHTML = '<a href="javascript:;" onclick="delUser('+data.uid+');">删除</a>';

        Otr.appendChild(Otd1);
        Otr.appendChild(Otd2);
        Otr.appendChild(Otd3);
        Otr.appendChild(Otd4);
        Otr.appendChild(Otd5);
	Otr.appendChild(Otd6);
        Otr.appendChild(Otd7);
        Otr.appendChild(Otd8);
        Otr.appendChild(Otd9);
        tbody.appendChild(Otr);

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


