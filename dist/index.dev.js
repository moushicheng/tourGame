"use strict";

var _map = require("./core/map");

var _role = require("./core/role");

var _weather = require("./core/weather");

/*
 * @Author: your name
 * @Date: 2021-03-12 13:08:02
 * @LastEditTime: 2021-03-14 11:57:07
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \mirai\code\mod\tourGame\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
var path = _map.map.getPath();

var curWeather = _weather.weather.getWeather();

var cmm = new _role.role();
cmm.setRoad(path);
cmm.setWeather(curWeather);
cmm.countTime(); //计算Tway和Tstay
// cmm.run(); //开始运行/