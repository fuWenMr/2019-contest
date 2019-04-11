/**
 * sokoMap 提供构造地图对象的接口
 * 核心是一个构造方法 sMap
 * @module sokoMap
 */

var global = require('./global.js');
var {canv1,ctx1,ctx2} = global;
var {wallImg,floorImg,targetImg} = global;




/**
 * 生成场景数据的方法，返回一个表示场景的二维数组，并且带一个draw方法用来绘制场景
 * 可以用构造或者非构造的方法调用，本模块的和新方法
 * @method SokoMap
 * @param {Object} data 关卡数据
 * @param {Number} blockSize 绘制区域的边长
 * @return {Array<Array<Number>>}   表示场景的二维数组，携带draw方法 
 */
function SokoMap(data,blockSize)
{
	var {size,outterWalls,innerWalls,targets} = data;
	//首先构造出数组
	var sMap = new Array(size[0]);
	for(let x =0;x<sMap.length;x++)
	{
		sMap[x] = new Array(size[1]);
		for(let y=0;y<size[1];y++)
		{
			//每个方块标记为一个对象:墙壁,箱子,目标
			sMap[x][y]={ isWall:false,box:null,isTarget:false };
		}
	}
	console.log(data);
	console.log(sMap);
	function draw()
	{
		//清空屏幕
		ctx1.clearRect(-600,0,2000,2000);
		ctx2.clearRect(-600,0,2000,2000);
		//中点
		var centerIndex = size[0]/2;
		//构造出外部墙壁
		bulidOutterWalls(sMap,outterWalls,centerIndex,blockSize);
		//构造出地板(线段扫描)
		bulidFloors(sMap,centerIndex,blockSize);
		//构造出内部墙壁
		bulidInnerWalls(sMap,innerWalls,centerIndex,blockSize);
		//构造出目标
		bulidtargets(sMap,targets,centerIndex,blockSize);
		return this;
	}
	//添加为不可枚举属性
	Object.defineProperty(sMap,'draw',{
		value:draw,
	});
	return sMap;
}


/**
 * 绘制外部部墙壁的方法
 * @method bulidOutterWalls
 * @param {Array<Array<Number>>} sMap 场景地图数组
 * @param {Array<Number>} innerWalls 目标坐标数组
 * @param {Number} centerIndex 原点坐标对应的索引
 * @param {Number} blockSize  绘制区域的边长 
 */
function bulidOutterWalls(sMap,outterWalls,centerIndex,blockSize)
{
	for(let i=0;i<outterWalls.length;i++)
	{
		let wall1 = outterWalls[i];
		let wall2 = outterWalls[i+1]?outterWalls[i+1]:outterWalls[0];
		getAllIndex(wall1,wall2,wallHandler);
	}
	//对确认是墙壁的坐标进行绘制和填充
	function wallHandler(x,y)
	{
		//ui绘制
		drawWall(blockSize*(x-centerIndex),blockSize*y,blockSize);
		//数据更新
		sMap[x][y].isWall = true;
	}
}
/**
 * 绘制内部墙壁的方法
 * @method bulidInnerWalls
 * @param {Array<Array<Number>>} sMap 场景地图数组
 * @param {Array<Number>} innerWalls 目标坐标数组
 * @param {Number} centerIndex 原点坐标对应的索引
 * @param {Number} blockSize  绘制区域的边长 
 */
function bulidInnerWalls(sMap,innerWalls,centerIndex,blockSize)
{
	for(let walls of innerWalls)
	{
		let wall1 = walls[0];
		let wall2 = walls[1]?walls[1]:walls[0];
		console.log(walls,wall1,wall2,innerWalls);
		getAllIndex(wall1,wall2,wallHandler);
	}
	function wallHandler(x,y)
	{
	//ui绘制  对象更新
	ctx1.clearRect(blockSize*(x-centerIndex),blockSize*y,blockSize,blockSize);
	drawWall(blockSize*(x-centerIndex),blockSize*y,blockSize);
	sMap[x][y].isWall = true;
	}
}
/**
 * 绘制目标的方法
 * @method bulidtargets
 * @param {Array<Array<Number>>} sMap 场景地图数组
 * @param {Array<Number>} targets 目标坐标数组
 * @param {Number} centerIndex 原点坐标对应的索引
 * @param {Number} blockSize  绘制区域的边长 
 */
