/*
 * @Author: your name
 * @Date: 2021-03-12 13:08:02
 * @LastEditTime: 2021-03-16 18:04:43
 * @LastEditors: your name
 * @Description:
 * @FilePath: \tourGame\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

import { role } from "./core/role";
import { weather } from "./core/weather";

import { eventProxy } from "./core/event.js";
import { npcProxy } from "./core/npc";
import { mapProxy } from "./core/map";

npcProxy.origin();   //初始化Npc
eventProxy.origin(); //初始化事件


let path = mapProxy.getPath();
let curWeather = weather.getWeather();

let cmm = new role();

cmm.setRoad(path);
cmm.setWeather(curWeather);
cmm.countTime(); //计算路径时间和地点停留时间

cmm.run(); //开始运行/