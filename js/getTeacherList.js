/**
 * Created by Administrator on 2017/5/17 0017.
 * 获取团队成员列表
 */


window.onload = function () {
    var page = 1;
    var Oul  =  document.getElementById('teamList');
    var allpage  =  document.getElementById('allpage');
    var now  =  document.getElementById('now');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    getProductList(page);
    prev.onclick = function () {
        page--;
        getProductList(page);
    }
    next.onclick = function () {
        page++;
        getProductList(page);
    }

    function getProductList(page) {
        ajax('get', '../php/user/index.php', 'm=index&n=3&a=getTeacherList&page='+page,function (data){
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
        Oa.href = '/html/product_detaile.html#id='+data.tid;
        Oimg.src = data.src;
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
