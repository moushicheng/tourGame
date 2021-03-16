/*
 * @Author: your name
 * @Date: 2021-03-12 13:21:26
 * @LastEditTime: 2021-03-16 18:01:19
 * @LastEditors: your name
 * @Description:
 * @FilePath: \tourGame\core\npc.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { getRandom, getRandomObj, keepTd } from "../utils/index.js";
import { npcEventManager,eventProxy } from "./event.js";
import { mapProxy } from "./map.js";
class Method {
  allotProperty(base, property) {
    //分配属性点
    base = keepTd(base);
    let len = property.length;
    let times = getRandom(0, len - 1);
    for (let i = 0; i < times; i++) {
      property.push(property.shift());
    }
    //开始分配
    for (let i = 0; i < len; i++) {
      if (i == len - 1) {
        this[property[i]] += base;
        break;
      }
      let random = getRandom(0, (base / len) * 2);
      this[property[i]] += keepTd(random);
      base -= random;
    }
    this.hp *= 10;
  }
  setLike(items, status) {
    //1->喜欢 ,0 -> 不喜欢
    //设置喜好
    if (status == 1) {
      this.like = [...this.like, ...items];
    }
    if (status == 0) {
      this.donLike = [...this.donLike, ...items];
    }
  }
  set(name,values= []) {
    if (!(name instanceof Array)) {
      this[name] = [...this[name], values];
      return;
    }
    this[name] = [...this[name], ...values];
  }
  getGf(type) {
    //0->低友好度
    //1->中友好度
    //2->高友好度
    switch (type) {
      case 0:
        return getRandom(21, 40);
      case 1:
        return getRandom(41, 80);
      case 2:
        return getRandom(81, 90);
    }
  }
}
class npc extends Method {
  constructor({ gf, race, recommend, site, name, risk,eventInfo}) {
    super();
    this.name = name;
    this.race = race; //种族
    this.recommend = recommend; //角色介绍

    //战斗属性
    this.hp = 5;
    this.mp = 5;
    this.battleDesire = 5; //战斗欲望

    //好感系统

    this.gf = gf; //好感度
    this.like = []; //喜好
    this.donLike = [];

    this.risk = risk; //危险度

    //物品系统
    this.items = []; //人物本身持有物
    this.spellCard = null; //符卡

    //设定所在地
    this.site = site;
    site.npcs.push(this);

    //添加至代理器
    npcProxy.npcs[this.name] = this;

    //特殊事件
    this.events = [];

    //分配属性点
    this.gf = this.getGf(this.gf);
    this.allotProperty(15 * (0.2 * this.risk + 0.8), [
      "hp",
      "mp",
      "battleDesire",
    ]);
  }
  triggerEvent(role) {
    //为事件管理器初始化
    npcEventManager.set(role, this);
    //判断好感度,执行普通事件[所有npc都有的事件]
    this.executeCEvent(role);
    
    //特殊事件
    this.executeSEvent(role);
    //普通对话
    //随机buff
    //获得物品
  }
  executeCEvent(role) {
    //处理普通事件
    npcEventManager.set(role, this);
    if (this.gf > 40) {
      npcEventManager.giftEvent();
    } else {
      npcEventManager.fightEvent();
    }
  }
  executeSEvent(role) {
    let event = getRandomObj(this.events);
    if(event)event.execute(role,this);
  }
}

export let npcProxy = {
  npcs: {},
  origin() {
    let Nitori = new npc({
      name: "河城荷取",
      gf: 1,
      risk: 2,
      race: "河童",
      site:mapProxy.siteStore["间歇泉"], 
      recommend: `    栖息于玄武涧的河童中的一员。河童的数量众多，好像都构筑起了一个社会体系。
        就整个河童群体而言，手艺都非常精巧，擅长制作道具。好像保留着人类都难以理解的高级技术。但是那种技术只为一部分的妖怪服务。
        她的帆布包和衣服的口袋里，装着各种各样的工具，材料，燃料，谜之物质。如果只是做些物理道具，用这些应该就足够了。但听说她不太擅长做魔法道具或咒术的道具。
        有着胆小的一面，一人独处的时候，要是有人类或者其他妖怪靠近过来的话，经常撒腿就跑。在同伴圈里则是很开朗活泼，逃不掉的时候就会采取傲慢的态度。看起来像是打心底里瞧不起人类和其他的妖怪，事实上却不难看出，她这是在虚张声势。`,
    });
    let Cirno=new npc({
     name:"琪露诺",
     gf:1,
     risk:0,
     race:"妖精",
     site:mapProxy.siteStore["雾之湖"],
     recommend:`平时以雾之湖作为根据地。她是湖附近妖精们中的领袖般的存在，力量也比其他妖精强。她是属于好战型的，所以必须留神。[东方求闻史纪]但是还是比较弱甚至“和杂鱼没什么区别”的角色。`,
    })
  },
};
