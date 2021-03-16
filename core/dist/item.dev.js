"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @Author: your name
 * @Date: 2021-03-14 11:58:16
 * @LastEditTime: 2021-03-14 12:09:41
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \mirai\code\mod\tourGame\core\item.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
var item = function item(name) {
  _classCallCheck(this, item);

  this.name = name;
};

var mapItem =
/*#__PURE__*/
function (_item) {
  _inherits(mapItem, _item);

  function mapItem(name, type, Ew) {
    var _this;

    _classCallCheck(this, mapItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(mapItem).call(this, name));
    _this.type = type;
    _this.Ew = Ew;
    return _this;
  }

  return mapItem;
}(item);