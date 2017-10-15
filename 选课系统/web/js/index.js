//给登录绑定事件：
$('#login').on('click',function(){
	$('#modal section').css('display','none');
	$('#modal aside').css('display','block');
	$('#modal aside').css('background','green');
	$('#content').css('opacity','0.3');
});
$('#loginConfirm').on('click',function(){
	var user = $('#loginIndex').val();//html();text();
	var passwd = $('#loginPasswd').val();
	var arr = [],flag=0;
	$.getJSON(bashpath+'/users/findByName?name='+user,function(data){
		if(data.length>0){
			data.forEach(function(item){
				arr.push(item.passwd);
			});
			for(var i=0;i<arr.length;i++){
				if(passwd == arr[i]){
					flag = 1;
				}
			}
			if(flag == 1){
				alert('登录成功！');
				$('#loginBack').trigger('click');
				window.location.href = 'main.html?'+user;//页面之间不用写user=，前端拿值更方便。
			}else{
				alert('密码错误！请重新输入！');
				$('#loginPasswd').val('');
			}
		}else{
			alert('用户名不存在，请先注册！');
			$('#register').trigger('click');
		}
	});
});
$('#loginBack').on('click',function(){
	$('#modal aside').css('display','none');
	$('#content').css('opacity','1');
});
//给注册绑定事件：
$('#register').on('click',function(){
	$('#modal aside').css('display','none');
	$('#modal section').css('display','block');
	$('#modal section').css('background','green');
	$('#content').css('opacity','0.3');
});
$('#registerConfirm').on('click',function(){
	var user = $('#registerIndex').val();
	var passwd = $('#registerPasswd').val();
	var repasswd = $('#registerRePasswd').val();
	var phone = $('#registerPhone').val();
	var email = $('#registerEmail').val();
	if(passwd == repasswd){
		$.getJSON(bashpath+'/users/adds?name='+user+'&passwd='+passwd+'&email='+email+'&phone='+phone,function(){
			alert('注册成功！');
			$('#registerBack').trigger('click');
		});
	}else{
		alert('密码输入前后不一致，请重新输入！');
		$('#registerPasswd').val('');
		$('#registerRePasswd').val('');
	}
	
});
$('#registerBack').on('click',function(){
	$('#modal section').css('display','none');
	$('#content').css('opacity','1');
});