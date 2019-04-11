/*
	模块说明
	init模块
		用来引入css并配合进行一些响应式操作的js，不与其他模块交互
	global模块
		用来提供一些页面相关的全局变量 ，比如canvas对象，图片等
	data模块
		提供一个getData接口来加载指定关卡的数据
	sokoMao模块
		生成不同关卡对应的完整地图对象，并进行静态场景的绘制
	rolers模块
		定义箱子和玩家类，提供专属方法，对外暴露类
	game模块
		游戏核心控制器。管理场景和角色，并调用他们的行为方法，控制游戏进程
	ui模块
		界面效果控制器，负责交互的js，进行事件监听并提供相应接口
	index.js
		应用启动入口，将ui控制器和游戏控制器 相互绑定，使游戏可操作
*/



//初始化操作
require('./init.js')

//加载ui控制器
var {ui} = require('./ui.js');
//加载游戏控制器
var {game} = require('./game.js');


//将游戏对象的操作绑定到ui对象上去
//绑定移动操作
ui.setMove('up',game.up);
ui.setMove('right',game.right);
ui.setMove('down',game.down);
ui.setMove('left',game.left);
//绑定启动回调
ui.setToGameBegin(game.init);
ui.setToMenu(game.end);
//绑定结束回调
game.setOverBack(()=>{setTimeout(ui.result,300);});

//部分按钮没有页面操作 不需要以回调形式处理 直接监听
ui.cancleBtn.onclick = game.cancle.bind(null,undefined);
ui.replayBtn.onclick = game.reInitGame.bind(null,undefined)




