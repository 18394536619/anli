var mysql = require('mysql');
var pool = mysql.createPool({
	host:'127.0.0.1',
	port:'3306',
	database:'web1701s2',
	user:'root',
	password:'root'
});
//连接数据库函数：
function pgc(sql,a,handler){
	pool.getConnection(function(err,connection){
		if(err){
			throw err;			//谁调用，异常抛给谁。
		}else{
			connection.query(sql,a,function(err,results){
				if(err){
					throw err;  //谁调用，异常抛给谁。
				}else{
					handler.call(this,results);
				}
				connection.release();
			});
		}
	});
}
global.pool = pool;    //全局暴露
global.pgc = pgc;
