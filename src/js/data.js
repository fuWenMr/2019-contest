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

//也可以关卡数据静态化 保存在html中 这样修改起来很方便 虽然不正规2333

var data = require('../json/data.json');
console.log('data',data);
window.maxIndex = data.legnth-1;
/**
 * 获得指定关卡数据对象的方法，关卡不存在返回undefined
 * @method drawPlayer
 * @param {Number} [number=0] 关卡数 (从零开始计算) 
 * @return {Object} 第number关的数据
 */
function getData(number)
{
	//没有参数返回整个数组
	if(number===undefined)
	{
		return copy(data);
	}
	//如果data为空就返回空吧
	//越界返回最后一个
	return  copy(data[number]?data[number]:data[data.length-1]);
}
/**
 * 返回数据前深copy一次 ，防止外部模块修改 
 */
function copy(jsonData)
{
	return JSON.parse(JSON.stringify(jsonData));
}
 /**
  * 以下是已废弃的基于html的数据存取
  */
// function getData(number=0)
// {
// 	return JSON.parse( (window.document.getElementById('json'+number)||{innerHTML:'null'}).innerHTML.trim());
// 	// return JSON.stringify(json[number]);
// }
// window.maxIndex = dataElement.querySelectorAll('span').length-1;
// if(window.maxIndex>25){window.maxIndex=25;}


// // 如果浏览器支持缓存 ，存入缓存，删除html，修改get方法
// if (window.localStorage)
// {
// 	var datas = dataElement.querySelectorAll('span');
// 	for(let elem of datas)
// 	{
// 		window.localStorage.setItem(elem.getAttribute('id'),elem.innerHTML.trim());
// 	}
// 	//修改get方法为从缓存中读取
// 	getData = function(number=0)
// 	{
// 		return JSON.parse(window.localStorage.getItem('json'+number));
// 	}
// 	dataElement.parentElement.removeChild(dataElement);
// }



//只暴露获得数据的接口
module.exports={getData};
