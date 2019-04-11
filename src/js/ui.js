

var {canv1,canv2} = require('./global.js');
/**
 * 部分dom
 */
var cancleBtn = window.document.getElementById('cancleBtn');
var menuBtn = window.document.getElementById('menuBtn');
var replayBtn = window.document.getElementById('replayBtn');
var resDom = window.document.getElementById('res');
var hardBtn = window.document.getElementById('hardBtn');

var contentLDom = window.document.getElementById('contentL'); 



/**
 * 监听键盘和页面方向键位
 */
window.document.body.addEventListener('keyup',function(e){
	var code =e.keyCode;
	switch(code)
	{
		case 38:
			move('up');
			break;
		case 39:
			move('right');
			break;
		case 40:
			move('down');
			break;
		case 37:
			move('left');
			break;
	}
	e.stopPropagation();
});
window.document.getElementById('upBtn').onclick = function(){move('up');};
window.document.getElementById('leftBtn').onclick = function(){move('left');};
window.document.getElementById('rightBtn').onclick = function(){move('right');};
window.document.getElementById('downBtn').onclick = function(){move('down');};

//监听菜单按钮的点击
menuBtn.onclick = function(){
	menu();
}
resDom.querySelector('.mybutton.to_menu').onclick = function(){
	res.style.setProperty("visibility","hidden");
	menuBtn.click();
};
//监听难度按钮
{
	let show = ['全部难度','简单','中等','困难'];
	hardBtn.onclick = function(){
		var levelDoms = contentLDom.querySelectorAll('.level');
		var length = levelDoms.length;
		console.log(levelDoms,length);
		var level = ~~hardBtn.dataset.level;
		level = show[level+1]?level+1:0;
		hardBtn.innerHTML = show[level];
		hardBtn.dataset.level = level;
		//比例计算
		var flag = [0,Math.max(length/3,1),Math.max(2*length/3,2),length]
		//ui更新
		if(level==0){ level=1;flag[1]=length}
		console.log('level',level,flag);
		for(let i=0;i<length;i++)
		{
			if(i>=flag[level-1]&&i<flag[level])
			{
				//显现
				levelDoms[i].classList.remove('hidden');
			}
			else
			{
				//隐藏
				levelDoms[i].classList.add('hidden');
			}
			
		}
	}
}

//监听关卡按钮的点击 事件委托
window.document.getElementById("contentL").addEventListener('click',function(e){
	if(e.target.classList.contains('level'))
	{
		gameBegin(e.target.dataset.index);
	}
});


/**
 * 回到选关菜单的方法
 * @method menu
 */
function menu()
{
	uiHandler.toMenu();
	contentLDom.style.setProperty("visibility","visible");
	canv1.style.setProperty("visibility","hidden");
	canv2.style.setProperty("visibility","hidden");
	res.style.setProperty("visibility","hidden");
}

/**
 * 回到选关菜单的方法
 * @method gameBegin
 */
function gameBegin(value)
{
	contentLDom.style.setProperty("visibility","hidden");
	res.style.setProperty("visibility","hidden");
	uiHandler.toGameBegin(value);
	canv1.style.setProperty("visibility","visible");
	canv2.style.setProperty("visibility","visible");
}

/**
 * 回到选关菜单的方法
 * @method result
 */
function result(value)
{
	res.style.setProperty("visibility","visible");
	var resword = document.getElementById("resword");
	resword.innerHTML="游戏成功!";
	var mb = res.querySelector('.mybutton.next');
	if(window.maxIndex&&window.index)
	{
		if(window.maxIndex<=window.index)
		{
			mb.innerHTML = '通关!';
			mb.onclick = function(){menuBtn.click();}
			return;
		}
	}
	mb.innerHTML = '下一关!';
	mb.onclick = function(){gameBegin(new Number(window.index)+1);}
}


//节流标志
var isMoving = true;
//界面对应的移动事件
function move(dir)
{
	if(!isMoving){return;}
	isMoving = false;
	setTimeout(isMoving=true,150);
	dir = dir.toLowerCase();
	if(movehandler[dir])
	{
		movehandler[dir]();
	}
}

/**
 * handler里提供的方法有模块内部调用
 * 但是暴露出接口设置这些方法
 */

//界面交互的handler
var uiHandler = {
	toMenu:()=>{},		//点击主菜单时会执行的额外
	toGameBegin:()=>{},	//进入某关时会触发的操作
}
//移动控制handler
var movehandler={
	up:()=>{},
	down:()=>{},
	right:()=>{},
	left:()=>{},
};
var ui = {
	setMove(dir,fun){
		dir = dir.toLowerCase();
		if(movehandler[dir])
		{
			movehandler[dir] = fun;
		}
	},
	setToMenu(fun){
		uiHandler.toMenu = fun;
	},
	setToGameBegin(fun){
		uiHandler.toGameBegin = fun;
	},
	result,
	//dom对象
	cancleBtn,
	replayBtn,
};

module.exports = {ui};