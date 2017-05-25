<?php
/**
 * @ controller Index.class.php
 */

defined('IN_APP') or exit('Denied Access!');

class IndexController extends Controller {

	public function index() {
		echo '<p>欢迎</p>';
		//$result = $this->db->get("select * from users", 1);
		//dump($result);
	}

	/**
	 * @ interface 用户名验证
	 */
	public function verifyUserName() {
		
		$username = trim(isset($_REQUEST['username']) ? $_REQUEST['username'] : '');
		
		switch ($this->_verifyUserName($username)) {
			case 0:
				$this->sendByAjax(array('message'=>'恭喜你，该用户名可以注册！'));
				break;
			case 1:
				$this->sendByAjax(array('code'=>1,'message'=>'用户名长度不能小于3个或大于16个字符！'));
				break;
			case 2:
				$this->sendByAjax(array('code'=>2,'message'=>'对不起，该用户名已经被注册了！'));
				break;
			default:
				break;
		}
		
	}

	/**
	 * @ interface 用户注册
	 */
	public function reg() {
		$username = trim(isset($_REQUEST['username']) ? $_REQUEST['username'] : '');
		$password = trim(isset($_REQUEST['password']) ? $_REQUEST['password'] : '');
		$avatar = trim(isset($_REQUEST['avatar']) && in_array($_REQUEST['avatar'], array(1,2,3,4,5,6,7,8,9)) ? intval($_REQUEST['avatar']) : 1);

		if ($this->_verifyUserName($username) !== 0 || strlen($password)<3 || strlen($password) > 20) {
			$this->sendByAjax(array('code'=>1,'message'=>'注册失败！'));
		}
		$password = md5($password);
		if (false === $this->db->query("INSERT INTO `users` (`username`, `password`) VALUES ('{$username}', '{$password}')")) {
			$this->sendByAjax(array('code'=>1,'message'=>'注册失败！'));
		} else {
			$this->sendByAjax(array('code'=>0,'message'=>'注册成功！'));
		}
	}


    /**
     * @ interface 工作室申请
     */
    public function apply() {
        $name = trim(isset($_REQUEST['name']) ? $_REQUEST['name'] : '');
        $class = trim(isset($_REQUEST['class']) ? $_REQUEST['class'] : '');
        $Professional = trim(isset($_REQUEST['Professional']) ? $_REQUEST['Professional'] : '');
        $studio = trim(isset($_REQUEST['studio']) ? $_REQUEST['studio'] : '');
        $tel = trim(isset($_REQUEST['tel']) ? $_REQUEST['tel'] : '');
        $email = trim(isset($_REQUEST['email']) ? $_REQUEST['email'] : '');
        $intro = trim(isset($_REQUEST['intro']) ? $_REQUEST['intro'] : '');


        if (false === $this->db->query("INSERT INTO `apply` (`name`, `class`,`Professional`, `studio`,`tel`, `email`, `intro`) VALUES ('{$name}','{$class}','{$Professional}','{$studio}','{$tel}','{$email}','{$intro}')")) {
            $this->sendByAjax(array('code'=>1,'message'=>'注册失败！'));
        } else {
            $this->sendByAjax(array('code'=>0,'message'=>'注册成功！'));
        }
    }

	/**
	 * @ 用户登陆
	 */
	public function login() {
		$username = trim(isset($_REQUEST['username']) ? $_REQUEST['username'] : '');
		$password = trim(isset($_REQUEST['password']) ? $_REQUEST['password'] : '');

		if (isset($_COOKIE['uid'])) {
			$this->sendByAjax(array('code'=>1,'message'=>'你已经登陆过了！'));
		}

		if ($rs = $this->db->get("SELECT * FROM `users` WHERE `username`='{$username}'")) {
			if ($rs['password'] != md5($password)) {
				$this->sendByAjax(array('code'=>1,'message'=>'登陆失败！'));
			} else {
				setcookie('uid', $rs['uid'], time() + 3600*60, '/');
				setcookie('username', $rs['username'], time() + 3600*60, '/');
				$this->sendByAjax(array('code'=>0,'message'=>'登陆成功！','isAdmin'=>$rs['password']));
			}
		} else {
			$this->sendByAjax(array('code'=>1,'message'=>'登陆失败！'));
		}
	}

