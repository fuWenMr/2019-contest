/**
 * global模块 提供与游戏内容相关的全局数据接口(图片 canvas)
 * @module global
 */


var imagePath = './image/';
//图片url  使用数组存储,可以增加皮肤
var wallImgUrls = [imagePath+'wall1.png'];
var floorImgUrls = [imagePath+'floor1.png'];
var targetImgUrls = [imagePath+'target1.png'];
var boxImgUrls = [imagePath+'box1.png'];
var inBoxImgUrls = [imagePath+'inBox1.png'];
var playerImgUrls = [imagePath+'player1.png'];
//自动加载默认图片
var wallImg = new Image();	wallImg.src=wallImgUrls[0];
var floorImg = new Image();	floorImg.src=floorImgUrls[0];
var boxImg = new Image();	boxImg.src=boxImgUrls[0];
var inBoxImg = new Image();	inBoxImg.src=inBoxImgUrls[0];
var targetImg = new Image();targetImg.src=targetImgUrls[0];
var playerImg = new Image();playerImg.src=playerImgUrls[0];

var canv1 = window.document.getElementById('canvas1');
var canv2 = window.document.getElementById('canvas2');


	
var	global = {
	//canvs对象
	canv1,
	canv2,
	ctx1: canv1.getContext('2d'),
	ctx2: canv2.getContext('2d'),
	//图片资源
	wallImg,
	floorImg,
	targetImg,
	boxImg,
	inBoxImg,
	playerImg,
	//获取指定图片
	//如有重复，会自动使用缓存 不用手动单例
	getWall(index){var img = new Image();img.src=wallImgUrls[index];return img;},
	getFloor(index){var img = new Image();img.src=floorImgUrls[index];return img;},
	getBox(index){var img = new Image();img.src=targetImgUrls[index];return img;},
	getInBox(index){var img = new Image();img.src=boxImgUrls[index];return img;},
	getBox(index){var img = new Image();img.src=inBoxImgUrls[index];return img;},
	getPlayer(index){var img = new Image();img.src=playerImgUrls[index];return img;},
};

var w = canv1.getAttribute('width');
//将canvs的原点移动到中间
global.ctx1.translate(w/2,0);
global.ctx2.translate(w/2,0);
module.exports=global;


