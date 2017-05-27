/**
 * Created by Administrator on 2017/5/15 0015.
 * 获取新闻列表
 * a:getNews
 */


window.onload = function () {
    var page = 1;
    var key = window.location.hash.split('#')[1];
	console.log(key);
    var list = document.getElementById('list');
    var title = document.getElementById('title');
    var Olink = list.getElementsByTagName('a');

    window.onhashchange = function(){
		
		page = 1;
		key = window.location.hash.split('#')[1];
		getlist(page,key);
		
	}

    var Oul  =  document.getElementById('newList');
    var allpage  =  document.getElementById('allpage');
    var now  =  document.getElementById('now');
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
for(var i=0;i<Olink.length;i++){
                	Olink[i].className = '';
           	}
	if(key==1){
			Olink[0].className = 'active';
			title.innerHTML = '数字媒体行业新闻';
		}else if(key==2){
			Olink[1].className = 'active';
			title.innerHTML = '学校新闻';
		}else if(key==3){
			Olink[2].className = 'active';
			title.innerHTML = '基地新闻';
		}else{
			Olink[3].className = 'active';
			title.innerHTML = '比赛公告';
		}	
        ajax('get', '../php/user/index.php', 'm=index&n=4&a=getNewsList&page='+page+'&key='+key,function (data){
            var d = JSON.parse(data);
            if(d.code==2){
	    	return;
	        }
            Oul.innerHTML = '';
            for(var i=0;i<d.data.list.length;i++){
                creaNewslist(d.data.list[i],true);
            }
            allpage.innerHTML = d.data.pages;
            now.innerHTML = d.data.page;
        });
    }

    function creaNewslist(data,insert) {
        var Oli = document.createElement('li');
        var Oh3 = document.createElement('h3');
        var Oa = document.createElement('a');
        var Ospan = document.createElement('span');
        Oa.href = '/html/News_detaile.html#id='+data.Nid;
        Oa.innerHTML = data.title;
        Ospan.innerHTML = data.date;
        Oh3.appendChild(Oa);
        Oh3.appendChild(Ospan);

        var Op = document.createElement('p');
        var Oa2 = document.createElement('a');
        var Ospan2 = document.createElement('span');
	 Ospan2.innerHTML = data.content;
        Oa2.href = '/html/News_detaile.html#id='+data.Nid;
        Oa2.innerHTML = '[详情]';
       Op.appendChild(Ospan2);
        Op.appendChild(Oa2);

        Oli.appendChild(Oh3);
        Oli.appendChild(Op);

        if (insert && Oul.children[0]) {
            Oul.insertBefore(Oli, Oul.children[0]);
        } else {
            Oul.appendChild(Oli);
        }
    }
}