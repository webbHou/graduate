/**
 * Created by Administrator on 2017/5/15 0015.
 */
var iPage = 1;

showList();


// 	/*
// 	留言
// 	post
// 		guestbook/index.php
// 			m : index
// 			a : send
// 			content : 留言内容
// 		返回
// 			{
// 				code : 返回的信息代码 0 = 没有错误，1 = 有错误
// 				data : 返回成功的留言的详细信息
// 					{
// 						cid : 留言id
// 						content : 留言内容
// 						uid : 留言人的id
// 						username : 留言人的名称
// 						dateline : 留言的时间戳(秒)
// 						support : 当前这条留言的顶的数量
// 						oppose : 当前这条留言的踩的数量
// 					}
// 				message : 返回的信息 具体返回信息
// 			}
// 	*/
var oContent = document.getElementById('guest_new');
var oPostBtn = document.getElementById('add_guest');
var guest_list = document.getElementById('guest_list');
oPostBtn.onclick = function() {

    ajax('post', '../php/user/index.php', 'm=index&a=send&content='+encodeURI(oContent.value), function(data) {

        var d = JSON.parse(data);

        if (!d.code) {
            //添加当前留言到列表中
            createList(d.data, true);
        }

    });

}

function createList(data, insert) {
    var oDl = document.createElement('dl');
    oDl.className = 'clear';
    var oDt = document.createElement('dt');
    var oStrong = document.createElement('strong');
    oStrong.innerHTML = data.username;
    oDt.appendChild(oStrong);

    var oDd1 = document.createElement('dd');
    oDd1.innerHTML = data.content;

    var oDd2 = document.createElement('dd');
    oDd2.className = 't';
    var oA1 = document.createElement('a');
    oA1.href = '';
    oA1.innerHTML = '顶(<span>'+data.support+'</span>)';
    var oA2 = document.createElement('a');
    oA2.href = '';
    oA2.innerHTML = '踩(<span>'+data.oppose+'</span>)';
    oDd2.appendChild(oA1);
    oDd2.appendChild(oA2);

    oDl.appendChild(oDt);
    oDl.appendChild(oDd1);
    oDl.appendChild(oDd2);

    if (insert && guest_list.children[0]) {
        guest_list.insertBefore(oDl, guest_list.children[0]);
    } else {
        guest_list.appendChild(oDl);
    }
}

    var oShowMore = document.getElementById('more');
	//点击显示更多的内容
	oShowMore.onclick = function() {
		iPage++;
        oShowMore.innerHTML = '加载中...';
		showList();
        oShowMore.innerHTML = '加载更多';
	}
//
	function showList() {
		/*
		初始化留言列表
		get
			guestbook/index.php
				m : index
				a : getList
				page : 获取的留言的页码，默认为1
				n : 每页显示的条数，默认为10
			返回
				{
					code : 返回的信息代码 0 = 没有错误，1 = 有错误
					data : 返回成功的留言的详细信息
						{
							cid : 留言id
							content : 留言内容
							uid : 留言人的id
							username : 留言人的名称
							dateline : 留言的时间戳(秒)
							support : 当前这条留言的顶的数量
							oppose : 当前这条留言的踩的数量
						}
					message : 返回的信息 具体返回信息
				}
		*/
		ajax('get', '../php/user/index.php', 'm=index&a=getList&n=2&page=' + iPage, function(data) {

			var d = JSON.parse(data);

			var data = d.data;

			if (data) {
				for (var i=0; i<data.list.length; i++) {
					createList(data.list[i]);
				}
			} else {
				if (iPage == 1) {
                    guest_list.innerHTML = '现在还没有留言，快来抢沙发...';
                    oShowMore.style,display = 'none';
				}
				oShowMore.innerHTML = '没有更多了';
			}

		});
	}
