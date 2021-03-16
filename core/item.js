/*
 * @Author: your name
 * @Date: 2021-03-14 11:58:16
 * @LastEditTime: 2021-03-14 12:09:41
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \mirai\code\mod\tourGame\core\item.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
class item{
    constructor(name){
        this.name=name
    }
}


class mapItem extends item{
    constructor(name,type,Ew){
        super(name)
        this.type=type
        this.Ew=Ew
    }
}
