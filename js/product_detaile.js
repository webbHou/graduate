/**
 * Created by Administrator on 2017/5/17 0017.
 * 获取作品列表
 */


window.onload = function () {

    getNewslist();

    function getNewslist() {
        var id = window.location.hash.split('=')[1];
        var name = document.getElementById('name');
        var author = document.getElementById('author');
        var author2 = document.getElementById('author2');
        var teacher = document.getElementById('teacher');
        var teacher2 = document.getElementById('teacher2');
        var honor = document.getElementById('honor');
        var type = document.getElementById('type');
        var studio = document.getElementById('studio');
        var studio2 = document.getElementById('studio2');
        var studio3 = document.getElementById('studio3');
        var img = document.getElementById('img');
        var description = document.getElementById('description');
        var competition = document.getElementById('competition');

        ajax('get', '../php/user/index.php', 'm=index&a=getProduct&id='+id,function (data){
            var d = JSON.parse(data);
            var con = d.data.list[0];
console.log(con);
            name.innerHTML = con.name;
            author.innerHTML = author2.innerHTML = con.author;
            teacher.innerHTML = teacher2.innerHTM = con.teacher;
            honor.innerHTML = con.honor;
            studio.innerHTML = studio3.innerHTML = studio3.innerHTML = con.studio;
            description.innerHTML = con.description;
            competition.innerHTML = con.competition;
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
