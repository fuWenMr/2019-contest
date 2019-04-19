
#### 已开启github page

输入 https://fuwenmr.github.io/2019-contest/dist/index.html 即可访问游戏界面

[或者点击这里](https://fuwenmr.github.io/2019-contest/dist/index.html)

## 实现描述

用 JavaScript+canvas 实现的一个Q萌风推箱子游戏

把甜甜圈放进盘子里

![](https://raw.githubusercontent.com/fuWenMr/2019-contest/master/show/pc1.jpg)
![](https://github.com/fuWenMr/2019-contest/blob/master/show/pc2.jpg)
![](https://github.com/fuWenMr/2019-contest/blob/master/show/phone1.jpg)



## 作品说明

### 开发说明

作品基于 CommonJS规范+webpack开发 使用ES6语法 测试通过环境为 360和chrome浏览器

pc端使用键盘鼠标操作移动,窄屏和平板端会出现方向按钮，屏幕过矮会使用水平按钮

代码运行所依赖的图片素材均存放在 src/image文件夹下，素材来源于网络，非原创

关卡基于提供的种子数据生成，非随机，设置上限为25关

关卡数据以json格式存放在文件中,构建时会打包进js中

关卡顺序为手动分配  不保证难度分布合理


### 运行说明

src文件夹下为开发源代码   dist文件夹下存放生产环境中的最终代码 可直接运行
或者 
- run npm i&&run webpack-dev-server --open
- run npm i&&run webpack
### 操作说明

进入选关页面后，使用方向键控制人物移动，所有甜甜圈进入盘子后自动结束当前关卡。出现提示，点击下一关自动进入下一关。

最后一关结束后，不再显示下一关，点击通关返回选关界面

游戏进行过程中，点击选关按钮结束当前游戏，进入选关界面

游戏进行过程中，点击重开或撤销，会重启游戏或返回上一步操作，撤销最多可返回至游戏初始状态

点击全部难度按钮，会更换选关页面显示的关卡(难度分三级别)，不会影响当前游戏

### 关卡json格式说明

- "size": 地图尺寸，数组格式 表示 x,y坐标 （size实际上可以由outterWalls遍历得到，这里输入是为了简化代码，并且有size作参考可以迅速判断后面的数据是否合理）
- "outterWalls": 最外围墙壁数组，数组内包含 n个坐标 ，相邻坐标x轴或者y轴坐标相同，依次连接这些坐标生成外部墙壁，自动连接收尾坐标（x&y相等时）
- "innerWalls":	内部墙壁，数组内包含n个数组，每个内部数组用用两个坐标表示一面不拐弯的内部墙壁（或者一个坐标表示单个墙），
- "targets":	目标的位置，数组内包含n个坐标 .
- "boxs":		箱子的初始位置，数组内包含n个坐标 .
- "player":		玩家的初始位置,包含一个坐标