	/**
	 * @ 用户退出
	 */
	public function logout() {
		if (!isset($_COOKIE['uid'])) {
			$this->sendByAjax(array('code'=>1,'message'=>'你还没有登陆！'));
		} else {
			setcookie('uid', 0, time() - 3600*60, '/');
			$this->sendByAjax(array('code'=>0,'message'=>'退出成功！'));
		}
	}

	/**
	 * 用户留言保存
	 */
	public function send() {
		if (!isset($_COOKIE['uid'])) {
			$this->sendByAjax(array('code'=>1,'message'=>'你还没有登陆！'));
		} else {
			$content = trim(isset($_POST['content']) ? $_POST['content'] : '');
			if (empty($content)) {
				$this->sendByAjax(array('code'=>1,'message'=>'留言内容不能为空！'));
			}
			$dateline = time();
			$this->db->query("INSERT INTO `guestbook` (`uid`, `content`, `dateline`) VALUES ({$_COOKIE['uid']}, '{$content}', {$dateline})");
			$returnData = array(
				'cid'		=>	$this->db->getInsertId(),
				'uid'		=>	$_COOKIE['uid'],
				'username'	=>	$_COOKIE['username'],
				'content'	=>	$content,
				'dateline'	=>	$dateline,
				'support'	=>	0,
				'oppose'	=>	0,
			);
			$this->sendByAjax(array('code'=>0,'message'=>'留言成功！','data'=>$returnData));
		}
	}

	/**
	 * @ 顶
	 */
	public function doSupport() {
		if (!isset($_COOKIE['uid'])) {
			$this->sendByAjax(array('code'=>1,'message'=>'你还没有登陆！'));
		} else {
			$cid = isset($_REQUEST['cid']) ? intval($_REQUEST['cid']) : 0;
			if (!$cid) $this->sendByAjax(array('code'=>1,'message'=>'无效留言cid！'));
			$content = $this->db->get("SELECT cid FROM `contents` WHERE `cid`={$cid}");
			if (!$content) $this->sendByAjax(array('code'=>1,'message'=>'不存在的留言cid！'));
			$this->db->query("UPDATE `contents` SET `support`=support+1 WHERE `cid`={$cid}");
			$this->sendByAjax(array('code'=>0,'message'=>'顶成功！'));
		}
	}

	/**
	 * @ 踩
	 */
	public function doOppose() {
		if (!isset($_COOKIE['uid'])) {
			$this->sendByAjax(array('code'=>1,'message'=>'你还没有登陆！'));
		} else {
			$cid = isset($_REQUEST['cid']) ? intval($_REQUEST['cid']) : 0;
			if (!$cid) $this->sendByAjax(array('code'=>1,'message'=>'无效留言cid！'));
			$content = $this->db->get("SELECT cid FROM `contents` WHERE `cid`={$cid}");
			if (!$content) $this->sendByAjax(array('code'=>1,'message'=>'不存在的留言cid！'));
			$this->db->query("UPDATE `contents` SET `oppose`=oppose+1 WHERE `cid`={$cid}");
			$this->sendByAjax(array('code'=>0,'message'=>'踩成功！'));
		}
	}

	/**
	 * @ 获取留言列表
	 */
	public function getList() {
		$page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;	//当前页数
		$n = isset($_REQUEST['n']) ? intval($_REQUEST['n']) : 10;	//每页显示条数
		//获取总记录数
		$result_count = $this->db->get("SELECT count('cid') as count FROM `guestbook`");
		$count = $result_count['count'] ? (int) $result_count['count'] : 0;
		if (!$count) {
			$this->sendByAjax(array('code'=>1,'message'=>'还没有任何留言！'));
		}
		$pages = ceil($count / $n);
		 if ($page > $pages) {
			$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
		}
		$start = ( $page - 1 ) * $n;
		$result = $this->db->select("SELECT c.cid,c.uid,u.username,c.content,c.dateline,c.support,c.oppose FROM `guestbook` as c, `users` as u WHERE u.uid=c.uid ORDER BY c.cid DESC LIMIT {$start},{$n}");
		$data = array(
			'count'	=>	$count,
			'pages'	=>	$pages,
			'page'	=>	$page,
			'n'		=>	$n,
			'list'	=>	$result
		);
		$this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
	}


	/* 删除留言*/
	public function delGuset() {
		$id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : '';	//删除的留言id
		if (false === $this->db->query("DELETE FROM `guestbook` WHERE cid={$id}")) {
			$this->sendByAjax(array('code'=>1,'message'=>'删除失败！'));
		} else {
			$this->sendByAjax(array('code'=>0,'message'=>'删除成功！'));
		}
	}

