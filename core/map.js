/*
 * @Author: your name
 * @Date: 2021-03-12 13:08:57
 * @LastEditTime: 2021-03-16 18:19:12
 * @LastEditors: your name
 * @Description:
 * @FilePath: \tourGame\core\map.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { getRandom, getRandomObj, compPoint } from "../utils/index.js";

class siteNode {
  constructor(siteName, recommend) {
    this.siteName = siteName; //地点名字
    this.paths = []; //连接的路径
    this.npcs = []; //npc上会有对应的事件
    this.events = []; //特殊事件
    this.time = null;
    this.detect = false;
    this.recommend = recommend;
    this.eventOccur = getRandom(7, 12);
  }
  init(time) {
    this.time = time;
  }
  set(name,values= []) {
    if (!(name instanceof Array)) {
      this[name] = [...this[name], values];
      return;
    }
    this[name] = [...this[name], ...values];
  }
  findRoad(endSite, roadStores, result) {
    if (this == endSite) {
      result.push([...roadStores.roads]);
      return;
    }
    if (this.detect == true) return;

    this.detect = true;

    for (let pNode of this.paths) {
      roadStores.roads.push(pNode);
      this.findRoad.call(pNode.endSite, endSite, roadStores, result);
      roadStores.roads.pop();
    }
    this.detect = false;
  }
  findItem() {}
  executeEvent(role) {
    //执行地图事件
    // console.log("执行:" + this.siteName + "事件");
    if (true) {
      //执行地点事件
      let event = getRandomObj(this.events);
      if (event) event.execute(role,this);
    }
    //执行npc事件
    if (true) {
      //执行npc事件
      let npc = getRandomObj(this.npcs); //获得一个npc
      if (npc) npc.triggerEvent(role);
    }
  }
}

let typeEffect = {
  森林: 0.5,
  平原: 0,
  山川: 1,
  河道: 0.5,
};

class pathNode {
  constructor(type, len, endSite) {
    this.type = type; //道路类型
    this.typeEffect = typeEffect[type];
    this.len = len; //道路长度
    this.endSite = endSite;
    this.time = null;
  }
}

let hakureiJinja = new siteNode("博丽神社");
let geyser = new siteNode(
  "间歇泉",
  "妖怪之山山麓的温泉地带（通称·地狱谷间歇泉中心）。这里因为有怨灵的涌出，人类靠近会非常危险。怨灵是会伤害到人类和妖怪的幽灵，至于涌出的理由，应该是和地狱连接在一起的缘故吧。正是因为怨灵的关系，人类和妖怪不怎么靠近这里。她这样的神灵是几乎不会受到怨灵影响的，所以才会担任这里的管理一职。虽说只是从地底泄漏出来的而已，但是至今仍有怨灵在四处飘荡。如果她是故意将这些怨灵放任不管的话，必须要多加小心了。"
);
let lDBarrier = new siteNode("幽冥结界");
let whiteTower = new siteNode("白玉楼");
let humanVillage = new siteNode("人类村落");
let yakumoHouse = new siteNode("八云紫之屋");
let sky = new siteNode("有顶天");
let scrapPavilion = new siteNode("废弃洋馆");
let devilMansion = new siteNode("红魔馆");
let chatArea = new siteNode("雾之湖");
let ponor = new siteNode("水洞");
let magicForest = new siteNode("魔法之森");
let kourindou = new siteNode("香霖堂");
let lostForest = new siteNode("迷途之森");
let eternityHouse = new siteNode("永远亭");
let marisaHouse = new siteNode("雾雨魔法店");
let genbuRavine = new siteNode("玄武涧");
let unHouse = new siteNode("无名之丘");
let AliceHouse = new siteNode("爱丽丝之邸");
let flower = new siteNode("太阳花田");
let wood = new siteNode("没有尽头的前方屹立的树");
let think = new siteNode("再思之道");
let wuyuan = new siteNode("无缘塚");
let toad = new siteNode("大蟾蜍之泽");
let monsterMountain = new siteNode("妖怪之山");
let fall = new siteNode("九天瀑布");

let moriyaShrine = new siteNode("守矢神社");
let sanzuRiver = new siteNode("三途之河");
let otherWorld = new siteNode("彼岸");

function setPath(siteA, ...config) {
  for (const [type, len, node] of config) {
    siteA.set('paths',new pathNode(type, len, node));
  }
}

setPath(
  geyser,
  ["平原", 1, lDBarrier],
  ["山川", 3, yakumoHouse],
  ["平原", 2, humanVillage],
  ["山川", 1, hakureiJinja]
);
setPath(hakureiJinja, ["山川", 1, geyser]);
setPath(
  lDBarrier,
  ["山川", 1, whiteTower],
  ["山川", 1, geyser],
  ["山川", 1, yakumoHouse]
);
setPath(whiteTower, ["山川", 1, lDBarrier]);
setPath(
  humanVillage,
  ["平原", 2, geyser],
  ["平原", 2, chatArea],
  ["平原", 2.5, magicForest],
  ["平原", 1, kourindou],
  ["山川", 1, lDBarrier]
);
setPath(yakumoHouse, ["山川", 3, geyser], ["山川", 1, scrapPavilion]);
setPath(scrapPavilion, ["山川", 1, yakumoHouse], ["森林", 1, devilMansion]);
setPath(devilMansion, ["河道", 1, chatArea], ["森林", 1, scrapPavilion]);
setPath(
  chatArea,
  ["河道", 1, devilMansion],
  ["河道", 1, ponor],
  ["平原", 2, humanVillage]
);
setPath(ponor, ["河道", 1, chatArea], ["山川", 1, genbuRavine]);
setPath(
  magicForest,
  ["平原", 2.5, humanVillage],
  ["森林", 1, marisaHouse],
  ["森林", 1, wood],
  ["森林", 1, AliceHouse]
);
setPath(
  kourindou,
  ["平原", 1, humanVillage],
  ["平原", 2.5, unHouse],
  ["平原", 1, lostForest]
);
setPath(lostForest, ["平原", 2, kourindou], ["森林", 1, eternityHouse]);
setPath(eternityHouse, ["森林", 1, lostForest]);
setPath(marisaHouse, ["森林", 1, genbuRavine], ["森林", 1, magicForest]);
setPath(
  genbuRavine,
  ["山川", 1, ponor],
  ["山川", 1, monsterMountain],
  ["森林", 3, think],
  ["森林", 1, marisaHouse]
);
setPath(
  unHouse,
  ["平原", 2.5, AliceHouse],
  ["平原", 3, magicForest],
  ["山川", 2, flower]
);
setPath(AliceHouse, ["森林", 1, magicForest], ["平原", 2, unHouse]);
setPath(flower, ["山川", 2, unHouse], ["平原", 2, wood]);
setPath(
  wood,
  ["森林", 1, magicForest],
  ["平原", 2, think],
  ["平原", 2, flower]
);
setPath(
  think,
  ["森林", 3, genbuRavine],
  ["平原", 2, wuyuan],
  ["平原", 3, wood]
);
setPath(wuyuan, ["平原", 2, think], ["平原", 3, toad]);
setPath(
  toad,
  ["河道", 1, monsterMountain],
  ["山川", 1, fall],
  ["平原", 2, sanzuRiver],
  ["平原", 3, wuyuan]
);
setPath(monsterMountain, ["山川", 1, genbuRavine], ["河道", 1, toad]);
setPath(fall, ["山川", 1, moriyaShrine], ["山川", 1, toad]);
setPath(moriyaShrine, ["山川", 1, fall]);
setPath(sanzuRiver, ["河道", 1, otherWorld], ["平原", 2, toad]);
setPath(otherWorld, ["河道", 1, sanzuRiver]);

export let mapProxy = {
  siteStore: {
    博丽神社: hakureiJinja,
    间歇泉: geyser,
    幽冥结界: lDBarrier,
    白玉楼: whiteTower,
    人类村落: humanVillage,
    八云紫之屋: yakumoHouse,
    有顶天: sky,
    废弃洋馆: scrapPavilion,
    红魔馆: devilMansion,
    雾之湖: chatArea,
    水洞: ponor,
    魔法之森: magicForest,
    香霖堂: kourindou,
    迷途之森: lostForest,
    永远亭: eternityHouse,
    雾雨魔法店: marisaHouse,
    玄武涧: genbuRavine,
    无名之丘: unHouse,
    爱丽丝之邸: AliceHouse,
    太阳花田: flower,
    没有尽头的前方屹立的树: wood,
    再思之道: think,
    无缘塚: wuyuan,
    大蟾蜍之泽: toad,
    妖怪之山: monsterMountain,
    九天瀑布: fall,
    守矢神社: moriyaShrine,
    三途之河: sanzuRiver,
    彼岸: otherWorld,
  },
  startPoint: hakureiJinja,
  endPoints: [marisaHouse, otherWorld, whiteTower, eternityHouse, marisaHouse],
  isSetOrigin: false,

  getAllPaths(site1, site2) {
    let roadStore = {
      len: 0,
      roads: [],
    };
    let result = [];
    site1.findRoad(site2, roadStore, result);
    return result;
  },
  // getSite(site) {},
  getPath() {
    let sp = this.startPoint;
    let ep = this.endPoints[getRandom(0, 4)];
    let r = this.getAllPaths(sp, ep);
    for (const paths of r) {
      //计算每条路径的长度(基础数值)
      paths.len = this.countLen(paths);
    }
    r.sort((a, b) => a.len - b.len);
    r = r[getRandom(0, 4)];
    return r;
  },
  countLen(paths) {
    let count = 0;
    for (const p of paths) {
      count += p.len * p.typeEffect;
    }
    count = Math.round(count * 100) / 100;
    return count;
  },

};

