/*
 * @Author: your name
 * @Date: 2021-03-15 19:47:11
 * @LastEditTime: 2021-03-16 20:24:15
 * @LastEditors: your name
 * @Description:
 * @FilePath: \tourGame\core\event.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
// import { item } from "./item";
import { weather } from "./weather";
import { getRandomObj, getRandom,log} from "../utils/index";
import { mapProxy } from "./map";
import { npcProxy } from "./npc";

let siteEvent = {
  getItem(role, site) {
    //获得物品
    // item.getRandomItem();
    return {
      name: "毛玉",
    };
  },
  changeWeather(role, site) {
    let params = this.eventInfo.params;
    if (!params) role.weather = weather.getWeather();
    else role.weather = weather.getWeather();
    return role.weather;
  },
};
let npcSEvent = {
  unique(role,npc,params){
    let fn=params.shift();
    fn.call(this,role,npc) 
  },
  invite(role, npc,params) {
    let recover = getRandom(0, role.luck);
    role.Stamina += recover;
    return {
      name: "invite",
      recover: getRandom(0, role.luck*3),
    };
  },
};




//特殊事件定义器
export class event {
  //特殊事件中一共两种:npc或者site
  constructor({ type, eventInfo, site, npc }) {
    this.type = type; //site or npc
    this.eventInfo = eventInfo;
    //添加至代理器
    eventProxy.events.push(this);

    if (site) {
      this.site = site;
      this.setSiteEvent(site); //设定事件发生地点
      this.setSiteExecute(type); //设定执行函数
    }
    if (npc) {
      this.npc = npc;
      this.setNpcEvent(npc); //设定事件执行对象
      this.setNpcExecute(); //设定执行函数
    }
  }
  executeAfter(r, params) {
    switch (this.eventInfo.name) {
      case "getItem": {
        let speaks = [
          "草丛里有一丝闪光,那是什么?",
          "噗嗤,萌萌摔了一跤,不过好像发现了什么",
        ];
        log.push(`${getRandomObj(speaks)},获得:${r.name}`);
        break;
      }
      case "changeWeather": {
        log.push(`${r.speaks}\n天气改变:【${r.name}】`);
        break;
      }
      case "invite": {
        log.push(`正在${params[0].name}家中做客,恢复${r.recover}体力`);
      }
    }
  }
  setNpcExecute() {
    //执行时执行对象是npc
    let params=this.eventInfo.params;
    params = params instanceof Array?params:[params];
    this.execute = function (role, npc) {
      let r = npcSEvent[this.eventInfo.name].call(this, role, npc, params);
      this.executeAfter(r, [npc]);
    };
  }

  setNpcEvent(npc) {
    let allNpc = npcProxy.npcs;
    if (npc == "all") {
      for (const _npc of Object.values(allNpc)) {
        _npc.set("events", this);
      }
    } else {
      for (const name of npc) {
        allNpc[name].set("events", this);
      }
    }
  }
  setSiteExecute() {
    let params=this.eventInfo.params;
    params = params instanceof Array?params:[params]; //取数组
    this.execute = function (role, site) {
      //由事件对象调用，但传参是从Site对象传来
      let r = siteEvent[this.eventInfo.name].call(this, role, site, params);
      this.executeAfter(r);
    };
  }
  setSiteEvent(site) {
    //设定事件发生地点
    let allSites = mapProxy.siteStore;
    if (site == "all") {
      for (const site of Object.values(allSites)) {
        site.set("events", this);
      }
    } else {
      for (const name of site) {
        allSites[name].set("events", this);
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

export let eventProxy = {
  events: [],
  origin() {
    //设置地形事件
    new event({
      type: "site",
      eventInfo: {
        name: "getItem",
      },
      site: "all", //可能的所在地
    });
    new event({
      type: "site",
      eventInfo: { name: "changeWeather", params: ["浓雾"] },
      site: ["红魔馆"],
    });
    new event({
      type: "site",
      eventInfo: { name: "changeWeather", params: ["疏雨"] },
      site: ["魔法之森"],
    });
    new event({
      type: "site",
      eventInfo: { name: "changeWeather", params: ["烈日"] },
      site: ["无缘塚"],
    });
    new event({
      type: "site",
      eventInfo: { name: "changeWeather", params: ["快晴"] },
      site: ["人类村落"],
    });
    
    //设置npc事件
    new event({
      type: "npc",
      eventInfo: {
        name: "invite",
        params:'111'
      },
      npc: ["河城荷取","琪露诺"],
    });
    new event({
      type: "npc",
      eventInfo: {
        name: "unique",
        params:function(npc,role){
          if(role.name=="橙萌萌"){
            log.push('河城荷取:河童出品,必属精品,不过你似乎不是人类吧,这是什么构造www')
            log.push('橙萌萌:你不要过来啊!')
          }
    
        }
      },
      npc: ["河城荷取"],
    });
  },
};
