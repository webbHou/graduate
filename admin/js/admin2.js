/**
 * Created by Administrator on 2017/5/15 0015.
 * 后台管理主程序
 */

window.onload = function () {

	


    var id = window.location.hash.split('#')[1];
    var key = window.location.search.split('?')[1];
    var page = 1;
    var nav = document.getElementById('nav');
    var title = document.getElementById('title');
    var Oli = nav.getElementsByTagName('li');
    
	window.onhashchange = function(){
		page = 1;
		id = window.location.hash.split('#')[1];
		getlist(page,key,id);
	}


    var List  =  document.getElementById('List');
    var thead  =  List.getElementsByTagName('thead')[0];
    var tbody  =  List.getElementsByTagName('tbody')[0];

    var allpage  =  document.getElementById('allpage');
    var now  =  document.getElementById('now');
    var alldata  =  document.getElementById('alldata');

    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    getlist(page,key,id);

    prev.onclick = function () {
        page--;
        getlist(page,key,id);
    }
    next.onclick = function () {
        page++;
        getlist(page,key,id);
    }

    function getlist(page,key,id) {
	  for(var i=0;i<Oli.length;i++){
                Oli[i].className = '';
           }
	   
        ajax('get', '/php/user/index.php', 'm=index&n=5&a='+key+'&page='+page+'&key='+id,function (data){
            var d = JSON.parse(data);
            if(d.code==2){
                return;
            }
		
            tbody.innerHTML = '';

            if(key == 'getProductList'){
                title.innerHTML = '作品管理';
                Oli[12].className = 'active';
                thead.innerHTML = '<tr><th>Id</th><th>name</th><th>author</th><th>teacher</th><th>荣誉</th><th>赛事</th><th>作品简介</th><th>作品类型</th><th>所属工作室</th><th>操作</th></tr>';
		if(!d.data.list){
			alert("还没有内容！");
			return;
		}
                for(var i=0;i<d.data.list.length;i++){
                    getProductList(d.data.list[i]);
                }
            }else if(key == 'getNewsList'){
                Oli[3].className = 'active';
                title.innerHTML = '新闻管理';
                thead.innerHTML = '<tr><th>Id</th><th>标题</th><th>内容</th><th>日期</th><th>操作</th></tr>';
		if(!d.data.list){
			alert("还没有内容！");
			return;
		}
                for(var i=0;i<d.data.list.length;i++){
                    getNewsList(d.data.list[i]);
                }
            }else if(key == 'getStudentList'){
            	 Oli[9].className = 'active';
                title.innerHTML = '学生管理';
                thead.innerHTML = '<tr><th>Id</th> <th>name</th> <th>班级</th> <th>简介</th><th>所属工作室</th> <th>操作</th></tr>';
		if(!d.data.list){
			alert("还没有内容！");
			return;
		}
                for(var i=0;i<d.data.list.length;i++){
                    getstudentList(d.data.list[i]);
                }
            }else{
            	 Oli[9].className = 'active';
                title.innerHTML = '教师管理';
                thead.innerHTML = '<tr><th>Id</th> <th>name</th> <th>职称</th> <th>简介</th><th>所属工作室</th> <th>操作</th></tr>';
		if(!d.data.list){
			alert("还没有内容！");
			return;
		}
                for(var i=0;i<d.data.list.length;i++){
                    getTeacherList(d.data.list[i]);
                }
            }

            allpage.innerHTML = d.data.pages;
            now.innerHTML = d.data.page;
            alldata.innerHTML = d.data.count;
        });
    }



    function getProductList(data) {
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
        var Otd10 = document.createElement('td');

        Otd1.innerHTML = data.pid;
        Otd2.innerHTML = data.name;
        Otd3.innerHTML = data.author;
        Otd4.innerHTML = data.teacher;
        Otd5.innerHTML = data.honor;
        Otd6.innerHTML = data.competition;
        Otd7.innerHTML = data.description.slice(0,30);
        Otd8.innerHTML = data.type;
        Otd9.innerHTML = data.studio;
        Otd10.innerHTML = '<a href="javascript:;" onclick="update('+data.pid+');">修改</a><a href="javascript:;" onclick="delProduct('+data.pid+');">删除</a>';

        Otr.appendChild(Otd1);
        Otr.appendChild(Otd2);
        Otr.appendChild(Otd3);
        Otr.appendChild(Otd4);
        Otr.appendChild(Otd5);
        Otr.appendChild(Otd6);
        Otr.appendChild(Otd7);
        Otr.appendChild(Otd8);
        Otr.appendChild(Otd9);
        Otr.appendChild(Otd10);
        tbody.appendChild(Otr);

    }


    function getNewsList(data) {
        var Otr = document.createElement('tr');
        var Otd1 = document.createElement('td');
        var Otd2 = document.createElement('td');
        var Otd3 = document.createElement('td');
        var Otd4 = document.createElement('td');
        var Otd5 = document.createElement('td');

        Otd1.innerHTML = data.Nid;
        Otd2.innerHTML = data.title;
        Otd3.innerHTML = data.content.slice(0,30);
        Otd4.innerHTML = data.date;
        Otd5.innerHTML = '<a  href="javascript:;" onclick="update('+data.Nid+');">修改</a><a  href="javascript:;" onclick="delNews('+data.Nid+');">删除</a>';

        Otr.appendChild(Otd1);
        Otr.appendChild(Otd2);
        Otr.appendChild(Otd3);
        Otr.appendChild(Otd4);
        Otr.appendChild(Otd5);
        tbody.appendChild(Otr);

    }

    function getstudentList(data) {
        var Otr = document.createElement('tr');
        var Otd1 = document.createElement('td');
        var Otd2 = document.createElement('td');
        var Otd3 = document.createElement('td');
        var Otd4 = document.createElement('td');
        var Otd5 = document.createElement('td');
        var Otd6 = document.createElement('td');

        Otd1.innerHTML = data.tid;
        Otd2.innerHTML = data.name;
        Otd3.innerHTML = data.position;
        Otd4.innerHTML = data.description.slice(0,30);
        Otd5.innerHTML = data.type;
        Otd6.innerHTML = '<a  href="javascript:;" onclick="update('+data.tid+');">修改</a><a  href="javascript:;" onclick="delStudent('+data.tid+');">删除</a>';

        Otr.appendChild(Otd1);
        Otr.appendChild(Otd2);
        Otr.appendChild(Otd3);
        Otr.appendChild(Otd4);
        Otr.appendChild(Otd5);
        Otr.appendChild(Otd6);
        tbody.appendChild(Otr);
    }


  function getTeacherList(data) {
        var Otr = document.createElement('tr');
        var Otd1 = document.createElement('td');
        var Otd2 = document.createElement('td');
        var Otd3 = document.createElement('td');
        var Otd4 = document.createElement('td');
        var Otd5 = document.createElement('td');
        var Otd6 = document.createElement('td');

        Otd1.innerHTML = data.tid;
        Otd2.innerHTML = data.name;
        Otd3.innerHTML = data.position;
        Otd4.innerHTML = data.description.slice(0,30);
        Otd5.innerHTML = data.type;
        Otd6.innerHTML = '<a  href="javascript:;" onclick="update('+data.tid+');">修改</a><a  href="javascript:;" onclick="delTeacher('+data.tid+');">删除</a>';

        Otr.appendChild(Otd1);
        Otr.appendChild(Otd2);
        Otr.appendChild(Otd3);
        Otr.appendChild(Otd4);
        Otr.appendChild(Otd5);
        Otr.appendChild(Otd6);
        tbody.appendChild(Otr);
    }

   
   
}


