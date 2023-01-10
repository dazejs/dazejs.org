(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ 431:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(5).default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.composeRef = composeRef;
exports.fillRef = fillRef;
exports.supportRef = supportRef;
exports.useComposeRef = useComposeRef;
var _typeof2 = _interopRequireDefault(__webpack_require__(14));
var _reactIs = __webpack_require__(62);
var _useMemo = _interopRequireDefault(__webpack_require__(247));
function fillRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node);
  } else if ((0, _typeof2.default)(ref) === 'object' && ref && 'current' in ref) {
    ref.current = node;
  }
}
/**
 * Merge refs into one ref function to support ref passing.
 */
function composeRef() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }
  var refList = refs.filter(function (ref) {
    return ref;
  });
  if (refList.length <= 1) {
    return refList[0];
  }
  return function (node) {
    refs.forEach(function (ref) {
      fillRef(ref, node);
    });
  };
}
function useComposeRef() {
  for (var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    refs[_key2] = arguments[_key2];
  }
  return (0, _useMemo.default)(function () {
    return composeRef.apply(void 0, refs);
  }, refs, function (prev, next) {
    return prev.length === next.length && prev.every(function (ref, i) {
      return ref === next[i];
    });
  });
}
function supportRef(nodeOrComponent) {
  var _type$prototype, _nodeOrComponent$prot;
  var type = (0, _reactIs.isMemo)(nodeOrComponent) ? nodeOrComponent.type.type : nodeOrComponent.type;
  // Function component node
  if (typeof type === 'function' && !((_type$prototype = type.prototype) === null || _type$prototype === void 0 ? void 0 : _type$prototype.render)) {
    return false;
  }
  // Class component
  if (typeof nodeOrComponent === 'function' && !((_nodeOrComponent$prot = nodeOrComponent.prototype) === null || _nodeOrComponent$prot === void 0 ? void 0 : _nodeOrComponent$prot.render)) {
    return false;
  }
  return true;
}
/* eslint-enable */

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var raf = function raf(callback) {
  return +setTimeout(callback, 16);
};
var caf = function caf(num) {
  return clearTimeout(num);
};
if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = function raf(callback) {
    return window.requestAnimationFrame(callback);
  };
  caf = function caf(handle) {
    return window.cancelAnimationFrame(handle);
  };
}
var rafUUID = 0;
var rafIds = new Map();
function cleanup(id) {
  rafIds.delete(id);
}
var wrapperRaf = function wrapperRaf(callback) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  rafUUID += 1;
  var id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      // Clean up
      cleanup(id);
      // Trigger
      callback();
    } else {
      // Next raf
      var realId = raf(function () {
        callRef(leftTimes - 1);
      });
      // Bind real raf id
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
};
wrapperRaf.cancel = function (id) {
  var realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};
var _default = wrapperRaf;
exports.default = _default;

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var antd_lib_row_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(236);
/* harmony import */ var antd_lib_row_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_row_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(166);
/* harmony import */ var antd_lib_row__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_row__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_col_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(237);
/* harmony import */ var antd_lib_col_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_col_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(150);
/* harmony import */ var antd_lib_col__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_col__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(436);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58);
/* harmony import */ var _context_from__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(94);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(113);









