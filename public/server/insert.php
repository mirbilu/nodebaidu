<?php 
	header("Content-type:application/json;charset=utf-8");
	$link = mysqli_connect('localhost','root','root','baidunews',8889);
	if($link){
		// 插入新闻
		$newstitle=$_POST['newstitle'];
		$newsimg=$_POST['newsimg'];
		$newstime=$_POST['newstime'];
		$newssrc=$_POST['newssrc'];
		$newstype=$_POST['newstype'];
		// 查询语句
		$sql="INSERT INTO news (newstype,newsimg,newstime,newssrc,newstitle) VALUES ('{$newstype}','{$newsimg}','{$newstime}','{$newssrc}','{$newstitle}')";		
		mysqli_query($link,"SET NAMES utf8");
		$result=mysqli_query($link,$sql);		
		echo json_encode(array('success'=>'ok'));
	}
 ?>