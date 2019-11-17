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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./webpack-src/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./webpack-src/login.js":
/*!******************************!*\
  !*** ./webpack-src/login.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _navtoggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navtoggle */ \"./webpack-src/navtoggle.js\");\n/* harmony import */ var _navtoggle__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_navtoggle__WEBPACK_IMPORTED_MODULE_0__);\n\nvar subbut = document.querySelector('#subbut');\n\nfunction processLogin(e) {\n  e.preventDefault();\n  subbut.disabled = true;\n  subbut.innerHTML = '<img src=\"./assets/blocks-spinner.gif\" style=\"width:2rem;\" alt=\"Loading...\"/> Login';\n  var email = document.querySelector('#email').value.trim();\n  var password = document.querySelector('#password').value;\n  var fd = new FormData();\n  fd.append('email', email);\n  fd.append('password', password);\n\n  function responseHandler() {\n    console.log(this.response);\n    var resp = JSON.parse(this.response);\n\n    if (resp.success) {\n      window.location.replace('index.php');\n    } else if (resp.errors) {\n      flashError(resp.errors);\n      setTimeout(function () {\n        subbut.disabled = false;\n        subbut.innerHTML = 'Login';\n      }, 5000);\n    }\n  }\n\n  function errorHandler() {\n    console.log('Error!');\n  }\n\n  var xhr = new XMLHttpRequest();\n  xhr.addEventListener('load', responseHandler);\n  xhr.addEventListener('error', errorHandler);\n  xhr.open('POST', './proc/processLogin.php', true);\n  xhr.send(fd);\n\n  function flashError(msgs) {\n    var errbox = document.querySelector('.errbox');\n    msgs.forEach(function (msg) {\n      errbox.insertAdjacentHTML('beforeend', \"\\n            <p><i class=\\\"fa fa-exclamation-triangle\\\"></i> \".concat(msg, \"</p>\\n            \"));\n    });\n    errbox.classList.add('show');\n    setTimeout(function () {\n      errbox.classList.remove('show');\n      errbox.innerHTML = null;\n    }, 5000);\n  }\n}\n\nsubbut.addEventListener('click', processLogin);\n\n//# sourceURL=webpack:///./webpack-src/login.js?");

/***/ }),

/***/ "./webpack-src/navtoggle.js":
/*!**********************************!*\
  !*** ./webpack-src/navtoggle.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var topicsLink = document.querySelector('.topics-link');\nvar topicsPane = document.querySelector('.topics-pane');\ntopicsLink.addEventListener('click', function () {\n  topicsPane.classList.toggle('show');\n});\n\n//# sourceURL=webpack:///./webpack-src/navtoggle.js?");

/***/ })

/******/ });