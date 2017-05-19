/**
 * Created by Administrator on 2017/5/15 0015.
 * 获取新闻列表
 * a:getNews
 */


window.onload = function () {
    var page = 1;
    var key = 1;
    var list = document.getElementById('list');
    var title = document.getElementById('title');
    var Olink = list.getElementsByTagName('a');

    for(var i=0;i<Olink.length;i++){
        Olink[i].index = i;
        Olink[i].onclick = function(){
            page = 1;
            title.innerHTML = this.innerHTML;
            for(var i=0;i<Olink.length;i++){
                Olink[i].className = '';
            }
            this.className = 'active';
            key = this.index+1;
            getlist(page,key);
        }
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
        ajax('get', '../php/user/index.php', 'm=index&n=2&a=getNewsList&page='+page+'&key='+key,function (data){
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
        Oa.href = '/html/product_detaile.html#id=' +data.Nid;
        Oa.innerHTML = data.title;
        Ospan.innerHTML = data.date;
        Oh3.appendChild(Oa);
        Oh3.appendChild(Ospan);

        var Op = document.createElement('p');
        Op.innerHTML = data.content;
        var Oa2 = document.createElement('a');
        Oa2.href = '/html/product_detaile.html#id=' +data.Nid;
        Oa2.innerHTML = '[详情]';
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