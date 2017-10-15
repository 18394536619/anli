require('./db/pool');  //导入模块（js文件）。
var questionDB = require('./db/questionDB');
var usersDB = require('./db/usersDB');

var http = require('http');
var url = require('url');
var qs = require('querystring');

var server = http.createServer(function(req,resp){
	var pathname = url.parse(req.url).pathname;
	var method = req.method;
	var qp = qs.parse(url.parse(req.url).query);
	var id = qp.id;
	var name=qp.name,passwd=qp.passwd,email=qp.email,phone=qp.phone;
	var type=qp.type,department=qp.department,point=qp.point,difficult=qp.difficult,stem=qp.stem,option2=qp.option2,answer=qp.answer,value2=qp.value2,super2=qp.super2,time2=qp.time2;
	var keys=qp.keys;
	resp.writeHead(200,'ok',{
		'Content-Type':"text/plain;charset=utf-8",
		'Access-Control-Allow-origin':'*'   //服务器提供的数据可以给任何人.
	});
	switch(pathname){
		case '/questions':
		questionDB.findAll(function(results){
			resp.end(JSON.stringify(results));
		});break;
		case '/questions/deleteById':
		questionDB.deleteById(id,function(results){
			resp.end('delete success2!');
		});break;
		case '/questions/adds':
		questionDB.adds(type,department,point,difficult,stem,option2,answer,value2,super2,time2,function(results){
			console.log(results);
			resp.end(JSON.stringify(results));
		});break;
		case '/questions/updates':
		questionDB.updates(id,type,department,point,difficult,stem,option2,answer,value2,super2,time2,function(results){
			resp.end(JSON.stringify(results));
		});break;
		case '/questions/findById':
		questionDB.findById(id,function(results){
			resp.end(JSON.stringify(results));
		});break;
		case '/questions/findByTdpd':
		questionDB.findByTdpd(type,department,point,difficult,function(results){
			resp.end(JSON.stringify(results));
		});break;
		case '/questions/findByKeys':
		questionDB.findByKeys(keys,function(results){
			resp.end(JSON.stringify(results));
		});break;

		case '/users/adds':
		usersDB.adds(name,passwd,email,phone,function(results){
			resp.end(JSON.stringify(results));
		});break;
		case '/users/findByName':
		usersDB.findByName(name,function(results){
			resp.end(JSON.stringify(results));
		});break;
	}
});

server.listen(8080,function(){
	console.log('端口号为8080的服务器已经启动...');
});