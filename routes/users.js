var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('./db');

var connection = mysql.createPool(dbconfig);

/*后台路由页面  begin*/

//获取所有新闻列表
router.get('/getnews', function(req, res, next) {
  connection.query('SELECT * FROM `news`',function (err,rows) {
  	if (!err) {
  		res.json(rows);
  	}
  });

});


//编辑新闻
router.get('/curnews',function (req,res) {
	var newsid = req.query.newsid;
	connection.query('SELECT * FROM `news` WHERE id = ?',[newsid],function (err,rows) {
		res.json(rows);
	});
		
});

//确认修改
router.post('/update',function (req,res) {
	var newsid = req.body.newsid,
		newstitle = req.body.newstitle,
		newsimg = req.body.newsimg,
		newstime = req.body.newstime,
		newstype= req.body.newstype;
	connection.query('UPDATE `news` SET `newstitle`=?,`newsimg`=?,`newstime`=?,`newstype`=? WHERE `id`=?',[newstitle,newsimg,newstime,newstype,newsid],function (err,rows) {
		if (!err) {
			res.json({'修改新闻':'成功'});
		}		
	});
	
});


//删除新闻
router.post('/delete',function (req,res) {
	var newsid = req.body.newsid;
	connection.query('DELETE FROM `news` WHERE `news`.`id` = ?',[newsid],function (err,result) {
		if (!err) {
			res.json({'删除新闻':'成功'});
		}		
	});
});

//添加新闻
router.post('/insert',function (req,res) {
	var  newstitle = req.body.newstitle,
		newsimg = req.body.newsimg,
		newstime = req.body.newstime,
		newstype = req.body.newstype;
	connection.query('INSERT INTO `news`(`newstitle`,`newsimg`,`newstime`,`newstype`) VALUES(?,?,?,?)',[newstitle,newsimg,newstime,newstype],function (err,result) {
		if (!err) {
			res.json({'添加新闻':'成功'});
		}		
	});
});

/*后台路由页面  end*/



module.exports = router;
