!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n=["./image/wall1.png"],o=["./image/floor1.png"],i=["./image/target1.png"],r=["./image/box1.png"],a=["./image/inBox1.png"],l=["./image/player1.png"],s=new Image;s.src=n[0];var c=new Image;c.src=o[0];var d=new Image;d.src=r[0];var u=new Image;u.src=a[0];var g=new Image;g.src=i[0];var f=new Image;f.src=l[0];var m=window.document.getElementById("canvas1"),y=window.document.getElementById("canvas2"),w={canv1:m,canv2:y,ctx1:m.getContext("2d"),ctx2:y.getContext("2d"),wallImg:s,floorImg:c,targetImg:g,boxImg:d,inBoxImg:u,playerImg:f,getWall(e){var t=new Image;return t.src=n[e],t},getFloor(e){var t=new Image;return t.src=o[e],t},getBox(e){var t=new Image;return t.src=i[e],t},getInBox(e){var t=new Image;return t.src=r[e],t},getBox(e){var t=new Image;return t.src=a[e],t},getPlayer(e){var t=new Image;return t.src=l[e],t}},p=m.getAttribute("width");w.ctx1.translate(p/2,0),w.ctx2.translate(p/2,0),e.exports=w},function(e,t,n){n(2);var{ui:o}=n(3),{game:i}=n(4);o.setMove("up",i.up),o.setMove("right",i.right),o.setMove("down",i.down),o.setMove("left",i.left),o.setToGameBegin(i.init),o.setToMenu(i.end),i.setOverBack(()=>{setTimeout(o.result,300)}),o.cancleBtn.onclick=i.cancle.bind(null,void 0),o.replayBtn.onclick=i.reInitGame.bind(null,void 0)},function(e,t,n){n(8),n(13);var o,i,r,a,l,s,c,d=(o=navigator.userAgent,i=/(?:Windows Phone)/.test(o),r=/(?:SymbianOS)/.test(o)||i,a=/(?:Android)/.test(o),l=/(?:Firefox)/.test(o),/(?:Chrome|CriOS)/.test(o),s=/(?:iPad|PlayBook)/.test(o)||a&&!/(?:Mobile)/.test(o)||l&&/(?:Tablet)/.test(o),c=/(?:iPhone)/.test(o)&&!s,{isTablet:s,isPhone:c,isAndroid:a,isPc:!c&&!a&&!r});window.os=d,d.isTablet&&window.document.getElementById("keyboard").style.setProperty("visibility","visible"),function(e){var t=document.getElementById("contentL");t.innerHTML="",e>25&&(e=25);let n=new DocumentFragment;for(let t=1;t<=e;t++){var o=document.createElement("div");o.setAttribute("class","level"),o.dataset.index=t-1,o.innerHTML=t,n.appendChild(o)}t.appendChild(n)}(window.document.getElementById("dataJSON").querySelectorAll("span").length)},function(e,t,n){var{canv1:o,canv2:i}=n(0),r=window.document.getElementById("cancleBtn"),a=window.document.getElementById("menuBtn"),l=window.document.getElementById("replayBtn"),s=window.document.getElementById("res"),c=window.document.getElementById("hardBtn"),d=window.document.getElementById("contentL");window.document.body.addEventListener("keyup",function(e){switch(e.keyCode){case 38:f("up");break;case 39:f("right");break;case 40:f("down");break;case 37:f("left")}e.stopPropagation()}),window.document.getElementById("upBtn").onclick=function(){f("up")},window.document.getElementById("leftBtn").onclick=function(){f("left")},window.document.getElementById("rightBtn").onclick=function(){f("right")},window.document.getElementById("downBtn").onclick=function(){f("down")},a.onclick=function(){m.toMenu(),d.style.setProperty("visibility","visible"),o.style.setProperty("visibility","hidden"),i.style.setProperty("visibility","hidden"),res.style.setProperty("visibility","hidden")},s.querySelector(".mybutton.to_menu").onclick=function(){res.style.setProperty("visibility","hidden"),a.click()};{let e=["全部难度","简单","中等","困难"];c.onclick=function(){var t=d.querySelectorAll(".level"),n=t.length;console.log(t,n);var o=~~c.dataset.level;o=e[o+1]?o+1:0,c.innerHTML=e[o],c.dataset.level=o;var i=[0,Math.max(n/3,1),Math.max(2*n/3,2),n];0==o&&(o=1,i[1]=n),console.log("level",o,i);for(let e=0;e<n;e++)e>=i[o-1]&&e<i[o]?t[e].classList.remove("hidden"):t[e].classList.add("hidden")}}function u(e){d.style.setProperty("visibility","hidden"),res.style.setProperty("visibility","hidden"),m.toGameBegin(e),o.style.setProperty("visibility","visible"),i.style.setProperty("visibility","visible")}window.document.getElementById("contentL").addEventListener("click",function(e){e.target.classList.contains("level")&&u(e.target.dataset.index)});var g=!0;function f(e){g&&(g=!1,setTimeout(g=!0,150),e=e.toLowerCase(),y[e]&&y[e]())}var m={toMenu:()=>{},toGameBegin:()=>{}},y={up:()=>{},down:()=>{},right:()=>{},left:()=>{}},w={setMove(e,t){e=e.toLowerCase(),y[e]&&(y[e]=t)},setToMenu(e){m.toMenu=e},setToGameBegin(e){m.toGameBegin=e},result:function(e){res.style.setProperty("visibility","visible"),document.getElementById("resword").innerHTML="游戏成功!";var t=res.querySelector(".mybutton.next");if(console.log(t),window.maxIndex&&window.index&&(console.log(111),window.maxIndex<=window.index))return console.log(222),t.innerHTML="通关!",void(t.onclick=function(){a.click()});console.log(33),t.innerHTML="下一关!",console.log(new Number(window.index)+1),t.onclick=function(){u(new Number(window.index)+1)}},cancleBtn:r,replayBtn:l};e.exports={ui:w}},function(e,t,n){var{getData:o}=n(5),{SokoMap:i}=n(6),{Box:r,Player:a}=n(7);const l=n(0).canv1.width,s=80;var c=!1,d={sokoMap:[],box:[],player:{},score:0,isWin:!1,history:[]};var u=-1;function g(e=0){if(console.log("run is"+e),data=o(e),console.log("run is",data),!data)return;u=e,window.index=e,function(e){d.sokoMap=[],d.box=[],d.player={},d.score=e.targets.length,d.isWin=!1,d.history=[]}(data);var t=Math.max(data.size[0],data.size[1]),n=Math.min(parseInt(l/t),s),g=data.size[0]/2;d.sokoMap=new i(data,n).draw();let f={blockSize:n,centerIndex:g};for(let e of data.boxs){let t=d.sokoMap[e[0]][e[1]],n=new r(e[0],e[1],f).draw();t.isTarget&&(n.setIsIn(t.isTarget),d.score--),d.box.push(n),t.box=n}d.player=new a(data.palyer[0],data.palyer[1],f).draw(),c=!0}function f(){}function m(e,t){var n,o,i=d.player.x+e,r=d.player.y+t;console.log(i,r),console.log(d.sokoMap[i][r]);try{o=(n=d.sokoMap[i][r]).isWall}catch(e){return void console.log("越界")}var a=!1;if(o)console.log("石墙");else{if(n.box){if(!d.sokoMap[i+e][r+t])return void console.log("二级越界");if(console.log(d.sokoMap[i+e][r+t].box,d.sokoMap[i+e][r+t].isWall,d.sokoMap[i+e][r+t].box||d.sokoMap[i+e][r+t].isWall),d.sokoMap[i+e][r+t].box||d.sokoMap[i+e][r+t].isWall)return void console.log("二级箱子");a=!0,y(i,r,e,t)}console.log("走起"),d.history.push([e,t,a]),d.player.move(e,t),d.score<=0&&(d.isWin=!0,c=!1,f())}}function y(e,t,n,o){var i=d.sokoMap[e][t],r=i.box,a=d.sokoMap[e+n][t+o];r&&(r.isIn&&(r.setIsIn(!1),d.score++),a.isTarget&&(r.setIsIn(!0),d.score--),console.log("推箱子"),r.move(n,o),a.box=r,i.box=null)}d.setOverBack=function(e=(()=>{})){f=e},d.end=function(){c=!1},d.init=g,d.up=function(){c&&m(0,-1)},d.down=function(){c&&m(0,1)},d.left=function(){c&&m(-1,0)},d.right=function(){c&&m(1,0)},d.cancle=function(e=1){if(c)for(;e>0;){let t=d.history.pop();if(!t)return;let n=t[0],o=t[1];d.player.move(-n,-o),t[2]&&d.sokoMap[d.player.x+2*n][d.player.y+2*o].box&&y(d.player.x+2*n,d.player.y+2*o,-n,-o),e--}},d.reInitGame=function(){c&&g(u)},e.exports={game:d}},function(e,t){var n=window.document.getElementById("dataJSON");function o(e=0){return JSON.parse((window.document.getElementById("json"+e)||{innerHTML:"null"}).innerHTML.trim())}if(window.maxIndex=n.querySelectorAll("span").length-1,window.maxIndex>25&&(window.maxIndex=25),window.localStorage){var i=n.querySelectorAll("span");for(let e of i)window.localStorage.setItem(e.getAttribute("id"),e.innerHTML.trim());o=function(e=0){return JSON.parse(window.localStorage.getItem("json"+e))},n.parentElement.removeChild(n)}e.exports={getData:o}},function(e,t,n){var o=n(0),{canv1:i,ctx1:r,ctx2:a}=o,{wallImg:l,floorImg:s,targetImg:c}=o;function d(e,t,n){e=e.slice(0),t=t.slice(0),n=n||function(){};var o=[];if(e[0]===t[0]){let i=t[1]-e[1];if(0===i)return n(e[0],e[1]),[e];let r=Math.abs(i)/i,a=e[0],l=t[1]+r;for(;e[1]!=l;e[1]+=r){let t=e[1];o.push([a,t]),n(a,t)}}else{if(e[1]!==t[1])return null;{let i=t[0]-e[0];if(0===i)return n(e[0],e[1]),[e];let r=Math.abs(i)/i,a=t[1],l=t[0]+r;for(;e[0]!=l;e[0]+=r){let t=e[0];o.push([t,a]),n(t,a)}}}return o}function u(e,t,n){r.drawImage(l,e,t,n,n)}function g(e,t,n){r.drawImage(s,e,t,n,n)}function f(e,t,n){r.drawImage(c,e,t,n,n)}e.exports={SokoMap:function(e,t){var{size:n,outterWalls:o,innerWalls:i,targets:l}=e,s=new Array(n[0]);for(let e=0;e<s.length;e++){s[e]=new Array(n[1]);for(let t=0;t<n[1];t++)s[e][t]={isWall:!1,box:null,isTarget:!1}}return console.log(e),console.log(s),Object.defineProperty(s,"draw",{value:function(){r.clearRect(-600,0,2e3,2e3),a.clearRect(-600,0,2e3,2e3);var e=n[0]/2;return function(e,t,n,o){for(let e=0;e<t.length;e++){let n=t[e],o=t[e+1]?t[e+1]:t[0];d(n,o,i)}function i(t,i){u(o*(t-n),o*i,o),e[t][i].isWall=!0}}(s,o,e,t),function(e,t,n){for(let o in e){let i=!1,r=!1;for(let a in e[o])if(e[o][a].isWall)r=i?r:!r,i=!0;else if(r){if(0==o||o==e.length-1)continue;i=!1,g(n*(o-t),n*a,n)}}}(s,e,t),function(e,t,n,o){for(let e of t){let n=e[0],o=e[1]?e[1]:e[0];console.log(e,n,o,t),d(n,o,i)}function i(t,i){r.clearRect(o*(t-n),o*i,o,o),u(o*(t-n),o*i,o),e[t][i].isWall=!0}}(s,i,e,t),function(e,t,n,o){for(let i of t)e[i[0]][i[1]].isTarget=!0,f(o*(i[0]-n),o*i[1],o)}(s,l,e,t),this}}),s}}},function(e,t,n){var o=n(0),{canv2:i,ctx2:r}=o,{playerImg:a,boxImg:l,inBoxImg:s}=o;class c{constructor(e,t,n={}){this.x=e,this.y=t,this.data=n}draw(){}clear(){}move(e=0,t=0){this.clear(),this.x+=e,this.y+=t,this.draw()}}c.prototype.clear=function(e,t){e=e||this.data.centerIndex,t=t||this.data.blockSize,r.clearRect(t*(this.x-e),t*this.y,t,t)};class d extends c{constructor(e,t,n){super(e,t,n)}}d.prototype.draw=function(e,t){return e=e||this.data.centerIndex,t=t||this.data.blockSize,r.drawImage(a,t*(this.x-e),t*this.y,t,t),this};class u extends c{constructor(e,t,n){super(e,t,n),this.isIn=!1}setIsIn(e){return e?console.log("各自如龙"):console.log("格子出笼"),this.isIn!=e&&(this.clear(),this.isIn=e,this.draw()),this}}u.prototype.draw=function(e,t){e=e||this.data.centerIndex,t=t||this.data.blockSize;let n=l;this.data.isIn&&(n=inBox);return r.drawImage(n,t*(this.x-e),t*this.y,t,t),this},e.exports={Player:d,Box:u}},function(e,t){},,,,,function(e,t){}]);