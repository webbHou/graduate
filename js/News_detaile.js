/**
 * Created by Administrator on 2017/5/17 0017.
 * 获取作品列表
 */


window.onload = function () {

    getNewslist();

    function getNewslist() {
        var id = window.location.hash.split('=')[1];
        var title = document.getElementById('title');
        var time = document.getElementById('time');
        var content = document.getElementById('content');


        ajax('get', '../php/user/index.php', 'm=index&a=getNews&id='+id,function (data){
            var d = JSON.parse(data);
            var con = d.data.list[0];
            title.innerHTML = con.title;
            time.innerHTML =  con.date;
            content.innerHTML = con.content;
        });
    }



}
