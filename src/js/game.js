/**
 * game模块 进行游戏对象和场景的管理,提供游戏控制的核心接口,是控制游戏的核心模块
 * @module data
 */

var {getData} = require('./data.js');
var {SokoMap} = require('./sokoMap.js');
var {Box,Player} = require('./roler.js');


/**
 * 常量
 */
// cavas宽度 用来计算缩放比例
const canvSize =require('./global').canv1.width;
// 允许的最大方格边长
const minBlockSize=80;

//是否在进行中
var isGame = false;
//存储当前的游戏信息
var game = {
	sokoMap:[],	//地图数组
	box:[],		//箱子数组
	player:{},	//玩家对象
	score:0,	//剩余分数
	isWin:false,//是否胜利
	history:[],	//操作历史栈 用来进行撤销操作
};
/**
 * 重置game对象的方法
 * @method reGame 
 * @param {Object} data 用来重启的关卡数据 
 */
function reGame(data)
{
	game.sokoMap=[];
	game.box=[];
	game.player={};
	game.score=data.targets.length;
	game.isWin=false;
	game.history = [];
}

/**
 * 初始化某关卡的方法
 * @method gameInit 
 * @param {Number} [number=0] 启动的关卡数
 */

var lastNumber =-1;
function gameInit(number=0)
{
	//加载关卡数据
	data = getData(number);
	if(!data){return;}
	lastNumber = number;
	window.index = number;
	reGame(data);
	//计算方格大小 最大值为50
	var maxS = Math.max(data.size[0],data.size[1]);
	var blockSize = Math.min(parseInt(canvSize/maxS),minBlockSize);
	var centerIndex = data.size[0]/2;
	//创建并绘制地图
	game.sokoMap = new SokoMap(data,blockSize).draw();
	
	//加载移动元素
	let tempData= {blockSize,centerIndex};
	//创建箱子对象并填充进场景
	for(let boxIndex of data.boxs)
	{
		let block = game.sokoMap[boxIndex[0]][boxIndex[1]];
		let box = new Box(boxIndex[0],boxIndex[1],tempData).draw();
		if(block.isTarget)
		{
			//开始就在盘子里的要计算
			box.setIsIn(block.isTarget);
			game.score--;
		}
		game.box.push(box);
		block.box = box;
	}
	//创建玩家对象并填充进场景
	game.player = new Player(data.palyer[0],data.palyer[1],tempData).draw();
	//开启监听
	isGame = true;
}

function reInitGame()
{
	if(!isGame){return;}
	gameInit(lastNumber);
}
function end()
{
	isGame = false;
}


/**
 * 游戏(获胜)结束的方法
 * @method gameInit 
 * @param {Number} [number=0] 启动的关卡数
 */
function gameOver()
{
	game.isWin = true;
	isGame = false;
	//执行的回调
	overBack();
}
/* 定义回调*/
function overBack(){};

//在这里提供游戏运行所需要的接口
//记录上一次的运动轨迹
/**
 * 移动玩家的方法 
 * @method move 
 * @param {Number} dx 横坐标偏移量
 * @param {Number} dy 纵坐标偏移量
 */
function move(dx,dy)
{
	
	var tX = game.player.x+dx;
	var tY = game.player.y+dy;
	var next;
	var isNextWall;
	//这堆判断写的好丑
	try
	{
		next = game.sokoMap[tX][tY];
		isNextWall=next.isWall;
	}
	//说明越界
	catch(e)
	{
		console.log('越界');return;
	}
	var isBoxMove = false;
	//首先判断是不是墙
	if(isNextWall){console.log('石墙');return;}
	//然后判断是不是箱子
	if(next.box)
	{
		if(!game.sokoMap[tX+dx][tY+dy]){console.log('二级越界');return;}
		//下下格子是不是箱子
		console.log(game.sokoMap[tX+dx][tY+dy].box,game.sokoMap[tX+dx][tY+dy].isWall,game.sokoMap[tX+dx][tY+dy].box||game.sokoMap[tX+dx][tY+dy].isWall);
		if(game.sokoMap[tX+dx][tY+dy].box||game.sokoMap[tX+dx][tY+dy].isWall)
		{ console.log('二级箱子');return; }
		else
		{
			isBoxMove = true;
			boxMove(tX,tY,dx,dy);
		}
	}
	//玩家走
	console.log('走起');
	//历史栈需要三个数据
	game.history.push([dx,dy,isBoxMove]);
	game.player.move(dx,dy);

	//每次移动结束进行一次判断
	if(game.score<=0)
	{
		//游戏结束
		gameOver();
	}
}
/**
 * 撤销操作的方法,游戏进行中才生效 
 * 从栈中提出记录
 * @method cancle 
 * @param {Number} [step=1] 撤销的步数
 */
function cancle(step=1){
	if(!isGame){return;}
	while(step>0)
	{
		let his = game.history.pop();
		if(!his){return;}
		let dx=his[0],dy=his[1];
		//移动玩家
		game.player.move(-dx,-dy);
		//移动箱子
		if( his[2]&&game.sokoMap[game.player.x+dx*2][game.player.y+dy*2].box )
		{
			boxMove(game.player.x+dx*2,game.player.y+dy*2,-dx,-dy)
		}
		step--;
	}
}

/**
 * 移动箱子的方法,可以用于正常游戏或撤销
 * @method boxMove 
 * @param {Number} nowX 当前箱子横坐标
 * @param {Number} nowY 当前箱子纵坐标
 * @param {Number} dx 横向移动量
 * @param {Number} dy 纵向移动量
 */
function boxMove(nowX,nowY,dx,dy){
	var now = game.sokoMap[nowX][nowY];
	var box = now.box;
	var next = game.sokoMap[nowX+dx][nowY+dy];
	if(!box){return;}
	//对箱子状态的判断
	if(box.isIn)
	{
		box.setIsIn(false);
		game.score++;
	}
	if(next.isTarget)
	{
		box.setIsIn(true);
		game.score--;
	}
	console.log('推箱子');
	//推动箱子走
	box.move(dx,dy);
	next.box=box;
	now.box=null;
}



/**
 * 玩家向某个方向移动的方法 ，也是外部暴露的接口 
 * 游戏进行中才会执行
 * @method up 	玩家向上走
 * @method down 玩家向下走
 * @method left 玩家向左走
 * @method right 玩家向右走
 */
function up() {if(isGame){move(0,-1);}}
function down() {if(isGame){move(0,1);}}
function left() {if(isGame){move(-1,0);}}
function right(){if(isGame){move(1,0);}}


/**
 * 注册游戏结束后回调的方法，也是对外暴露的接口 
 * @method setOverBack 
 * @param {Function} fun 游戏结束后的回调方法
 */
game.setOverBack = function (fun=()=>{}){
	overBack = fun;
}
game.end = end;
game.init = gameInit;
game.up = up;
game.down = down;
game.left = left;
game.right = right;
game.cancle = cancle;
game.reInitGame = reInitGame;


module.exports = {game};