	/* 删除用户*/
	public function delUser() {
		$id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : '';	//删除的留言id
		if (false === $this->db->query("DELETE FROM `users` WHERE uid={$id}")) {
			$this->sendByAjax(array('code'=>1,'message'=>'删除失败！'));
		} else {
			$this->sendByAjax(array('code'=>0,'message'=>'删除成功！'));
		}
	}

	/**
	 * @ 获取用户列表
	 */
	public function getUserList() {
		$page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;	//当前页数
		$n = isset($_REQUEST['n']) ? intval($_REQUEST['n']) : 10;	//每页显示条数
		//获取总记录数
		$result_count = $this->db->get("SELECT count('uid') as count FROM `users`");
		$count = $result_count['count'] ? (int) $result_count['count'] : 0;
		if (!$count) {
			$this->sendByAjax(array('code'=>1,'message'=>'还没有用户！'));
		}
		$pages = ceil($count / $n);
		if ($page > $pages) {
			$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
		}
		if ($page <1 ) {
			$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
		}
			
		$start = ( $page - 1 ) * $n;
		$result = $this->db->select("SELECT uid,username,password,isAdmin  FROM `users`  ORDER BY uid  LIMIT {$start},{$n}");
		$data = array(
			'count'	=>	$count,
			'pages'	=>	$pages,
			'page'	=>	$page,
			'n'		=>	$n,
			'list'	=>	$result
		);
		$this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
	}


	

    /**
     * @ 获取新闻列表
     */
    public function getNewsList() {
        $key = isset($_REQUEST['key']) ? intval($_REQUEST['key']) : 1; //获取类型
        $page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;	//当前页数
        $n = isset($_REQUEST['n']) ? intval($_REQUEST['n']) : 5;	//每页显示条数
        //获取总记录数
        $result_count = $this->db->get("SELECT count('Nid') as count FROM `news` WHERE typeid = {$key}");
        $count = $result_count['count'] ? (int) $result_count['count'] : 0;
        if (!$count) {
            $this->sendByAjax(array('code'=>1,'message'=>'还没有新闻！'));
        }
        $pages = ceil($count / $n);
        if ($page > $pages) {
		$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
	}
	if ($page <1 ) {
		$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
	}
		
        $start = ( $page - 1 ) * $n;
        $result = $this->db->select("SELECT Nid,title,content,date FROM `news` WHERE typeid = {$key} ORDER BY Nid DESC LIMIT {$start},{$n}");
        $data = array(
            'count'	=>	$count,
            'pages'	=>	$pages,
            'page'	=>	$page,
            'n'		=>	$n,
            'list'	=>	$result
        );
        $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
    }
    /*@ 获取新闻单条*/

    public function getNews() {
        $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 1;	//id
        //获取总记录数
        $result_count = $this->db->get("SELECT count('pid') as count FROM `news`");
        $count = $result_count['count'] ? (int) $result_count['count'] : 0;
        if (!$count) {
            $this->sendByAjax(array('code'=>1,'message'=>'还没有新闻！'));
        }
        $result = $this->db->select("SELECT Nid,title,content,date FROM `news` WHERE Nid={$id}");
        $data = array(
            'count'	=>	$count,
            'list'	=>	$result
        );
        $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
    }

     /*@ 获取作品列表*/

        public function getProductList() {
            $key = isset($_REQUEST['key']) ? intval($_REQUEST['key']) : 1; //获取类型
            $page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;	//当前页数
            $n = isset($_REQUEST['n']) ? intval($_REQUEST['n']) : 5;	//每页显示条数
            //获取总记录数
            $result_count = $this->db->get("SELECT count('pid') as count FROM `product` WHERE typeid = {$key}");
            $count = $result_count['count'] ? (int) $result_count['count'] : 0;
            if (!$count) {
                $this->sendByAjax(array('code'=>1,'message'=>'还没有作品！'));
            }
            $pages = ceil($count / $n);
            if ($page > $pages) {
		$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
	    }
	    if ($page <1 ) {
		$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
	    }
		
            $start = ( $page - 1 ) * $n;
            $result = $this->db->select("SELECT pid,name,competition,author,teacher,description,honor,src,type FROM `product` WHERE typeid = {$key} ORDER BY pid DESC LIMIT {$start},{$n}");
            $data = array(
                'count'	=>	$count,
                'pages'	=>	$pages,
                'page'	=>	$page,
                'n'		=>	$n,
                'list'	=>	$result
            );
            $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
        }
        