/* harmony default export */ __webpack_exports__["a"] = (function () {
  var from = Object(react__WEBPACK_IMPORTED_MODULE_4__["useContext"])(_context_from__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"]);
  return from.from === 'bb' ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "app-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "footer-box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", {
    className: "logo"
  }, "DAZE.JS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_row__WEBPACK_IMPORTED_MODULE_1___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_col__WEBPACK_IMPORTED_MODULE_3___default.a, {
    xxl: 6,
    xl: 6,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h4", null, "\u7279\u6027"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
    to: "/docs/core/container"
  }, "IOC \u5BB9\u5668")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
    to: "/docs/core/privider"
  }, "\u63D0\u4F9B\u8005\u6A21\u5F0F")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
    to: "/docs/core/autoload"
  }, "\u81EA\u52A8\u52A0\u8F7D")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
    to: "/docs/base/controller"
  }, "\u8DEF\u7531")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
    to: "/docs/base/database"
  }, "\u6570\u636E\u5E93")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "b"], {
    to: "/docs/adv/process"
  }, "\u591A\u8FDB\u7A0B"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_col__WEBPACK_IMPORTED_MODULE_3___default.a, {
    xxl: 6,
    xl: 6,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h4", null, "\u751F\u6001"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", {
    href: "https://github.com/dazejs/dubbo-provider",
    target: "_blank"
  }, "Apache Dubbo")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", {
    href: "https://github.com/dazejs/jwt-provider",
    target: "_blank"
  }, "JWT"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_col__WEBPACK_IMPORTED_MODULE_3___default.a, {
    xxl: 6,
    xl: 6,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h4", null, "\u5E2E\u52A9"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", {
    href: "https://github.com/dazejs/daze",
    target: "_blank"
  }, "Github")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", {
    href: "https://github.com/dazejs/daze/blob/master/packages/framework/CHANGELOG.md",
    target: "_blank"
  }, "\u66F4\u65B0\u8BB0\u5F55")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", {
    href: "https://github.com/dazejs/daze/issues",
    target: "_blank"
  }, "\u8BA8\u8BBA\u5217\u8868"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_col__WEBPACK_IMPORTED_MODULE_3___default.a, {
    xxl: 6,
    xl: 6,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("p", null, "Daze.js \u662F\u57FA\u4E8E Node.js \u7684 Web \u5168\u6808\u6846\u67B6\uFF0C\u5B83\u5177\u6709\u9AD8\u6027\u80FD\uFF0C\u9AD8\u6269\u5C55\u6027\uFF0C\u4F53\u9A8C\u53CB\u597D\u7684\u7279\u6027\uFF0C\u662F\u4E00\u6B3E\u9762\u5411\u672A\u6765\u7684\u6846\u67B6\u3002"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "icons"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("a", {
    href: "https://github.com/dazejs/daze",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_icons__WEBPACK_IMPORTED_MODULE_8__[/* GithubOutlined */ "c"], {
    style: {
      fontSize: 25
    }
  }))))))));
});

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/antd/lib/layout/style/index.js
var layout_style = __webpack_require__(158);

// EXTERNAL MODULE: ./node_modules/antd/lib/layout/index.js
var layout = __webpack_require__(89);
var layout_default = /*#__PURE__*/__webpack_require__.n(layout);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./src/container/home/index.less
var home = __webpack_require__(445);

// EXTERNAL MODULE: ./node_modules/antd/lib/button/style/index.js
var button_style = __webpack_require__(429);

// EXTERNAL MODULE: ./node_modules/antd/lib/button/index.js
var lib_button = __webpack_require__(430);
var button_default = /*#__PURE__*/__webpack_require__.n(lib_button);

// CONCATENATED MODULE: ./src/assets/logo-banner.png
/* harmony default export */ var logo_banner = (__webpack_require__.p + "bb183d23e4f920c28f50827a9664f933.png");
// EXTERNAL MODULE: ./src/components/banner/index.less
var banner = __webpack_require__(446);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/@ant-design/icons-svg/es/asn/GithubFilled.js
// This icon file is generated automatically.
var GithubFilled_GithubFilled = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" } }] }, "name": "github", "theme": "filled" };
/* harmony default export */ var asn_GithubFilled = (GithubFilled_GithubFilled);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(7);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/components/Context.js

var IconContext = /*#__PURE__*/Object(react["createContext"])({});
/* harmony default export */ var Context = (IconContext);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/@ant-design/colors/dist/index.esm.js
var index_esm = __webpack_require__(165);

// EXTERNAL MODULE: ./node_modules/rc-util/es/warning.js
var warning = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/rc-util/es/Dom/canUseDom.js
var canUseDom = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/rc-util/es/Dom/contains.js
var contains = __webpack_require__(72);

// CONCATENATED MODULE: ./node_modules/rc-util/es/Dom/dynamicCSS.js


