<?php
header('Content-type:text/html; charset="utf-8"');

$base_dir = dirname(dirname(dirname(__FILE__)));
$upload_dir = 'product/';

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status(array('code'=>1,'msg'=>'错误提交方式'));
}
//iconv('UTF-8', 'GBK', $pic)中文转码
if(array_key_exists('file',$_FILES) && $_FILES['file']['error'] == 0 ){

	$pic = $_FILES['file']['name'];
	
	if(!is_dir($upload_dir)){
		exit_status(array('code'=>0,'msg'=>'上传失败','url'=>'路径不存在'));
	} 
	
	if(move_uploaded_file($_FILES['file']['tmp_name'],iconv('UTF-8', 'GB2312', $upload_dir.$pic))){

		exit_status(array('code'=>0,'msg'=>'上传成功','url'=>$upload_dir.$pic));
	}else{
		

		    switch ( $_FILES['myfile']['error']  ) { 
            		case UPLOAD_ERR_OK: 
               	 		$response = 'There is no error, the file uploaded with success.'; 
                		break; 
            		case UPLOAD_ERR_INI_SIZE: 
                		$response = 'The uploaded file exceeds the upload_max_filesize directive in php.ini.'; 
                		break; 
            		case UPLOAD_ERR_FORM_SIZE: 
                		$response = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.'; 
                		break; 
            		case UPLOAD_ERR_PARTIAL: 
                		$response = 'The uploaded file was only partially uploaded.'; 
                		break; 
            		case UPLOAD_ERR_NO_FILE: 
                		$response = 'No file was uploaded.'; 
                		break; 
            		case UPLOAD_ERR_NO_TMP_DIR: 
                		$response = 'Missing a temporary folder. Introduced in PHP 4.3.10 and PHP 5.0.3.'; 
                		break; 
            		case UPLOAD_ERR_CANT_WRITE: 
                		$response = 'Failed to write file to disk. Introduced in PHP 5.1.0.'; 
                		break; 
            		case UPLOAD_ERR_EXTENSION: 
                		$response = 'File upload stopped by extension. Introduced in PHP 5.2.0.'; 
                		break; 
            		default: 
                		$response = 'Unknown error'; 
                		break; 
       			} 
        		
          		exit_status(array('code'=>0,'url'=>'上传失败','l'=>$response));
        		exit;
	}


}
exit_status(array('code'=>1,'msg'=>'出现了一些错误','PATH'=>$_FILES['file']['error']));

function exit_status($str){
	echo json_encode($str);
	exit;
}
?>