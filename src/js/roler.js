/**
 * roler模块 提供实体类的接口
 * 包含两类实体：Box Player
 * @module roler
 */


var global = require('./global.js');
var {canv2,ctx2} = global;
var {playerImg,boxImg,inBoxImg} = global;


/**
 * 可移动实体类
 * @class Mover
 * @constructor
 * @param {Number} x 初始化实体的横坐标
 * @param {Number} y 初始化实体的纵坐标
 * @param {Object} data 实体初始化时的额外属性(扩展用)
 */
class Mover
{
	constructor(x,y,data={})
	{
		this.x = x;
		this.y = y;
		this.data=data;
	}
	//绘制的方法 一般要重写
	draw(){}
	//清除的方法 一半要重写
  	clear(){} 
	/** 
 	 * 移动实体
 	 * @ method
 	 * @for Mover
 	 * @param {Number} [dx=0] 横坐标偏移量
 	 * @param {Number} [dy=0] 纵坐标偏移量
 	 */
	move(dx=0,dy=0){
		this.clear();
		this.x+=dx;
		this.y+=dy;
		this.draw();
	}
}
//不具备通用性的方法 ，使用原型添加吧
Mover.prototype.clear = clear;

/**
 * 玩家实体类
 * @class Player extendas Mover
 * @constructor
 */
class Player extends Mover
{
	constructor(x,y,data){
		super(x,y,data);
	}
}
Player.prototype.draw = drawPlayer;

/**
 * 玩家实体类
 * @class Box extendas Mover
 * @constructor
 */
class Box extends Mover
{
	constructor(x,y,data){
		super(x,y,data);
		this.isIn = false;
	}
	/**
 	 * 修改箱子isIn状态的方法，如果成功会触发draw方法 链式返回自身
 	 * @method
 	 * @for Box
 	 * @param {boolean} [is] 欲设置的isin状态
	 * @return {Box} this 自身对象
 	 */
	setIsIn(is)
	{
		if(is){console.log('各自如龙')}
		else{console.log('格子出笼')}
		if(this.isIn!=is)
		{
			this.clear();
			this.isIn = is;
			this.draw();
		}
		return this;
	}
}
Box.prototype.draw = drawBox;

//因为是按照比例缩放绘制的，这些方法实在不具备通用性，直接定义后通过原型在class外添加吧
/**
 * 擦除实体的方法,将被绑定至Mover.prototype  无法直接调用
 * @method clear
 * @param {Number} centerIndex 数组中间索引 (为了求绘制起点) 
 * @param {Number} blockSize 边长
 */
function clear(centerIndex,blockSize){
	centerIndex = centerIndex||this.data.centerIndex;
	blockSize = blockSize||this.data.blockSize;
	ctx2.clearRect(blockSize*(this.x-centerIndex),blockSize*this.y,blockSize,blockSize);
}
/**
 * 绘制箱子的方法,将被绑定至Box.prototype  无法直接调用 链式返回自身
 * @method drawBox
 * @param {Number} centerIndex 数组中间索引 (为了求绘制起点) 
 * @param {Number} blockSize 边长
 * @return {Object} this 返回自身对象
 */
function drawBox(centerIndex,blockSize){
	centerIndex = centerIndex||this.data.centerIndex;
	blockSize = blockSize||this.data.blockSize;
	let img = boxImg;
	if(this.data.isIn)
	{
		img = inBox;
	}
	ctx2.drawImage(img,blockSize*(this.x-centerIndex),blockSize*this.y,blockSize,blockSize);
	return this;
}
/**
 * 绘制玩家的方法,将被绑定至Player.prototype   无法直接调用 链式返回自身
 * @method drawPlayer
 * @param {Number} centerIndex 数组中间索引 (为了求绘制起点) 
 * @param {Number} blockSize 边长
 * @return {Object} this 返回自身对象
 */
function drawPlayer(centerIndex,blockSize){
	centerIndex = centerIndex||this.data.centerIndex;
	blockSize = blockSize||this.data.blockSize;
	ctx2.drawImage(playerImg,blockSize*(this.x-centerIndex),blockSize*this.y,blockSize,blockSize);
	return this;
}


module.exports={Player,Box};