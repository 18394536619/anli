var pool = global.pool;
var pgc = global.pgc;
if(!pool){  //如果!pool是真的（即pool是假的，也即pool为空对象的时候，即pool没有被建立）
	return ;  //下面代码不被执行。那么findAll等等这些函数就不会被声明和暴露，后台就会报错，findAll is not a function。
}

var my = ' questionbank ';
//var sql1 = 'select * from questionbank';
var sql1 = 'select * from'+my;
var sql2 = 'delete from'+my+'where id = ?';
var sql3 = 'insert into'+my+'values(null,?,?,?,?,?,?,?,?,?,?)';
var sql4 = 'update'+my+'set type=?,department=?,point=?,difficult=?,stem=?,option2=?,answer=?,value2=?,super2=?,time2=? where id=?';
var sql5 = 'select * from'+my+'where id=?';
//var sql7 = 'select * from'+my+'where type like %?% or department like %?% or point like %?% or difficult like %?% or stem like %?% or option2 like %?% or answer like %?% or value2 like %?% or super2 like %?% or time2 like %?%';

//查询全部：
function findAll(handler){
	var a1;
	pgc(sql1,a1,handler);
}
//删除：
function deleteById(id,handler){
	var a2 = [id];
	pgc(sql2,a2,handler);
}
//增加：
function adds(type,department,point,difficult,stem,option2,answer,value2,super2,time2,handler){
	var a3 = [type,department,point,difficult,stem,option2,answer,value2,super2,time2];
	pgc(sql3,a3,handler);
}
//修改：
function updates(id,type,department,point,difficult,stem,option2,answer,value2,super2,time2,handler){
	var a4 = [type,department,point,difficult,stem,option2,answer,value2,super2,time2,id];//option插进去报错。因为option是关键字。
	pgc(sql4,a4,handler);
}
//通过id来查找题目：
function findById(id,handler){
	var a5 = [id];
	pgc(sql5,a5,handler);
}
//通过关键字查询：
function findByKeys(keys,handler){
	var sql7 = 'select * from questionbank where type like "%'+keys+'%" or department like "%'+keys+'%" or point like "%'+keys+'%" or difficult like "%'+keys+'%" or stem like "%'+keys+'%" or option2 like "%'+keys+'%" or answer like "%'+keys+'%" or value2 like "%'+keys+'%" or super2 like "%'+keys+'%" or time2 like "%'+keys+'%"';
	var a7;
	pgc(sql7,a7,handler);
}
//通过tdpd(type,department,point,difficult)来查找题目：
function findByTdpd(type,department,point,difficult,handler){
	var a6 = [],s=[];
	var s1,s2,s3,s4,str;
	if(type=='全部'){
		s1 = '';
	}else{
		s1 = 'type=? ';
		a6.push(type);s.push(s1);
	}
	if(department=='全部'){
		s2 = '';
	}else{
		s2 = 'department=? ';
		a6.push(department);s.push(s2);
	}
	if(point=='全部'){
		s3 = '';
	}else{
		s3 = 'point=? ';
		a6.push(point);s.push(s3);
	}
	if(difficult=='全部'){
		s4 = '';
	}else{
		s4 = 'difficult=?';
		a6.push(difficult);s.push(s4);
	}
	str = "";
	for(var i=0;i<s.length;i++){
		if(i==0){
			str += 'where '+s[i];
		}else{
			str += 'and '+s[i];
		}
	}
	var sql6 = 'select * from'+my+str;
//	console.log(a6);
	pgc(sql6,a6,handler);
}

module.exports = {
	findAll : findAll,
	deleteById : deleteById,
	findById: findById,
	adds : adds,
	updates : updates,
	findByTdpd : findByTdpd,
	findByKeys : findByKeys
}