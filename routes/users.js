var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'baidunews'
});
/* 后台路由页面. */
// 获取所有新闻列表
router.get('/getnews', function(req, res, next) {
    connection.query('SELECT * FROM `news` ORDER BY `id` DESC',function(err,rows){
    	res.json(rows);
    });
});
// 确认修改
router.post('/curnews', function(req, res) {
	var newsid = req.body.id,
		newstype = req.body.newstype,
		newstitle = req.body.newstitle,
		newstime = req.body.newstime,
		newsimg = req.body.newsimg,
		newssrc = req.body.newssrc;
    connection.query('UPDATE `news` SET `newstype`= ?,`newsimg`= ?,`newstime`= ?,`newssrc`= ?,`newstitle`= ? WHERE `id`= ?',[newstype,newsimg,newstime,newssrc,newstitle,newsid],function(err,rows){
    	res.json(rows);
    	console.log(rows.changedRows);
    	
    });
});
// 修改新闻
router.get('/update', function(req, res) {
	var newsid=req.query.newsid;
    connection.query('SELECT * FROM `news` WHERE `id` = ?',[newsid],function(err,rows){
    	res.json(rows);
    });
});
// 删除功能
router.post('/delete', function(req, res) {
	var newsid = req.body.newsid;
	connection.query('DELETE FROM `news` WHERE `id`=?',[newsid],function(err,result){
		res.json(result);
		console.log(result.affectedRows);
		
	});		
});
// 添加
router.post('/insert', function(req, res) {
	var newstype=req.body.newstype,
		newstitle = req.body.newstitle,
		newstime = req.body.newstime,
		newsimg = req.body.newsimg,
		newssrc = req.body.newssrc;
	connection.query('INSERT INTO `news`(`newstype`,`newsimg`,`newstime`,`newssrc`,`newstitle`) VALUES (?, ?, ?, ?, ?) ',[newstype,newsimg,newstime,newssrc,newstitle],function(err,result){
		if (!err) {
			res.json(result);
			console.log(result.insertId);
			
		};
	});
});

module.exports = router;
