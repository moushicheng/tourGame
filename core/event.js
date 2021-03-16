/*
 * @Author: your name
 * @Date: 2021-03-15 19:47:11
 * @LastEditTime: 2021-03-16 08:31:27
 * @LastEditors: your name
 * @Description:
 * @FilePath: \tourGame\core\event.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { item } from "./item";
import { role } from "./role";
import { weather } from "./weather";
import { speak, getRandomObj } from "../utils/index";
let siteEvent = {
  getItem() {
    item.getRandomItem();
  },
  changeWeather() {
    role.weather = weather.getWeather();
  },
};
let npcSEvent = {};

export class event {
  //特殊事件判定
  constructor({ type, funcName }) {
    this.type = type; //site or npc
     //添加至代理器
     eventProxy.events[funcName]=this;


    if (type == "site") {
      this.execute = function () {
        let r = siteEvent[funcName];
        this.execute(r);
      };
    }
    if (type == "npc") {
      this.execute = function () {
        let r = npcSEvent[funcName];
        this.execute(r);
      };
    }
  }
  execute(r) {
    switch (this.type) {
      case "getItem": {
        let speaks = [
          "草丛里有一丝闪光,那是什么?",
          "噗嗤,萌萌摔了一跤,不过好像发现了什么",
        ];
        speak(`${getRandomObj(speaks)}\n 获得:${r.name}`);
      }
      case "changeWeather": {
        speak(`${r.speaks}\n 天气改变:${r.name}`);
      }
    }
  }
}
export let npcEventManager = {
  role: null,
  npc: null,
  set(role, npc) {
    this.role = role;
    this.npc = npc;
  },
  receive(item) {
    //收礼
    this.npc.item.push(item);

    //好感度判定
    this.checkGf(item);
  },
  checkGf(item) {
    //判定好感度
    let npc = this.npc;
    if (npc.like.includes(item)) npc.gf += getRandom(10, 20);
    else if (npc.donLike.includes(item)) npc.gf -= getRandom(10, 20);
    else npc.gf += getRandom(0, 10);
  },
  giftEvent() {

    let item = this.role.giveGift();
    if (item == null) return;
    this.receive(item);
  },
  fightEvent() {
    console.log("战斗");
  },
};


export let eventProxy={
  events:{},
  origin(){
    new event({
      type: "site",
      funcName: "getItem",
      site:[] //应该设置成一个数组 采用npc的配置方法
    })
  }
}