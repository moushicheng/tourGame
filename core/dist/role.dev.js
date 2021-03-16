"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.role = void 0;

var _index = require("../../../utils/index.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var role =
/*#__PURE__*/
function () {
  function role() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '橙萌萌';
    var recommend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '主人的任务罢了';

    _classCallCheck(this, role);

    //角色基本属性
    this.name = name;
    this.recommend = recommend; //旅行属性

    this.Stamina = 75 + (0, _index.getRandom)(0, 25); //体力 

    this.follow = null;
    this["package"] = {
      food: [],
      mapItem: [],
      spellCard: []
    }; //战斗属性

    this.hp = 100; //血量

    this.mp = 5 + (0, _index.getRandom)(0, 5); //魔力
    //地图属性

    this.path = null; //总路径图

    this.sitePoint = null; //当前位置

    this.weather = null;
  }

  _createClass(role, [{
    key: "setRoad",
    value: function setRoad(path) {
      this.path = path;
    }
  }, {
    key: "setWeather",
    value: function setWeather(curWeather) {
      this.weather = curWeather;
    }
  }, {
    key: "setPackage",
    value: function setPackage(_ref) {
      var _this$package$food, _this$package$mapItem, _this$spellCard$mapIt;

      var food = _ref.food,
          mapItem = _ref.mapItem,
          spellCard = _ref.spellCard;

      (_this$package$food = this["package"].food).push.apply(_this$package$food, _toConsumableArray(food));

      (_this$package$mapItem = this["package"].mapItem).push.apply(_this$package$mapItem, _toConsumableArray(mapItem));

      (_this$spellCard$mapIt = this.spellCard.mapItem).push.apply(_this$spellCard$mapIt, _toConsumableArray(spellCard));
    }
  }, {
    key: "countTime",
    value: function countTime() {
      var w = this.weather;
      var p = this.path;
      var mapItem = this["package"].mapItem;
    }
  }]);

  return role;
}();

exports.role = role;