var APPEND_ORDER = 'data-rc-order';
var MARK_KEY = "rc-util-key";
var containerCache = new Map();
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    mark = _ref.mark;
  if (mark) {
    return mark.startsWith('data-') ? mark : "data-".concat(mark);
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head = document.querySelector('head');
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === 'queue') {
    return 'prependQueue';
  }
  return prepend ? 'prepend' : 'append';
}
/**
 * Find style which inject by rc-util
 */
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter(function (node) {
    return node.tagName === 'STYLE';
  });
}
function injectCSS(css) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!Object(canUseDom["a" /* default */])()) {
    return null;
  }
  var csp = option.csp,
    prepend = option.prepend;
  var styleNode = document.createElement('style');
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));
  if (csp === null || csp === void 0 ? void 0 : csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css;
  var container = getContainer(option);
  var firstChild = container.firstChild;
  if (prepend) {
    // If is queue `prepend`, it will prepend first style and then append rest style
    if (prepend === 'queue') {
      var existStyle = findStyles(container).filter(function (node) {
        return ['prepend', 'prependQueue'].includes(node.getAttribute(APPEND_ORDER));
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    // Use `insertBefore` as `prepend`
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var container = getContainer(option);
  return findStyles(container).find(function (node) {
    return node.getAttribute(getMark(option)) === key;
  });
}
function removeCSS(key) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var existNode = findExistNode(key, option);
  if (existNode) {
    var container = getContainer(option);
    container.removeChild(existNode);
  }
}
/**
 * qiankun will inject `appendChild` to insert into other
 */
function syncRealContainer(container, option) {
  var cachedRealContainer = containerCache.get(container);
  // Find real container when not cached or cached container removed
  if (!cachedRealContainer || !Object(contains["a" /* default */])(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS('', option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
/**
 * manually clear container cache to avoid global cache in unit testes
 */
function clearContainerCache() {
  containerCache.clear();
}
function updateCSS(css, key) {
  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var container = getContainer(option);
  // Sync real parent
  syncRealContainer(container, option);
  var existNode = findExistNode(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if (((_option$csp = option.csp) === null || _option$csp === void 0 ? void 0 : _option$csp.nonce) && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  var newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}
// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/utils.js







function utils_warning(valid, message) {
  Object(warning["a" /* default */])(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return Object(esm_typeof["a" /* default */])(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (Object(esm_typeof["a" /* default */])(target.icon) === 'object' || typeof target.icon === 'function');
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];
    switch (key) {
      case 'class':
        acc.className = val;
        delete acc.class;
        break;
      default:
        acc[key] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /*#__PURE__*/react_default.a.createElement(node.tag, Object(objectSpread2["a" /* default */])({
      key: key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function (child, index) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }
  return /*#__PURE__*/react_default.a.createElement(node.tag, Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({
    key: key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function (child, index) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return Object(index_esm["generate"])(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
var svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false'
};
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var utils_useInsertStyles = function useInsertStyles() {
  var styleStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : iconStyles;
  var _useContext = Object(react["useContext"])(Context),
    csp = _useContext.csp;
  Object(react["useEffect"])(function () {
    updateCSS(styleStr, '@ant-design-icons', {
      prepend: true,
      csp: csp
    });
  }, []);
};
// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/components/IconBase.js


var _excluded = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];

var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor,
    secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return Object(objectSpread2["a" /* default */])({}, twoToneColorPalette);
}
var IconBase_IconBase = function IconBase(props) {
  var icon = props.icon,
    className = props.className,
    onClick = props.onClick,
    style = props.style,
    primaryColor = props.primaryColor,
    secondaryColor = props.secondaryColor,
    restProps = Object(objectWithoutProperties["a" /* default */])(props, _excluded);
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  utils_useInsertStyles();
  utils_warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!isIconDefinition(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === 'function') {
    target = Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return generate(target.icon, "svg-".concat(target.name), Object(objectSpread2["a" /* default */])({
    className: className,
    onClick: onClick,
    style: style,
    'data-icon': target.name,
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true'
  }, restProps));
};
IconBase_IconBase.displayName = 'IconReact';
IconBase_IconBase.getTwoToneColors = getTwoToneColors;
IconBase_IconBase.setTwoToneColors = setTwoToneColors;
/* harmony default export */ var components_IconBase = (IconBase_IconBase);
// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/components/twoTonePrimaryColor.js



function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
    _normalizeTwoToneColo2 = Object(slicedToArray["a" /* default */])(_normalizeTwoToneColo, 2),
    primaryColor = _normalizeTwoToneColo2[0],
    secondaryColor = _normalizeTwoToneColo2[1];
  return components_IconBase.setTwoToneColors({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  });
}
function getTwoToneColor() {
  var colors = components_IconBase.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/components/AntdIcon.js




var AntdIcon_excluded = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];






// Initial setting
// should move it to antd main repo?
setTwoToneColor('#1890ff');
var Icon = /*#__PURE__*/react["forwardRef"](function (props, ref) {
  var _classNames;
  var className = props.className,
    icon = props.icon,
    spin = props.spin,
    rotate = props.rotate,
    tabIndex = props.tabIndex,
    onClick = props.onClick,
    twoToneColor = props.twoToneColor,
    restProps = Object(objectWithoutProperties["a" /* default */])(props, AntdIcon_excluded);
  var _React$useContext = react["useContext"](Context),
    _React$useContext$pre = _React$useContext.prefixCls,
    prefixCls = _React$useContext$pre === void 0 ? 'anticon' : _React$useContext$pre,
    rootClassName = _React$useContext.rootClassName;
  var classString = classnames_default()(rootClassName, prefixCls, (_classNames = {}, Object(defineProperty["a" /* default */])(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), Object(defineProperty["a" /* default */])(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === 'loading'), _classNames), className);
  var iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
    _normalizeTwoToneColo2 = Object(slicedToArray["a" /* default */])(_normalizeTwoToneColo, 2),
    primaryColor = _normalizeTwoToneColo2[0],
    secondaryColor = _normalizeTwoToneColo2[1];
  return /*#__PURE__*/react["createElement"]("span", Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({
    role: "img",
    "aria-label": icon.name
  }, restProps), {}, {
    ref: ref,
    tabIndex: iconTabIndex,
    onClick: onClick,
    className: classString
  }), /*#__PURE__*/react["createElement"](components_IconBase, {
    icon: icon,
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = 'AntdIcon';
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
/* harmony default export */ var AntdIcon = (Icon);
// CONCATENATED MODULE: ./node_modules/@ant-design/icons/es/icons/GithubFilled.js

// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY



var icons_GithubFilled_GithubFilled = function GithubFilled(props, ref) {
  return /*#__PURE__*/react["createElement"](AntdIcon, Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, props), {}, {
    ref: ref,
    icon: asn_GithubFilled
  }));
};
icons_GithubFilled_GithubFilled.displayName = 'GithubFilled';
/* harmony default export */ var icons_GithubFilled = (/*#__PURE__*/react["forwardRef"](icons_GithubFilled_GithubFilled));
// EXTERNAL MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js
var react_router_dom = __webpack_require__(58);

// CONCATENATED MODULE: ./src/components/banner/index.tsx







/* harmony default export */ var components_banner = (function () {
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "banner"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "hero"
  }, /*#__PURE__*/react_default.a.createElement("img", {
    src: logo_banner
  }), /*#__PURE__*/react_default.a.createElement("h1", null, "DAZE.JS"), /*#__PURE__*/react_default.a.createElement("p", {
    className: "description"
  }, "\u57FA\u4E8E Node.js \u7684 Web \u5168\u6808\u6846\u67B6\uFF0C\u672A\u6765\u5C3D\u5728\u638C\u63E1\u3002"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "action"
  }, /*#__PURE__*/react_default.a.createElement(button_default.a, {
    size: "large",
    shape: "round",
    type: "primary"
  }, /*#__PURE__*/react_default.a.createElement(react_router_dom["b" /* Link */], {
    to: "/docs/quick-start"
  }, "\u5F00\u59CB\u4F7F\u7528")), /*#__PURE__*/react_default.a.createElement(button_default.a, {
    className: "github",
    size: "large",
    shape: "round",
    icon: /*#__PURE__*/react_default.a.createElement(icons_GithubFilled, null),
    style: {
      margin: '0 16px'
    }
  }, /*#__PURE__*/react_default.a.createElement("a", {
    href: "https://github.com/dazejs/daze",
    target: "_blank"
  }, " GITHUB ")))));
});
// EXTERNAL MODULE: ./src/components/footer/index.tsx
var footer = __webpack_require__(435);

// CONCATENATED MODULE: ./src/assets/superman.png
/* harmony default export */ var superman = (__webpack_require__.p + "4f8c69336eb4a867e08a05963b650af0.png");
// EXTERNAL MODULE: ./node_modules/highlight.js/lib/highlight.js
var highlight = __webpack_require__(438);
var highlight_default = /*#__PURE__*/__webpack_require__.n(highlight);

// EXTERNAL MODULE: ./node_modules/highlight.js/lib/languages/bash.js
var bash = __webpack_require__(439);
var bash_default = /*#__PURE__*/__webpack_require__.n(bash);

// EXTERNAL MODULE: ./node_modules/highlight.js/styles/atom-one-dark.css
var atom_one_dark = __webpack_require__(440);

// CONCATENATED MODULE: ./src/container/home/index.tsx










highlight_default.a.registerLanguage('bash', bash_default.a);
var Content = layout_default.a.Content;
/* harmony default export */ var container_home = __webpack_exports__["default"] = (function () {
  Object(react["useEffect"])(() => {
    highlight_default.a.initHighlightingOnLoad();
  }, []);
  return /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement(layout_default.a, {
    className: "home-layout"
  }, /*#__PURE__*/react_default.a.createElement(Content, null, /*#__PURE__*/react_default.a.createElement(components_banner, null), /*#__PURE__*/react_default.a.createElement("div", {
    className: "home-content"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "section-1"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "items"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "tit"
  }, "\u9AD8\u6269\u5C55\u6027"), /*#__PURE__*/react_default.a.createElement("p", {
    className: "con"
  }, "\u5229\u7528\u88C5\u9970\u5668\u4E0E IOC \u5BB9\u5668\u7684\u80FD\u529B\uFF0C\u521B\u5EFA\u4E86\u4E00\u4E2A\u975E\u5E38\u5927\u5F3A\u7684\u6269\u5C55\u6A21\u5F0F - \u63D0\u4F9B\u8005\uFF0C\u53EF\u4EE5\u5229\u7528\u5B83\u505A\u4F60\u4EFB\u4F55\u60F3\u505A\u7684\u4E8B")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "tit"
  }, "\u9AD8\u6027\u80FD"), /*#__PURE__*/react_default.a.createElement("p", {
    className: "con"
  }, "\u5168\u65B0\u7684\u67B6\u6784\u8BBE\u8BA1\uFF0C\u4F7F\u4E4B\u5177\u6709\u524D\u6240\u672A\u6709\u7684\u9AD8\u6027\u80FD\u3002")), /*#__PURE__*/react_default.a.createElement("div", {
    className: "item"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "tit"
  }, "\u7075\u6D3B\u6613\u7528"), /*#__PURE__*/react_default.a.createElement("p", {
    className: "con"
  }, "\u4F7F\u7528\u6700\u65B0\u7684 JavaScript \u7279\u6027\u4E0E\u6210\u719F\u7684\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u521B\u5EFA\u6700\u7075\u6D3B\u4E0E\u6613\u7528\u7684 API\u3002")))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "section-2"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "h2"
  }, "\u5148\u7779\u4E3A\u5FEB"), /*#__PURE__*/react_default.a.createElement("p", {
    className: "con"
  }, /*#__PURE__*/react_default.a.createElement("img", {
    className: "img",
    src: superman
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "section-3"
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: "h2"
  }, "\u5F00\u59CB\u5427\uFF01"), /*#__PURE__*/react_default.a.createElement("div", {
    className: "code-box"
  }, /*#__PURE__*/react_default.a.createElement("pre", null, /*#__PURE__*/react_default.a.createElement("code", {
    className: "hljs bash"
  }, `  $ npm init @dazejs/app project-name

  ? Which package manager you wany? (Use arrow keys)
  ❯ npm
    yarn
    cnpm
`))))), /*#__PURE__*/react_default.a.createElement(footer["a" /* default */], null))));
});

/***/ })

}]);