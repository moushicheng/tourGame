"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weather = void 0;

var _index = require("../../../utils/index.js");

/*
 * @Author: your name
 * @Date: 2021-03-13 16:43:49
 * @LastEditTime: 2021-03-14 09:45:34
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \mirai\code\mod\tourGame\core\weather.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
var wType = {
  '快晴': 0.9,
  '浓雾': 1.1,
  '雪': 1.2,
  '天气雨': 1.1,
  '疏雨': 1.0,
  '烈日': 1.1,
  '台风': 1.3,
  '晴岚': 1.0
};
var wBattleEffect = {
  '快晴': function _() {},
  '浓雾': function _() {},
  '雪': function _() {},
  '天气雨': function _() {},
  '疏雨': function _() {},
  '烈日': function _() {},
  '台风': function _() {},
  '晴岚': function _() {}
};
var weather = {
  getWeather: function getWeather() {
    var r = Object.entries(wType)[(0, _index.getRandom)(0, 7)];
    r.push(wBattleEffect[r[0]]);
    return r; //天气 天气效果·道路 天气效果·战斗
  }
};
exports.weather = weather;