function bulidtargets(sMap,targets,centerIndex,blockSize)
{
	for(let index of targets)
	{
		sMap[index[0]][index[1]].isTarget = true;
		drawTraget(blockSize*(index[0]-centerIndex),blockSize*index[1],blockSize);
	}
}


/**
 * 绘制地板的方法
 * @method bulidFloors
 * @param {Array<Array<Number>>} sMap 场景地图数组
 * @param {Number} centerIndex 原点坐标对应的索引
 * @param {Number} blockSize  绘制区域的边长 
 */
function bulidFloors(sMap,centerIndex,blockSize)
{
	/**
 	 * 使用线段扫描确定地板的位置 图形学竟然真有用
 	 */
	 //两边不绘制地板
	for (let x in sMap)
	{
		//标志上一个否遇到墙
		let hasWall = false;
		//标志当前方格是否为内部单元
		let isInner = false;
		for (let y in sMap[x])
		{
			if(sMap[x][y].isWall)
			{
				isInner = hasWall?isInner:!isInner;
				hasWall = true;
				continue;
			}
			//为内部单元绘制地板
			if(isInner)
			{
				//边缘不绘制
				if(x==0||x==sMap.length-1){continue;}
				hasWall=false;
				drawFloor(blockSize*(x-centerIndex),blockSize*y,blockSize);
			}
		}
	}
}



/**
 * 求出两个同行或同列坐标之间所有的坐标  不同行也不同列返回空数组
 * @method drawPlayer
 * @param {Array<Number>} index1 第一个坐标
 * @param {Array<Number>} index2 第二个坐标
 * @param {Function(x,y)} handler  返回前对找到的坐标进行的额外操作 
 * @return {Array} 坐标数组
 */
function getAllIndex(index1,index2,handler)
{
	//因为数组是对象，不能直接操作 先拷贝
	index1=index1.slice(0);
	index2=index2.slice(0);
	handler = handler||function(){};
	var res = [];
	if (index1[0]===index2[0])
	{
		//y轴变换
		let dy = index2[1]-index1[1];
		//重合的话只有一个点
		if(dy===0){handler(index1[0],index1[1]);return [index1];}
		//转化为1或者-1
		let di = Math.abs(dy)/dy;
		let x = index1[0];
		let endy = index2[1]+di;
		for(;index1[1]!=endy;index1[1]+=di)
		{
			let y = index1[1];
			res.push([x,y]);	
			handler(x,y);
		}	
	}
	else if(index1[1]===index2[1])
	{
		//X轴变换
		let dx = index2[0]-index1[0];
		if(dx===0){handler(index1[0],index1[1]);return [index1];}
		let di = Math.abs(dx)/dx;
		let y = index2[1];
		let endx = index2[0]+di;
		for(;index1[0]!=endx;index1[0]+=di)
		{
			let x = index1[0];
			res.push([x,y]);	
			handler(x,y);
		}
	}
	else { return null; }
	return res;
}


/**
 * 不同场景元素的绘制方法
 * @method drawWall
 * @method drawFloor
 * @method drawTraget
 * @param {*} x 绘制位置的横坐标
 * @param {*} y 绘制位置的纵罪标
 * @param {*} blockSize  绘制区域的边长
 */
function drawWall(x,y,blockSize)
{ 
	ctx1.drawImage(wallImg,x,y,blockSize,blockSize);
}
function drawFloor(x,y,blockSize)
{
	ctx1.drawImage(floorImg,x,y,blockSize,blockSize);
}
function drawTraget(x,y,blockSize)
{
	ctx1.drawImage(targetImg,x,y,blockSize,blockSize);
}
module.exports={SokoMap};