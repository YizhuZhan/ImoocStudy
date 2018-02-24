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

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


{
    console.log(503); //二进制以0b开头
    console.log(503); //八进制以0o开头
}

{
    //使用频率不高，了解有这两个及其使用场景即可
    console.log(Number.isFinite(NaN)); //false，因为首先本身就不是一个数
    console.log(Number.isFinite(15)); //true
    console.log(Number.isFinite('true' / 0)); //false
    console.log(Number.isNaN(0)); //false
    console.log(Number.isNaN(NaN)); //true
}

{
    //常用
    console.log(Number.isInteger(25)); //true
    console.log(Number.isInteger(25.0)); //true   notice this case !!!!!
    console.log(Number.isInteger(25.1)); //false
    console.log(Number.isInteger('25')); //false
}

{
    //判断一个数是否在(-2^53~2^53)的开区间内
    console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER); //Number的最大上限，和最小下限,9007199254740991 -9007199254740991
    console.log(Number.isSafeInteger(10)); //true
    console.log(Number.isSafeInteger('a')); //false
}

{
    //判断小数的整数部分并返回，在ES5中可以通过Math.floor或者Math.ceil
    console.log(Math.trunc(4.1)); //4
    console.log(Math.trunc(4.9)); //4
}

{
    //判断一个数是整数、负数还是0，还是非数字（转化也转化不成数字的），有四种可能取值：1,0,-1,NaN
    console.log(Math.sign(-5)); //-1
    console.log(Math.sign(0)); //0
    console.log(Math.sign(5)); //1
    console.log(Math.sign('50')); //1,把'50'的字符串进行转换，转为了50再进行判断
    console.log(Math.sign('foo')); //NaN
}

{
    //立方根
    console.log(Math.cbrt(-1)); //-1
    console.log(Math.cbrt(8)); //2
}

{
    /**
     * 补充ES6中提供的其它方法：如三角函数方法，对数方法等...可以自行查询和学习
     */
}

/***/ })
/******/ ]);