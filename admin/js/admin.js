/**
 * Created by Administrator on 2017/5/15 0015.
 * 后台管理主程序
 */

window.onload = function () {

    var key = window.location.hash.split('#')[1];
    var page = 1;
    var nav = document.getElementById('nav');
    var title = document.getElementById('title');
    var Oli = nav.getElementsByTagName('li');



    for(var i=0;i<2;i++){
        Oli[i].index = i;
        Oli[i].onclick = function(){
            window.location = window.location;
            page = 1;

            for(var i=0;i<Oli.length;i++){
                Oli[i].className = '';
            }
            key = window.location.reload().hash.split('#')[1];

            getUserlist(page,key);
        }
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


   
    function update(fn,id) {
        ajax('get', '/php/user/index.php', 'm=index&a='+fn+'&id='+id,function (data) {

        });
    }



}


