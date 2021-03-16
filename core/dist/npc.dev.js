"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * @Author: your name
 * @Date: 2021-03-12 13:21:26
 * @LastEditTime: 2021-03-14 12:25:09
 * @LastEditors: your name
 * @Description:
 * @FilePath: \mirai\code\mod\tourGame\core\npc.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
var npc =
/*#__PURE__*/
function () {
  function npc(gf, race, recommend) {
    _classCallCheck(this, npc);

    this.gf = gf; //好感度

    this.race = race; //种族

    this.recommend = recommend; //角色介绍

    this.like = []; //喜好

    this.donLike = [];
  }

  _createClass(npc, [{
    key: "setLike",
    value: function setLike(items, status) {
      //设置喜好
      if (status == 1) {
        this.like = [this.like].concat(_toConsumableArray(items));
      }

      if (status == 0) {
        this.donLike = [this.donLike].concat(_toConsumableArray(items));
      }
    }
  }, {
    key: "setSpellCard",
    value: function setSpellCard(spellCard) {
      this.spellCard = spellCard;
    }
  }, {
    key: "receive",
    value: function receive(item) {}
  }]);

  return npc;
}();