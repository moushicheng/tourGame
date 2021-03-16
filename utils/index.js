/*
 * @Author: your name
 * @Date: 2021-03-04 08:38:12
 * @LastEditTime: 2021-03-16 20:09:54
 * @LastEditors: your name
 * @Description:
 * @FilePath: \tourGame\utils\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
export function speak(text) {
  console.log(text);
}
export function getRandom(num1, num2, isInt = true) { //默认返回的数字是整形
  //随机取num1~num2中间的数字
  if (!isInt) return Math.round((Math.random() * (num2 - num1) + num1)* 100) / 100
  else return Math.floor(Math.random() * (num2 - num1 + 1) + num1); // 取(0~num2-num1)+num1=num1~num2
}
export function sleep(t) {
  //以h为单位
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, t * 3600 * 1000);
  });
}
export function keepTd(num){
  return Math.floor(num * 100) / 100;
}
export function getRandomObj(obj,len=null){
  let length=len?len:obj.length
  let num = Math.random();
  num = Math.ceil(num * length) - 1;
  if (num < 0) num = 0;
  return obj[num];
}
export function compPoint(a,b){
  return getRandom(0,a)>getRandom(0,b)?true:false
}
export let log={
  store:[],
  push(text){
      console.log(text);
      this.store.push(text)
  }
}