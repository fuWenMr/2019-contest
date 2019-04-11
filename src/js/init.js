//加载css对象
require('../css/style.css');
require('../css/style2.css');
//我傻了 直接用媒体查询啊
// window.onresize=function(){
// 	var  j = document.body.clientWidth;
// 	if(j>500)
// 	{
// 	  document.getElementById("keyboard").style.setProperty("visibility","hidden");
// 	}
// 	else
// 	{
// 		document.getElementById("keyboard").style.setProperty("visibility","visible");
// 	}
// }
//

//平板设备添加按钮
var os = function (){
	var ua = navigator.userAgent,
	isWindowsPhone = /(?:Windows Phone)/.test(ua),
	isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
	isAndroid = /(?:Android)/.test(ua),
	isFireFox = /(?:Firefox)/.test(ua),
	isChrome = /(?:Chrome|CriOS)/.test(ua),
	isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
	isPhone = /(?:iPhone)/.test(ua) && !isTablet,
	isPc = !isPhone && !isAndroid && !isSymbian;
	return {
		isTablet: isTablet,
		isPhone: isPhone,
		isAndroid: isAndroid,
		isPc: isPc
	};	
}();
window.os =os;
if(os.isTablet){
	window.document.getElementById('keyboard').style.setProperty('visibility','visible');
}


var levelnum=require('./data.js').getData().length;
creatlevel(levelnum);//关卡数量控制方法
function creatlevel(value)
{
	var levelcont = document.getElementById("contentL");
	levelcont.innerHTML="";
	
	if(value>25){value =25;}
		let documentFragment = new DocumentFragment();
		for(let i=1;i<=value;i++)
		{
			var newLevel = document.createElement('div');
			newLevel.setAttribute("class","level");
			newLevel.dataset.index=i-1;
			newLevel.innerHTML=i;
			documentFragment.appendChild(newLevel);
		 }
		 levelcont.appendChild(documentFragment);
}