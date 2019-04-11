/**
 * data 提供加载关卡数据的接口
 * @module data
 */

// //关卡数据样例
// var json = [{
// 	//地图尺寸
// 	size:[6,4],
// 	//外部围墙
// 	outterWalls:[ [0,1],[0,3],[5,3],[5,0],[1,0],[1,1] ],
// 	//内部墙
// 	innerWalls:[],
// 	//箱子坐标
// 	boxs:[ [2,2] ],
// 	//目标坐标
// 	targets:[ [1,2] ],
// 	//玩家初始坐标
// 	palyer:[1,2],}];

//因为放在js里不太好扩展，没有服务器的话加载json也不热太方便  直接放html里把
//关卡数据静态化 保存在html或者浏览器缓存而不是内存中（会稍稍降低速度，但是更有利于扩展）
var dataElement = window.document.getElementById('dataJSON');

/**
 * 获得指定关卡数据对象的方法，关卡不存在返回undefined
 * @method drawPlayer
 * @param {Number} [number=0] 关卡数 (从零开始计算) 
 * @return {Object} 第number关的数据
 */
function getData(number=0)
{
	return JSON.parse( (window.document.getElementById('json'+number)||{innerHTML:'null'}).innerHTML.trim());
	// return JSON.stringify(json[number]);
}
window.maxIndex = dataElement.querySelectorAll('span').length-1;
if(window.maxIndex>25){window.maxIndex=25;}


// 如果浏览器支持缓存 ，存入缓存，删除html，修改get方法
if (window.localStorage)
{
	var datas = dataElement.querySelectorAll('span');
	for(let elem of datas)
	{
		window.localStorage.setItem(elem.getAttribute('id'),elem.innerHTML.trim());
	}
	//修改get方法为从缓存中读取
	getData = function(number=0)
	{
		return JSON.parse(window.localStorage.getItem('json'+number));
	}
	dataElement.parentElement.removeChild(dataElement);
}



//只暴露获得数据的接口
module.exports={getData};
