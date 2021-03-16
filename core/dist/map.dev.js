"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = void 0;

var _index = require("../../../utils/index.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var siteNode =
/*#__PURE__*/
function () {
  function siteNode(siteName) {
    _classCallCheck(this, siteNode);

    this.siteName = siteName; //地点名字

    this.paths = []; //连接的路径

    this.npcs = []; //npc上会有对应的事件

    this.events = []; //在节点上可能发生的事件

    this.time = null;
    this.detect = false;
  }

  _createClass(siteNode, [{
    key: "init",
    value: function init(time) {
      this.time = time;
    }
  }, {
    key: "setPath",
    value: function setPath() {
      var newPaths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      //参数可以是节点或者数组
      if (!(newPaths instanceof Array)) {
        this.paths.push(newPaths);
        return;
      }

      this.paths = [].concat(_toConsumableArray(this.paths), _toConsumableArray(newPaths));
    }
  }, {
    key: "setNpc",
    value: function setNpc() {
      var npcs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      //参数可以是节点或者数组
      if (!(npcs instanceof Array)) npcs = [].concat(_toConsumableArray(this.npcs), [npcs]);
      this.npcs = [].concat(_toConsumableArray(this.npcs), _toConsumableArray(npcs));
    }
  }, {
    key: "findRoad",
    value: function findRoad(endSite, roadStores, result) {
      if (this == endSite) {
        result.push(_toConsumableArray(roadStores.roads));
        return;
      }

      if (this.detect == true) return;
      this.detect = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var pNode = _step.value;
          roadStores.roads.push(pNode);
          this.findRoad.call(pNode.endSite, endSite, roadStores, result);
          roadStores.roads.pop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.detect = false;
    }
  }]);

  return siteNode;
}();

var typeEffect = {
  森林: 1.1,
  平原: 1,
  山川: 1.2,
  河道: 1.1
};

var pathNode = function pathNode(type, len, endSite) {
  _classCallCheck(this, pathNode);

  this.type = type; //道路类型

  this.typeEffect = typeEffect[type];
  this.len = len; //道路长度

  this.endSite = endSite;
};

var hakureiJinja = new siteNode("博丽神社");
var geyser = new siteNode("间歇泉");
var lDBarrier = new siteNode("幽冥结界");
var whiteTower = new siteNode("白玉楼");
var humanVillage = new siteNode("人类村落");
var yakumoHouse = new siteNode("八云紫之屋");
var sky = new siteNode("有顶天");
var scrapPavilion = new siteNode("废弃洋馆");
var devilMansion = new siteNode("红魔馆");
var chatArea = new siteNode("雾之湖");
var ponor = new siteNode("水洞");
var magicForest = new siteNode("魔法之森");
var kourindou = new siteNode("香霖堂");
var lostForest = new siteNode("迷途之森");
var eternityHouse = new siteNode("永远亭");
var marisaHouse = new siteNode("雾雨魔法店");
var genbuRavine = new siteNode("玄武涧");
var unHouse = new siteNode("无名之丘");
var AliceHouse = new siteNode("爱丽丝之邸");
var flower = new siteNode("太阳花田");
var wood = new siteNode("没有尽头的前方屹立的树");
var think = new siteNode("再思之道");
var wuyuan = new siteNode("无缘塚");
var toad = new siteNode("大蟾蜍之泽");
var monsterMountain = new siteNode("妖怪之山");
var fall = new siteNode("九天瀑布");
var moriyaShrine = new siteNode("守矢神社");
var sanzuRiver = new siteNode("三途之河");
var otherWorld = new siteNode("彼岸");

function setPath(siteA) {
  for (var _len = arguments.length, config = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    config[_key - 1] = arguments[_key];
  }

  for (var _i = 0, _config = config; _i < _config.length; _i++) {
    var _config$_i = _slicedToArray(_config[_i], 3),
        type = _config$_i[0],
        len = _config$_i[1],
        node = _config$_i[2];

    siteA.setPath(new pathNode(type, len, node));
  }
}

setPath(geyser, ["平原", 1, lDBarrier], ["山川", 3, yakumoHouse], ["平原", 2, humanVillage], ["山川", 1, hakureiJinja]);
setPath(hakureiJinja, ["山川", 1, geyser]);
setPath(lDBarrier, ["山川", 1, whiteTower], ["山川", 1, geyser], ["山川", 1, yakumoHouse]);
setPath(whiteTower, ["山川", 1, lDBarrier]);
setPath(humanVillage, ["平原", 2, geyser], ["平原", 2, chatArea], ["平原", 2.5, magicForest], ["平原", 1, kourindou], ["山川", 1, lDBarrier]);
setPath(yakumoHouse, ["山川", 3, geyser], ["山川", 1, scrapPavilion]);
setPath(scrapPavilion, ["山川", 1, yakumoHouse], ["森林", 1, devilMansion]);
setPath(devilMansion, ["河道", 1, chatArea], ["森林", 1, scrapPavilion]);
setPath(chatArea, ["河道", 1, devilMansion], ["河道", 1, ponor], ["平原", 2, humanVillage]);
setPath(ponor, ["河道", 1, chatArea], ["山川", 1, genbuRavine]);
setPath(magicForest, ["平原", 2.5, humanVillage], ["森林", 1, marisaHouse], ["森林", 1, wood], ["森林", 1, AliceHouse]);
setPath(kourindou, ["平原", 1, humanVillage], ["平原", 2.5, unHouse], ["平原", 1, lostForest]);
setPath(lostForest, ["平原", 2, kourindou], ["森林", 1, eternityHouse]);
setPath(eternityHouse, ["森林", 1, lostForest]);
setPath(marisaHouse, ["森林", 1, genbuRavine], ["森林", 1, magicForest]);
setPath(genbuRavine, ["山川", 1, ponor], ["山川", 1, monsterMountain], ["森林", 3, think], ["森林", 1, marisaHouse]);
setPath(unHouse, ["平原", 2.5, AliceHouse], ["平原", 3, magicForest], ["山川", 2, flower]);
setPath(AliceHouse, ["森林", 1, magicForest], ["平原", 2, unHouse]);
setPath(flower, ["山川", 2, unHouse], ["平原", 2, wood]);
setPath(wood, ["森林", 1, magicForest], ["平原", 2, think], ["平原", 2, flower]);
setPath(think, ["森林", 3, genbuRavine], ["平原", 2, wuyuan], ["平原", 3, wood]);
setPath(wuyuan, ["平原", 2, think], ["平原", 3, toad]);
setPath(toad, ["河道", 1, monsterMountain], ["山川", 1, fall], ["平原", 2, sanzuRiver], ["平原", 3, wuyuan]);
setPath(monsterMountain, ["山川", 1, genbuRavine], ["河道", 1, toad]);
setPath(fall, ["山川", 1, moriyaShrine], ["山川", 1, toad]);
setPath(moriyaShrine, ["山川", 1, fall]);
setPath(sanzuRiver, ["河道", 1, otherWorld], ["平原", 2, toad]);
setPath(otherWorld, ["河道", 1, sanzuRiver]);
var map = {
  siteStore: [hakureiJinja, geyser, lDBarrier, whiteTower, humanVillage, yakumoHouse, sky, scrapPavilion, devilMansion, chatArea, ponor, magicForest, kourindou, lostForest, eternityHouse, marisaHouse, genbuRavine, unHouse, AliceHouse, flower, wood, think, wuyuan, toad, monsterMountain, fall, moriyaShrine, sanzuRiver, otherWorld],
  startPoint: hakureiJinja,
  endPoints: [marisaHouse, otherWorld, whiteTower, eternityHouse, marisaHouse],
  getAllPaths: function getAllPaths(site1, site2) {
    var roadStore = {
      len: 0,
      roads: []
    };
    var result = [];
    site1.findRoad(site2, roadStore, result);
    return result;
  },
  getPath: function getPath() {
    var sp = this.startPoint;
    var ep = this.endPoints[(0, _index.getRandom)(0, 4)];
    var r = this.getAllPaths(sp, ep);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = r[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var paths = _step2.value;
        //计算每条路径的长度(基础数值)
        paths.len = this.countLen(paths);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    r.sort(function (a, b) {
      return a.len - b.len;
    });
    r = r[(0, _index.getRandom)(0, 4)];
    return r;
  },
  countLen: function countLen(paths) {
    var count = 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = paths[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var p = _step3.value;
        count += p.len * p.typeEffect;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    count = Math.round(count * 100) / 100;
    return count;
  }
};
exports.map = map;