        /* 更新作品信息 */
       	public function updateProduct(){
			$name = $_POST['name'];
			$author = $_POST['author'];
			$teacher = $_POST['teacher'];
			$honor = $_POST['honor'];
			$competition = $_POST['competition'];
			$type = $_POST['type'];
			$studio = $_POST['studio'];
			$description = $_POST['description'];
			$src = $_POST['src'];
			$typeid = 0;
			if($type=="平面作品"){
				$typeid = 1;
			}else if($type == '影视作品'){
				$typeid = 2;
			}else if($type == '音频作品'){
				$typeid = 3;
			}else{
				$typeid = 4;
			}
			if(isset($_REQUEST['id'])){
       			$id = isset($_REQUEST['id']);
				$result = $this->db->query("UPDATE `product` SET name={$name},author={$author},teacher={$teacher},honor={$honor},competition={$competition},type={$type},studio={$studio},description={$description},src={$src} WHERE pid={$id}");
       		}else{
				$result = $this->db->query("INSERT INTO `product` (`name`, `author`, `teacher`,`description`, `honor`, `src`,`type`, `competition`, `studio`,`typeid`) VALUES ({$name},{$author},{$teacher},{$description},{$honor},{$src},{$type},{$competition},{$studio},{$typeid})");
       		}
			$data = array(
				'list'	=>	$result
			);
			$this->sendByAjax(array('code'=>0,'message'=>'更新成功','data'=>$data));
		}


		/* 更新/添加新闻信息 */
		public function updateNews(){
			$title = $_POST['title'];
			$date = $_POST['date'];
			$content = $_POST['content'];
			$type = $_POST['type'];

			if(isset($_REQUEST['id'])){
				$id = isset($_REQUEST['id']);
				$result = $this->db->query("UPDATE `news` SET title={$title},date={$date},content={$content},type={$type} WHERE Nid={$id}");
			}else{
				$result = $this->db->query("INSERT INTO `product` (`title`, `content`, `date`,`type`) VALUES ({$title},{$content},{$date},{$type})");
			}
			$data = array(
				'list'	=>	$result
			);
			$this->sendByAjax(array('code'=>0,'message'=>'更新成功','data'=>$data));
		}


		/* 更新/添加学生成员信息 */
		public function updateStudent(){
			$name = $_POST['name'];
			$position = $_POST['position'];
			$description = $_POST['description'];
			$type = $_POST['type'];
			$src = $_POST['src'];

			if(isset($_REQUEST['id'])){
				$id = isset($_REQUEST['id']);
				$result = $this->db->query("UPDATE `student` SET name={$name},position={$position},$description={$description},type={$type},src={$src} WHERE tid={$id}");
			}else{
				$result = $this->db->query("INSERT INTO `student` (`name`, `position`, `description`,`type`,`src`) VALUES ({$name},{$position},{$description},{$type},{$src})");
			}
			$data = array(
				'list'	=>	$result
			);
			$this->sendByAjax(array('code'=>0,'message'=>'更新成功','data'=>$data));
		}

		/* 更新/添加学生成员信息 */
		public function updateTeacher(){
			$name = $_POST['name'];
			$position = $_POST['position'];
			$description = $_POST['description'];
			$type = $_POST['type'];
			$src = $_POST['src'];

			if(isset($_REQUEST['id'])){
				$id = isset($_REQUEST['id']);
				$result = $this->db->query("UPDATE `teacher` SET name={$name},position={$position},$description={$description},type={$type},src={$src} WHERE tid={$id}");
			}else{
				$result = $this->db->query("INSERT INTO `teacher` (`name`, `position`, `description`,`type`,`src`) VALUES ({$name},{$position},{$description},{$type},{$src})");
			}
			$data = array(
				'list'	=>	$result
			);
			$this->sendByAjax(array('code'=>0,'message'=>'更新成功','data'=>$data));
		}
         /*@ 获取作品单条*/

