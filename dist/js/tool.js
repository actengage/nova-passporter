/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_SecretToken__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_SecretToken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_SecretToken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Tool__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Tool___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Tool__);



function shouldShowSecretToken(response) {
  var config = response.config,
      data = response.data;


  return !!(config.url === '\/nova-api\/passport-clients' && data && data.resource && data.resource.secret);
}

function createModal(Vue, resource) {
  var SecretTokenComponent = Vue.extend(__WEBPACK_IMPORTED_MODULE_0__components_SecretToken___default.a);

  var el = document.createElement('div');

  document.body.append(el);

  var component = new SecretTokenComponent({
    propsData: {
      resource: resource
    }
  }).$mount(el);

  component.$on('close', function () {
    component.$destroy();
    component.$el.parentNode.removeChild(component.$el);
  });

  component.$on('copy', function () {
    Nova.success('Secret copied to clipboard!');
  });

  return component;
}

Nova.booting(function (Vue, router, store) {
  router.addRoutes([{
    name: 'passporter',
    path: '/passporter',
    component: __WEBPACK_IMPORTED_MODULE_1__components_Tool___default.a
  }]);

  Nova.request().interceptors.response.use(function (response) {
    // This feature will show the plain secret token if it exists.
    if (shouldShowSecretToken(response)) {
      createModal(Vue, response.data.resource);
    }

    return response;
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */
var __vue_script__ = __webpack_require__(9)
/* template */
var __vue_template__ = __webpack_require__(10)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/SecretToken.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-045330e4", Component.options)
  } else {
    hotAPI.reload("data-v-045330e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        resource: {
            type: Object,
            required: true
        }
    },
    methods: {
        copyToClipboard: function copyToClipboard() {
            var blob = new Blob([this.resource.secret], { type: 'text/plain' });

            var data = [new ClipboardItem({ 'text/plain': blob })];

            navigator.clipboard.write(data);

            this.$emit('copy', this.resource.secret);
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.$nextTick(function () {
            return _this.copyToClipboard();
        });
    }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("modal", [
    _c(
      "div",
      {
        staticClass: "bg-40 rounded-lg shadow-lg overflow-hidden p-8",
        staticStyle: { width: "800px" }
      },
      [
        _c("h2", { staticClass: "mb-3" }, [_vm._v("Passport Client Secret")]),
        _vm._v(" "),
        _c("p", { staticClass: "mb-2" }, [
          _vm._v(
            "The secret token will never be shown again. Save this token for your records:"
          )
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "flex w-full bg-black text-white rounded",
            attrs: { type: "button" },
            on: { click: _vm.copyToClipboard }
          },
          [
            _c(
              "pre",
              {
                staticClass: "p-3 flex-1 block text-left",
                staticStyle: {
                  "border-top-right-radius": "0",
                  "border-bottom-right-radius": "0"
                }
              },
              [_c("code", [_vm._v(_vm._s(_vm.resource.secret))])]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "flex items-center" }, [
              _c(
                "div",
                {
                  staticClass: "p-3 bg-black rounded",
                  staticStyle: {
                    "border-top-left-radius": "0",
                    "border-bottom-left-radius": "0",
                    fill: "white"
                  }
                },
                [
                  _c(
                    "svg",
                    {
                      staticStyle: { width: "1em" },
                      attrs: { viewBox: "0 0 20 20" }
                    },
                    [
                      _c("path", {
                        attrs: {
                          d:
                            "M7.03 2.6a3 3 0 0 1 5.94 0L15 3v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h1V3l2.03-.4zM5 6H4v12h12V6h-1v1H5V6zm5-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                        }
                      })
                    ]
                  )
                ]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c("small", [
          _c("em", [
            _vm._v("Why am I seeing this notification? "),
            _c(
              "a",
              {
                attrs: {
                  href:
                    "https://laravel.com/docs/8.x/passport#client-secret-hashing"
                }
              },
              [_vm._v("Learn about client secret hashing")]
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "flex" }, [
          _c("div", { staticClass: "ml-auto" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-default btn-primary",
                attrs: {
                  id: "confirm-ok-button",
                  "data-testid": "ok-button",
                  type: "button"
                },
                on: {
                  click: function($event) {
                    return _vm.$emit("close")
                  }
                }
              },
              [
                _vm._v(
                  "\n                    " +
                    _vm._s(_vm.__("Ok")) +
                    "\n                "
                )
              ]
            )
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-045330e4", module.exports)
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var normalizeComponent = __webpack_require__(8)
/* script */
var __vue_script__ = __webpack_require__(16)
/* template */
var __vue_template__ = __webpack_require__(17)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("44d58878", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tool.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tool.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Scoped Styles */\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(15)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InstallChecklist__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InstallChecklist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__InstallChecklist__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: { InstallChecklist: __WEBPACK_IMPORTED_MODULE_0__InstallChecklist___default.a },

    metaInfo: function metaInfo() {
        return {
            title: 'Passporter'
        };
    },
    mounted: function mounted() {
        //
    }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_c("install-checklist")], 1)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(19)
}
var normalizeComponent = __webpack_require__(8)
/* script */
var __vue_script__ = __webpack_require__(21)
/* template */
var __vue_template__ = __webpack_require__(22)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/InstallChecklist.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-327a5f36", Component.options)
  } else {
    hotAPI.reload("data-v-327a5f36", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(14)("09c8874e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-327a5f36\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./InstallChecklist.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-327a5f36\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./InstallChecklist.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Scoped Styles */\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InstallChecklistIcon__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InstallChecklistIcon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__InstallChecklistIcon__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        InstallChecklistIcon: __WEBPACK_IMPORTED_MODULE_0__InstallChecklistIcon___default.a
    },
    mounted: function mounted() {
        this.checkInstallation();
    },

    methods: {
        checkInstallation: function checkInstallation() {
            var _this = this;

            this.loading = true;

            return Nova.request().get('/nova-vendor/passporter/installation').then(function (_ref) {
                var data = _ref.data;

                _this.installation = data;

                return data;
            }).finally(function () {
                return _this.loading = false;
            });
        },
        createKeys: function createKeys() {
            var _this2 = this;

            this.creatingKeys = true;

            return Nova.request().post('/nova-vendor/passporter/installation/keys').then(function (_ref2) {
                var data = _ref2.data;
                return _this2.installation = data;
            }).finally(function () {
                _this2.creatingKeys = false;

                Nova.success(_this2.__('Passport keys created!'));
            });
        },
        deleteKeys: function deleteKeys() {
            var _this3 = this;

            if (!confirm(this.__('Are you sure you want to delete the encryption keys? Passport will not function without encryption keys.'))) {
                return;
            }

            this.deletingKeys = true;

            return Nova.request().delete('/nova-vendor/passporter/installation/keys').then(function (_ref3) {
                var data = _ref3.data;
                return _this3.installation = data;
            }).finally(function () {
                _this3.deletingKeys = false;

                Nova.success(_this3.__('Passport keys deleted!'));
            });
        },
        deletePersonalAccessClient: function deletePersonalAccessClient() {
            var _this4 = this;

            if (!confirm(this.__('Are you sure you want to delete the Password Client?'))) {
                return;
            }

            this.deletingPersonalAccessClient = true;

            return Nova.request().delete('/nova-vendor/passporter/installation/personal-access-client').then(function (_ref4) {
                var data = _ref4.data;
                return _this4.installation = data;
            }).finally(function () {
                _this4.deletingPersonalAccessClient = false;

                Nova.success(_this4.__('Personal Access Client deleted!'));
            });
        },
        createPasswordClient: function createPasswordClient() {
            var _this5 = this;

            this.creatingPasswordClient = true;

            return Nova.request().post('/nova-vendor/passporter/installation/password-client').then(function (_ref5) {
                var data = _ref5.data;
                return _this5.installation = data;
            }).finally(function () {
                _this5.creatingPasswordClient = false;

                Nova.success(_this5.__('Password client created!'));
            });
        },
        deletePasswordClient: function deletePasswordClient() {
            var _this6 = this;

            if (!confirm(this.__('Are you sure you want to delete the Password Client?'))) {
                return;
            }

            this.deletingPasswordClient = true;

            return Nova.request().delete('/nova-vendor/passporter/installation/password-client').then(function (_ref6) {
                var data = _ref6.data;
                return _this6.installation = data;
            }).finally(function () {
                _this6.deletingPasswordClient = false;

                Nova.success(_this6.__('Password Client deleted!'));
            });
        },
        createPersonalAccessClient: function createPersonalAccessClient() {
            var _this7 = this;

            this.creatingPersonalAccessClient = true;

            return Nova.request().post('/nova-vendor/passporter/installation/personal-access-client').then(function (_ref7) {
                var data = _ref7.data;
                return _this7.installation = data;
            }).finally(function () {
                _this7.creatingPersonalAccessClient = false;

                Nova.success(_this7.__('Personal access client created!'));
            });
        },
        installClientUuidMigration: function installClientUuidMigration() {
            var _this8 = this;

            this.installingClientUuidMigration = true;

            return Nova.request().post('/nova-vendor/passporter/installation/client-uuids').then(function (_ref8) {
                var data = _ref8.data;
                return _this8.installation = data;
            }).finally(function () {
                _this8.installingClientUuidMigration = false;

                Nova.success(_this8.__('Client uuids migrated!'));
            });
        },
        publishMigrations: function publishMigrations() {
            var _this9 = this;

            this.publishingMigrations = true;

            return Nova.request().post('/nova-vendor/passporter/installation/migrations').then(function (_ref9) {
                var data = _ref9.data;
                return _this9.installation = data;
            }).finally(function () {
                _this9.publishingMigrations = false;

                Nova.success(_this9.__('Database migrations published!'));
            });
        },
        unpublishMigrations: function unpublishMigrations() {
            var _this10 = this;

            this.unpublishingMigrations = true;

            return Nova.request().delete('/nova-vendor/passporter/installation/migrations').then(function (_ref10) {
                var data = _ref10.data;
                return _this10.installation = data;
            }).finally(function () {
                _this10.unpublishingMigrations = false;

                Nova.success(_this10.__('Database migrations deleted!'));
            });
        },
        publishConfig: function publishConfig() {
            var _this11 = this;

            this.publishingConfig = true;

            return Nova.request().post('/nova-vendor/passporter/installation/config').then(function (_ref11) {
                var data = _ref11.data;
                return _this11.installation = data;
            }).finally(function () {
                _this11.publishingConfig = false;

                Nova.success(_this11.__('Passport config published!'));
            });
        },
        unpublishConfig: function unpublishConfig() {
            var _this12 = this;

            this.unpublishingConfig = true;

            return Nova.request().delete('/nova-vendor/passporter/installation/config').then(function (_ref12) {
                var data = _ref12.data;
                return _this12.installation = data;
            }).finally(function () {
                _this12.unpublishingConfig = false;

                Nova.success(_this12.__('Passport config deleted!'));
            });
        },
        rollbackMigrations: function rollbackMigrations() {
            var _this13 = this;

            if (!confirm(this.__('Are you sure you want to rollback the Passport migrations? This will permenantly deleted all the Passport data from the database.'))) {
                return;
            }

            this.rollingbackMigrations = true;

            return Nova.request().delete('/nova-vendor/passporter/installation/migrate').then(function (_ref13) {
                var data = _ref13.data;
                return _this13.installation = data;
            }).finally(function () {
                _this13.rollingbackMigrations = false;

                Nova.success(_this13.__('Database migrations rolledback!'));
            });
        },
        runMigrations: function runMigrations() {
            var _this14 = this;

            this.runningMigrations = true;

            return Nova.request().post('/nova-vendor/passporter/installation/migrate').then(function (_ref14) {
                var data = _ref14.data;
                return _this14.installation = data;
            }).finally(function () {
                _this14.runningMigrations = false;

                Nova.success(_this14.__('Database migrations ran!'));
            });
        },
        uninstallPassport: function uninstallPassport() {
            var _this15 = this;

            this.uninstallingPassport = true;

            return Nova.request().delete('/nova-vendor/passporter/installation').then(function (_ref15) {
                var data = _ref15.data;
                return _this15.installation = data;
            }).finally(function () {
                _this15.uninstallingPassport = false;

                Nova.success(_this15.__('Passport uninstalled!'));
            });
        }
    },
    data: function data() {
        return {
            deletingKeys: false,
            deletingPasswordClient: false,
            deletingPersonalAccessClient: false,
            creatingKeys: false,
            creatingPasswordClient: false,
            creatingPersonalAccessClient: false,
            installingClientUuidMigration: false,
            installation: null,
            loading: true,
            publishingConfig: false,
            publishingMigrations: false,
            rollingbackMigrations: false,
            runningMigrations: false,
            uninstallingPassport: false,
            unpublishingConfig: false,
            unpublishingMigrations: false
        };
    }
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "loading-view",
    { attrs: { loading: _vm.loading } },
    [
      _vm.installation
        ? [
            _c("card", { staticClass: "p-4" }, [
              _c("h1", { staticClass: "mb-3" }, [
                _vm._v(_vm._s(_vm.__("Setup Guide")))
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "mb-2" }, [
                _vm._v(
                  _vm._s(
                    _vm.__(
                      "This will guide you through configuring the various Passport components that are required to make OAuth requests."
                    )
                  )
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex items-start p-3" },
                [
                  _c("install-checklist-icon", {
                    attrs: { valid: _vm.installation.has_published_config }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h3", { staticClass: "font-normal mb-2" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Publish Config")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      !_vm.installation.has_published_config
                        ? _c("p", { staticClass: "mb-2" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__(
                                  "This will publish the Passport database migrations."
                                )
                              )
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.installation.has_published_config
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.publishingConfig },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.publishConfig.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Publish Config")) +
                                  "\n                    "
                              )
                            ]
                          )
                        : _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.unpublishingConfig },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.unpublishConfig.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Delete Config")) +
                                  "\n                    "
                              )
                            ]
                          )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex items-start p-3" },
                [
                  _c("install-checklist-icon", {
                    attrs: { valid: _vm.installation.has_ran_migrations }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h3", { staticClass: "font-normal mb-2" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Run Migrations")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      !_vm.installation.has_ran_migrations
                        ? _c("p", { staticClass: "mb-2" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__(
                                  "This will publish and run the Passport migrations."
                                )
                              )
                            )
                          ])
                        : _c("div", [
                            _c("em", [
                              _vm._v(
                                _vm._s(
                                  _vm.__("Your database has been migrated!")
                                )
                              )
                            ])
                          ]),
                      _vm._v(" "),
                      !_vm.installation.has_ran_migrations
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.runningMigrations },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.runMigrations.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Run Migrations")) +
                                  "\n                    "
                              )
                            ]
                          )
                        : _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.rollingbackMigrations },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.rollbackMigrations.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Rollback Migrations")) +
                                  "\n                    "
                              )
                            ]
                          )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex items-start p-3" },
                [
                  _c("install-checklist-icon", {
                    attrs: {
                      valid: !!(
                        _vm.installation.public_key_exists &&
                        _vm.installation.private_key_exists
                      )
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h3", { staticClass: "font-normal mb-2" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Create public and private keys")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      !!(
                        _vm.installation.public_key_exists &&
                        _vm.installation.private_key_exists
                      )
                        ? _c("div", [
                            _c(
                              "code",
                              { staticClass: "bg-80 text-white block mb-1" },
                              [_vm._v(_vm._s(_vm.installation.public_key_path))]
                            ),
                            _vm._v(" "),
                            _c(
                              "code",
                              { staticClass: "bg-80 text-white block" },
                              [
                                _vm._v(
                                  _vm._s(_vm.installation.private_key_path)
                                )
                              ]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      !(
                        _vm.installation.public_key_exists &&
                        _vm.installation.private_key_exists
                      )
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.creatingKeys },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.createKeys.apply(null, arguments)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Create Keys")) +
                                  "\n                    "
                              )
                            ]
                          )
                        : _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.deletingKeys },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.deleteKeys.apply(null, arguments)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Delete Keys")) +
                                  "\n                    "
                              )
                            ]
                          )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex items-start p-3" },
                [
                  _c("install-checklist-icon", {
                    attrs: { valid: !!_vm.installation.password_client }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h3", { staticClass: "font-normal mb-2" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Create password client")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _vm.installation.password_client
                        ? _c("div", [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.installation.password_client.name) +
                                "\n                    "
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.installation.password_client
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: {
                                disabled: !_vm.installation.has_ran_migrations,
                                processing: _vm.creatingPasswordClient
                              },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.createPasswordClient.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Create Password Client")) +
                                  "\n                    "
                              )
                            ]
                          )
                        : _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.deletingPasswordClient },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.deletePasswordClient.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Delete Password Client")) +
                                  "\n                    "
                              )
                            ]
                          )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex items-start p-3" },
                [
                  _c("install-checklist-icon", {
                    attrs: { valid: !!_vm.installation.personal_access_client }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h3", { staticClass: "font-normal mb-2" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Create personal access client")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _vm.installation.personal_access_client
                        ? _c("div", [
                            _vm._v(
                              "\n                        " +
                                _vm._s(
                                  _vm.installation.personal_access_client.name
                                ) +
                                "\n                    "
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.installation.personal_access_client
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: {
                                disabled: !_vm.installation.has_ran_migrations,
                                processing: _vm.creatingPersonalAccessClient
                              },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.createPersonalAccessClient.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(
                                    _vm.__("Create Personal Access Client")
                                  ) +
                                  "\n                    "
                              )
                            ]
                          )
                        : _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: {
                                processing: _vm.deletingPersonalAccessClient
                              },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.deletePersonalAccessClient.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(
                                    _vm.__("Delete Personal Access Client")
                                  ) +
                                  "\n                    "
                              )
                            ]
                          )
                    ],
                    1
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("card", { staticClass: "p-4 mt-3" }, [
              _c("h1", { staticClass: "mb-3" }, [
                _vm._v(_vm._s(_vm.__("Optional")))
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex items-start p-3" },
                [
                  _c("install-checklist-icon", {
                    attrs: { valid: _vm.installation.has_published_migrations }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h3", { staticClass: "font-normal mb-2" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Publish Migrations")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      !_vm.installation.has_published_migrations
                        ? _c("p", { staticClass: "mb-2" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__(
                                  "This will publish the Passport database migrations."
                                )
                              )
                            )
                          ])
                        : _c("p", { staticClass: "mb-2" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__(
                                  "The Passport database migrations have been published."
                                )
                              )
                            )
                          ]),
                      _vm._v(" "),
                      !_vm.installation.has_published_migrations
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.publishingMigrations },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.publishMigrations.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Publish Migrations")) +
                                  "\n                    "
                              )
                            ]
                          )
                        : !_vm.installation.has_ran_migrations
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: { processing: _vm.unpublishingMigrations },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.unpublishMigrations.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Delete Migrations")) +
                                  "\n                    "
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "flex items-start p-3" },
                [
                  _c("install-checklist-icon", {
                    attrs: {
                      valid: !!(
                        _vm.installation.client_uuids &&
                        _vm.installation.has_ran_client_uuid_migrations
                      )
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c("h3", { staticClass: "font-normal mb-2" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(_vm.__("Install Client Uuids")) +
                            "\n                    "
                        )
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "mb-2" }, [
                        _vm._v(
                          _vm._s(
                            _vm.__(
                              "Run the required migrations required to convert the incremental id's to uuids. Caution, this will delete all existing clients. This feature is best installed before Passport is used for the first time."
                            )
                          )
                        )
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "mb-2" }, [
                        _c("em", [
                          _vm._v(
                            _vm._s(
                              _vm.__(
                                "This action can only be undone by rolling back, deleting, and re-publishing the Passport migrations."
                              )
                            )
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      !_vm.installation.has_ran_client_uuid_migrations
                        ? _c(
                            "progress-button",
                            {
                              staticClass: "btn btn-default mt-3",
                              attrs: {
                                disabled: !_vm.installation.has_ran_migrations,
                                processing: _vm.installingClientUuidMigration
                              },
                              nativeOn: {
                                click: function($event) {
                                  return _vm.installClientUuidMigration.apply(
                                    null,
                                    arguments
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.__("Install Client Uuids")) +
                                  "\n                    "
                              )
                            ]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _vm.installation.has_published_migrations ||
            _vm.installation.private_key_exists ||
            _vm.installation.public_key_exists
              ? _c("card", { staticClass: "p-3 mt-3" }, [
                  _c(
                    "div",
                    [
                      _c("h1", { staticClass: "mb-3" }, [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.__("Uninstall")) +
                            "\n                "
                        )
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "mb-2" }, [
                        _vm._v(
                          _vm._s(
                            _vm.__(
                              "Completely remove all Passport data, rollback and remove the migrations and remove the config file."
                            )
                          )
                        )
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "mb-2" }, [
                        _c("em", [
                          _vm._v(
                            _vm._s(
                              _vm.__(
                                "Note, you will still need to run the following command to completel uninstall Passport:"
                              )
                            )
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("code", { staticClass: "bg-80 text-white" }, [
                          _vm._v("composer remove laravel/passport")
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "progress-button",
                        {
                          staticClass: "btn-danger mt-3",
                          attrs: { processing: _vm.uninstallingPassport },
                          nativeOn: {
                            click: function($event) {
                              return _vm.uninstallPassport.apply(
                                null,
                                arguments
                              )
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm.__("Uninstall Passport")) +
                              "\n                "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ])
              : _vm._e()
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-327a5f36", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(8)
/* script */
var __vue_script__ = __webpack_require__(24)
/* template */
var __vue_template__ = __webpack_require__(25)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/InstallChecklistIcon.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bda4c762", Component.options)
  } else {
    hotAPI.reload("data-v-bda4c762", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        valid: Boolean
    }
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.valid
    ? _c(
        "svg",
        {
          staticClass: "mr-6 fill-success",
          staticStyle: { width: "1.5em" },
          attrs: { viewBox: "0 0 20 20" }
        },
        [_c("path", { attrs: { d: "M0 11l2-2 5 5L18 3l2 2L7 18z" } })]
      )
    : _c(
        "svg",
        {
          staticClass: "mr-6 fill-danger",
          staticStyle: { width: "1.5em" },
          attrs: { viewBox: "0 0 20 20" }
        },
        [
          _c("path", {
            attrs: {
              d:
                "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
            }
          })
        ]
      )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-bda4c762", module.exports)
  }
}

/***/ })
/******/ ]);