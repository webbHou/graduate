/**
 * Created by Administrator on 2017/5/17 0017.
 * 获取作品列表
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
 			getNewslist(page,key);
		}
	}
 

    var Oul  =  document.getElementById('productList');
    var allpage  =  document.getElementById('allpage');
    var now  =  document.getElementById('now');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    getNewslist(page,key);

    prev.onclick = function () {
        page--;
        getNewslist(page,key);
    }
    next.onclick = function () {
        page++;
        getNewslist(page,key);
    }

    function getNewslist(page,key) {
        ajax('get', '../php/user/index.php', 'm=index&n=3&a=getProductList&page='+page+'&key='+key,function (data){
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
        var Odl = document.createElement('dl');
        var Odt = document.createElement('dt');
        var Oa = document.createElement('a');
        var Oimg = document.createElement('img');
        Oa.href =  '/html/product_detaile.html#id=' +data.pid;
        Oimg.src = data.src.split(',')[0];
        Oa.appendChild(Oimg);
        Odt.appendChild(Oa);

        var Odd = document.createElement('dd');
        var Oh3 = document.createElement('h3');
        var Op = document.createElement('p');
        Oh3.innerHTML = data.name;
        Op.innerHTML = data.description;
        Odd.appendChild(Oh3);
        Odd.appendChild(Op);
        Odl.appendChild(Odt);
        Odl.appendChild(Odd);

        if (insert && Oul.children[0]) {
            Oul.insertBefore(Odl, Oul.children[0]);
        } else {
            Oul.appendChild(Odl);
        }
    }
}