                public function getProduct() {
                    $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 1;	//每页显示条数
                    //获取总记录数
                    $result_count = $this->db->get("SELECT count('pid') as count FROM `product`");
                    $count = $result_count['count'] ? (int) $result_count['count'] : 0;
                    if (!$count) {
                        $this->sendByAjax(array('code'=>1,'message'=>'还没有作品！'));
                    }
                    $result = $this->db->select("SELECT pid,name,author,teacher,description,honor,src,type,competition,studio FROM `product` WHERE pid={$id}");
                    $data = array(
                        'count'	=>	$count,
                        'list'	=>	$result
                    );
                    $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
                }


        /*@ 获取学生成员列表*/

        public function getStudentList() {
            $page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;	//当前页数
            $n = isset($_REQUEST['n']) ? intval($_REQUEST['n']) : 5;	//每页显示条数
            //获取总记录数
            $result_count = $this->db->get("SELECT count('tid') as count FROM `student`");
            $count = $result_count['count'] ? (int) $result_count['count'] : 0;
            if (!$count) {
                $this->sendByAjax(array('code'=>1,'message'=>'还没有成员！'));
            }
            $pages = ceil($count / $n);
             if ($page > $pages) {
		$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
	     }
	    if ($page <1 ) {
		$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
	     }
		
            $start = ( $page - 1 ) * $n;
            $result = $this->db->select("SELECT tid,name,position,description,type,src FROM `student` ORDER BY tid DESC LIMIT {$start},{$n}");
            $data = array(
                'count'	=>	$count,
                'pages'	=>	$pages,
                'page'	=>	$page,
                'n'		=>	$n,
                'list'	=>	$result
            );
            $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
        }

		/*@ 获取学生单条*/

                public function getStudent() {
                    $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 1;	//每页显示条数
                    //获取总记录数
                    $result_count = $this->db->get("SELECT count('tid') as count FROM `student`");
                    $count = $result_count['count'] ? (int) $result_count['count'] : 0;
                    if (!$count) {
                        $this->sendByAjax(array('code'=>1,'message'=>'还没有作品！'));
                    }
                    $result = $this->db->select("SELECT * FROM `student` WHERE pid={$id}");
                    $data = array(
                        'count'	=>	$count,
                        'list'	=>	$result
                    );
                    $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
                }



         /*@ 获取教师成员列表*/

                public function getTeacherList() {
                    $page = isset($_REQUEST['page']) ? intval($_REQUEST['page']) : 1;	//当前页数
                    $n = isset($_REQUEST['n']) ? intval($_REQUEST['n']) : 5;	//每页显示条数
                    //获取总记录数
                    $result_count = $this->db->get("SELECT count('tid') as count FROM `teacher`");
                    $count = $result_count['count'] ? (int) $result_count['count'] : 0;
                    if (!$count) {
                        $this->sendByAjax(array('code'=>1,'message'=>'还没有成员！'));
                    }
                    $pages = ceil($count / $n);
                     if ($page > $pages) {
        		$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
        	     }
			if ($page <1 ) {
			$this->sendByAjax(array('code'=>2,'message'=>'没有数据了！'));
			}
		
                    $start = ( $page - 1 ) * $n;
                    $result = $this->db->select("SELECT tid,name,position,description,type,src FROM `teacher` ORDER BY tid DESC LIMIT {$start},{$n}");
                    $data = array(
                        'count'	=>	$count,
                        'pages'	=>	$pages,
                        'page'	=>	$page,
                        'n'		=>	$n,
                        'list'	=>	$result
                    );
                    $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
                }

			/*@ 获取老师单条*/

                public function getTeacher() {
                    $id = isset($_REQUEST['id']) ? intval($_REQUEST['id']) : 1;	//每页显示条数
                    //获取总记录数
                    $result_count = $this->db->get("SELECT count('tid') as count FROM `teacher`");
                    $count = $result_count['count'] ? (int) $result_count['count'] : 0;
                    if (!$count) {
                        $this->sendByAjax(array('code'=>1,'message'=>'还没有老师！'));
                    }
                    $result = $this->db->select("SELECT * FROM `teacher` WHERE pid={$id}");
                    $data = array(
                        'count'	=>	$count,
                        'list'	=>	$result
                    );
                    $this->sendByAjax(array('code'=>0,'message'=>'','data'=>$data));
                }

	/**
	 * @ 用户名验证
	 */
	private function _verifyUserName($username='') {
		if (strlen($username) < 3 || strlen($username) > 16) {
			return 1;
		}
		$rs = $this->db->get("SELECT `username` FROM `users` WHERE `username`='{$username}'");
		if ($rs) return 2;
		return 0;
	}
}