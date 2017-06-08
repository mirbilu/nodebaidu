<?php 
	header("Content-type:application/json;charset=utf-8");
	$link = mysqli_connect('localhost','root','root','baidunews',8889);
	if($link){
		$newsid=$_POST['newsid'];
		mysqli_query($link,"SET NAMES utf8");
		$sql="DELETE FROM news WHERE id={$newsid}";
		mysqli_query($link,$sql);		
		echo json_encode(array('删除状态'=>'成功'));		
	};
	mysqli_close($link);
 ?>