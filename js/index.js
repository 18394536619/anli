//给登录绑定事件
$('#login').on('click',function(){
	$('#modal section').css('display','none');//隐藏注册页面
	$('#modal aside').css('display','block');//显示登录页面
	$('#modal aside').css('background','green');
	$('#content').css('opacity','0.3');//设置背景透明度
});
$('#loginConfirm').on('click',function(){//给登录按钮绑定事件
	var user = $ ('#loginIndex').val();//val不写参数,表示获取html() text()
	var passwd = $ ('#loginPasswd').val();
	var arr=[],flag=0;
	$.getJSON(bashpath+'/users/findByName?name='+user,function(data){
		if(data.length>0){
			data.forEach(function(item){//获取后台密码
				arr.push(item.passwd);
			});
			for(var i=0;i<arr.length;i++){//判断密码是否正确
				if(passwd==arr[i]){
					flag=1;
				}
			}
			if(flag==1){
				alert('登录成功!');
				$('#loginBack').trigger('click');//默认点击返回，返回到主页面
				window.location.href = 'mian.html?'+user;
			}else{
				alert('密码错误!请重新输入');
				$('#loginPasswd').val('');//错误密码清零
			}
		}else{
			alert('用户不存在,请注册');//如不存在，默认点击注册
			$('#register').trigger('click');
		}
	});

});
//给返回按钮绑定事件
$('#loginBack').on('click',function(){
	$('#modal aside').css('display','none');//隐藏登录页面
	$('#content').css('opacity','1');//背景透明度恢复
})
//给注册绑定事件
$('#register').on('click',function(){//给注册页面绑定事件
	$('#modal aside').css('display','none');//隐藏登录页面
	$('#modal section').css('display','block');
	$('#modal section').css('background','green');
	$('#content').css('opacity','0.3');
});
$('#registerConfirm').on('click',function(){//给注册的确定按钮绑定事件
	var user=$('#registerIndex').val();
	var passwd=$('#registerPasswd').val();
	var repasswd=$('#registerRePasswd').val();
	var phone=$('#registerPhone').val();
	var email=$('#registerEmail').val();
	if(passwd==repasswd){
		$.getJSON(bashpath+'/users/adds?name='+user+'&passwd='+passwd+'&email='+email+'&phone='+phone,function(){
			alert('注册成功');
			$('#registerBack').trigger('click');//默认点击返回
		});		
	}else{
		alert('密码输前后不一致,请重新输入!');
		//清空密码，重置密码
		$('#registerPasswd').val('');
		$('#registerRePasswd').val('');
	}
});
$('#registerBack').on('click',function(){//给注册的返回绑定事件
	$('#modal section').css('display','none');
	$('#content').css('opacity','1');

})