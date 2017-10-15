//左侧栏：
$('.mainLeft1').on('click',function(){
	$('.mainLeftn').css('display','none');//清空全部隐藏。
	var ul = $(this).parent();
	$(ul).find('.mainLeftn').css('display','block');//点击的显示。
});
//默认点击：
var leftone = $('.mainLeft1').eq(0);
$(leftone).trigger('click');
//跳转页面：
$('.mainLeftn').on('click',function(){
	$('section #content').load('router/'+$(this).attr('u')+'.html');
});
//默认点击：
var leftn = $('.mainLeftn').eq(0);
$(leftn).trigger('click');
//退出登录：
$('#quit').on('click',function(){
	window.location.href = 'index.html';
});
//跳转到帮助：
$('#help').on('click',function(){
//	window.location.href = 'router/help.html';
//	location.href = 'router/help.html';
//	window.location = 'router/help.html';
	location = 'router/help.html';
});
//获取user：
var user = decodeURI(window.location.href.split('?')[1]);
$('#user').text(user);


//bug:
//多选题中，如果用户点击的是一样的选项（答案有重复），该怎么处理？

