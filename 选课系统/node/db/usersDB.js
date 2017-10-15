var pool = global.pool;
var pgc = global.pgc;
if(!pool){  
	return ;
}

var my = ' users ';
//var sql1 = 'select * from'+my;
//var sql2 = 'delete from'+my+'where id = ?';
var sql3 = 'insert into'+my+'values(null,?,?,?,?)';
//var sql4 = 'update'+my+'set name=?,passwd=?,email=?,phone=? where id=?';
var sql5 = 'select * from'+my+'where name=?';

//查询全部：
/*function findAll(handler){
	var a1;
	pgc(sql1,a1,handler);
}*/
//删除：
/*function deleteById(id,handler){
	var a2 = [id];
	pgc(sql2,a2,handler);
}*/
//增加：
function adds(name,passwd,email,phone,handler){
	var a3 = [name,passwd,email,phone];
	pgc(sql3,a3,handler);
}
//修改：
/*function updates(id,name,passwd,email,phone,handler){
	var a4 = [name,passwd,email,phone,id];
	pgc(sql4,a4,handler);
}*/
//通过name来查找用户：
function findByName(name,handler){
	var a5 = [name];
	pgc(sql5,a5,handler);
}


module.exports = {
//	findAll : findAll,
//	deleteById : deleteById,
	findByName: findByName,
	adds : adds
//	updates : updates
}