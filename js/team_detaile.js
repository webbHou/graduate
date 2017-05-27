/**
 * Created by Administrator on 2017/5/17 0017.
 * 获取作品列表
 */


window.onload = function () {

    getNewslist();

    function getNewslist() {
        var id = window.location.hash.split('=')[1];
        var name = document.getElementById('name');
        var type = document.getElementById('type');
        var img = document.getElementById('img');
        var description = document.getElementById('description');
        var position = document.getElementById('position');

        ajax('get', '../php/user/index.php', 'm=index&a=getStudent&id='+id,function (data){
            var d = JSON.parse(data);
            var con = d.data.list[0];
            name.innerHTML = con.name;
            type.innerHTML = con.type;
            position.innerHTML = con.position;
            description.innerHTML = con.description;
            type.innerHTML = con.type;
            var imgArr = con.src.split(',');
		console.log(imgArr);
            for(var i=0;i<imgArr.length;i++){
                Oimg = document.createElement('img');
                Oimg.src = imgArr[i];
                img.appendChild(Oimg);
            }
        });
    }



}
