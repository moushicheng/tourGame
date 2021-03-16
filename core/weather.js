/*
 * @Author: your name
 * @Date: 2021-03-13 16:43:49
 * @LastEditTime: 2021-03-15 23:27:16
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \tourGame\core\weather.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { getRandom } from "../utils/index.js";
let wType={
    '快晴':0.9,
    '浓雾':1.1,
    '雪':1.2,
    '天气雨':1.1,
    '疏雨':1.0,
    '烈日':1.1,
    '台风':1.3,
    '晴岚':1.0
}
let wBattleEffect={
    '快晴':function(){
        
    },
    '浓雾':function(){

    },
    '雪':function(){

    },
    '天气雨':function(){

    },
    '疏雨':function(){

    },
    '烈日':function(){

    },
    '台风':function(){

    },
    '晴岚':function(){

    },
}
let wSpeaks={
  '快晴':'天空开始放晴',
  '浓雾':'雾之湖方向飘来了阵阵浓雾,怎么回事？',
  '雪':'气温骤降,一片冰晶打到了萌萌的头顶',
  '天气雨':'天气雨',
  '疏雨':'疏雨',
  '烈日':'烈日',
  '台风':'台风',
  '晴岚':'晴岚'
}
export let weather={
  getWeather(){
    let r=Object.entries(wType)[getRandom(0,7)];
    r.push(wBattleEffect[r[0]]);
    return {
      name:r[0],
      effect:r[1],
      battle:r[2],
      speaks:wSpeaks[r[0]]
    } //天气 天气效果·道路 天气效果·战斗
  }
}
