/*
 * @Author: your name
 * @Date: 2021-03-13 16:55:45
 * @LastEditTime: 2021-03-16 08:32:47
 * @LastEditors: your name
 * @Description:
 * @FilePath: \tourGame\core\role.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { getRandom, speak, sleep} from "../utils/index";
class originMethod { //初始化相关函数
  setRoad(path) { //设置路径
    this.path = path;
  }
  setWeather(curWeather) { //设置天气
    this.weather = curWeather;
  }
  setPackage({ food, mapItem, spellCard }) { //设置背包物品 
    this.package.food.push(...food);
    this.package.mapItem.push(...mapItem);
    this.spellCard.mapItem.push(...spellCard);
  }
  countTime() { //初始化路径时间 
    let Tweather = this.weather.effect;
    let pathNodes = this.path;

    let siteNodes = [];
    //计算路径时间,顺便获取目的地
    for (const node of pathNodes) {
      let Tway = node.len; //路径基础产长度
      let Ttype = node.typeEffect; //地形带来的影响
      let type = node.type; //路径类型
      let e = this.getItemEffectTime(type); //携带物品影响
      node.time = (Tway * 0.8 + Ttype * e) * Tweather; //总计算公式
      node.time = Math.round(node.time * 100) / 100; //保留二位小数
      siteNodes.push(node.endSite); //获取目的地
    }
    for (const node of siteNodes) {
      node.time = getRandom(1, 2, false);
    }
  }
  getItemEffectTime(type) { //初始化·获取路径时间·物品相关
    let mapItems = this.package.mapItem;
    let e = 0;
    let count = 0;
    for (const item of mapItems) {
      if (item.type == type || item.type == "all") {
        count++;
        e += 0.01 * (100 - item.Ew);
      }
    }
    if (count == 0) return 1;
    else return e;
  }
  allotProperty(base, property) { //分配属性点
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
      this[property[i]] += Math.floor(random * 100) / 100;
      base -= random;
    }
    this.hp *= 10;
    this.Stamina *= 10;
  }
}

export class role extends originMethod {
  constructor(name = "橙萌萌", recommend = "主人的任务罢了") {
    super();
    //角色基本属性
    this.name = name;
    this.recommend = recommend;

    //旅行属性
    this.Stamina = 5; //体力
    this.follow = null;//是否有随从
    this.package = {
      food: [],
      mapItem: [],
      spellCard: [],
    };
    this.luck = 5;
    this.status=1;//生存状态

    //战斗属性
    this.hp = 5; //血量
    this.mp = 5; //魔力
    //地图属性
    this.path = null; //总路径图
    this.curPoint = null; //当前位置
    this.weather = null;
    this.allotProperty(20, ["luck", "hp", "mp", "Stamina"]);
  }
  async run() {
    //家中整备

    //正式出发
    for (const path of this.path) {
      this.curPoint = path; //改变当前位置状态
      await sleep(this.curPoint.time * 0.0001);
      this.update(this.curPoint, "path"); //执行路径逻辑

      this.curPoint = path.endSite; //改变当前位置状态
      await sleep(this.curPoint.time * 0.0001);
      this.update(this.curPoint, "site"); //执行地点逻辑
    }
    //到达终点
  }
  update(point, type) {
    if (type == "path") {
      this.Stamina -= point.time * 10;
      speak("路径:" + point.type, point.time, this.Stamina);
    }
    if (type == "site") {
      speak("地点 :" + point.siteName, point.time, this.Stamina);
      point.executeEvent(this);
    }
    if (this.Stamina <= 0) {
      while (1) {
        let food=this.getFood()
        if(!food)return;
        this.eat(food);
        if(this.Stamina>=0)return
      }
      this.checkDeath();
    }
  }
  checkDeath(){
    if(this.hp<=0||this.Stamina<=0){
      this.status=0;
      speak('萌萌卒,正在猫车回家')
    }
  }
  getFood(){
    return this.package.food.pop()
  }
  eat(food){
    this.Stamina+=food.Stamina
  }
  giveGift(){
    console.log('送礼');
  }
}
