<?php 
	header("Content-type:application/json;charset=utf-8");
	// $arr =array(
	// 	'newstype'=> '百家',
	// 	'newsimg'=> 'img/ninja149152921930047.jpg',
	// 	'newstime'=> '2017-04-12',
	// 	'newssrc'=> '极客',
	// 	'newstitle'=> '标题');
	$link = mysqli_connect('localhost','root','root','baidunews',8889);
	if($link){
		//获取成功
		// echo json_encode(array('连接信息' => 'true'));
		if ($_GET['newstype']){
			$newstype=$_GET['newstype'];
			$sql="SELECT * FROM `news` WHERE `newstype`='{$newstype}'";
			mysqli_query($link,"SET NAMES utf8");
			$result=mysqli_query($link,$sql);
			$senddata=array();
			while($row=mysqli_fetch_assoc($result)){
				array_push($senddata, array(
						'id'=>$row['id'],
						'newstype'=>$row['newstype'],
						'newstitle'=>$row['newstitle'],
						'newsimg'=>$row['newsimg'],
						'newstime'=>$row['newstime'],
						'newssrc'=>$row['newssrc'],
					));
			}
			echo json_encode($senddata);
		}else{
			$sql='SELECT * FROM news';
			mysqli_query($link,"SET NAMES utf8");
			$result=mysqli_query($link,$sql);
			$senddata=array();
			while($row=mysqli_fetch_assoc($result)){
				array_push($senddata, array(
						'id'=>$row['id'],
						'newstype'=>$row['newstype'],
						'newstitle'=>$row['newstitle'],
						'newsimg'=>$row['newsimg'],
						'newstime'=>$row['newstime'],
						'newssrc'=>$row['newssrc'],
					));
			}
			echo json_encode($senddata);
		};	
	}else{
		echo json_encode(array('连接信息' => 'false'));
	};
	mysqli_close($link);
	// echo json_encode($arr);
	// echo json_encode(array('连接信息' => 'true'));	
?>
