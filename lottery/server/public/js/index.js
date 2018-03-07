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


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

{
    //创建Set: 1.
    var list = new Set();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(3);
    console.log(list); //Set(3) {1, 2, 3}
    console.log(list.size); //3
}

{
    //创建Set: 2.
    var arr = [1, 2, 3, 4, 2, '2'];
    var _list = new Set(arr);
    console.log(_list); //Set(5) {1, 2, 3, 4, "2"}
    console.log(_list.size); //5
}

{
    //在同一个块作用域下，chrome控制台显示的set size以最新的为主，也就是说，当size改变时，之前打印出来的set size也显示为最新的size值，应该是chrome的问题
    //has , delete , clear , add
    var _arr = ['a', 'b', 'c', 'd', 'e'];
    var _list2 = new Set(_arr);
    console.log(_list2); //Set(5) {"a", "b", "c", "d", "e"}
    console.log(_list2.delete('b'), _list2); //true ,Set(4) {"a", "c", "d", "e"}
    console.log(_list2.add('b'), _list2); //Set(5) {"a", "c", "d", "e", "b"}, Set(5) {"a", "c", "d", "e", "b"}
    console.log(_list2.has('a')); //true
    console.log(_list2.clear(), _list2); //undefined, Set(0) {}
}

{
    //遍历：1. keys();2.values()或者let of 直接遍历list,均得value; 3.entries()得key,value; 4.forEach(function...)得value
    var _arr2 = ['add', 'delete', 'clear', 'has'];
    var _list3 = new Set(_arr2);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _list3.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            console.log(key); //add delete  clear has
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = _list3.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var value = _step2.value;
            //或者let value of list
            console.log(value); //add delete  clear has
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = _list3[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _value = _step3.value;
            //或者let value of list,values()
            console.log(_value); //add delete  clear has
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = _list3.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _step4$value = _slicedToArray(_step4.value, 2),
                _key = _step4$value[0],
                _value2 = _step4$value[1];

            //或者let value of list
            console.log([_key, _value2]); //["add", "add"],["delete", "delete"], ["clear", "clear"], ["has", "has"]
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }

    _list3.forEach(function (item) {
        console.log(item); //add delete  clear has
    });
}

{
    //WeakSet:
    var weaklist = new WeakSet();
    // weaklist.add('a');//Error
    // weaklist.add(2);//Error
    var org = {};
    weaklist.add(org);
    console.log(weaklist);
    //1. WeakSet只能添加对象类型，不能添加基本类型和String
    //2.WeakSet是弱引用，只拷贝地址，而不是整个值，不检测该地址是否被垃圾回收掉了!!!!!!!!!!!!!!!!!
    //3.无size属性，无clear方法（add,delete,has方法同Set），不能遍历
}

{
    //创建Map: 1.
    var map = new Map();
    var _arr3 = ['123'];
    map.set(_arr3, 456);
    console.log(map, map.get(_arr3));
}

{
    //在同一个块作用域下，chrome控制台显示的map size以最新的为主，也就是说，当size改变时，之前打印出来的map size也显示为最新的size值，应该是chrome的问题
    //创建Map: 2.
    var _map = new Map([['a', 1], ['b', 2]]); //接收一个数组参数，数组中的每一个元素都是一个二元数组，第一个元素是key，第二个元素时value
    //map的set, delete, clear, has 方法：
    console.log(_map, _map.size); //Map(2) {"a" => 1, "b" => 2} , 2
    console.log(_map.delete('a'), _map); //true , Map(1) {"b" => 2}
    console.log(_map.has('b')); //true
    console.log(_map.clear(), _map); //undefined , Map(0) {}
    _map.set('a', 1).set('b', 2);
    console.log(_map);
    //Map的遍历与Set同：keys(), values(), entries(),forEach(function...)
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = _map.keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _key2 = _step5.value;

            console.log(_key2); // a  b
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
        for (var _iterator6 = _map.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var _value3 = _step6.value;

            console.log(_value3); // 1  2
        }
    } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
            }
        } finally {
            if (_didIteratorError6) {
                throw _iteratorError6;
            }
        }
    }

    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
        for (var _iterator7 = _map[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var item = _step7.value;
            //这个与set不同，set直接let of遍历出的是value，map是键值对构成的二元类数组，类型为具有length属性的Object
            console.log(item); //(2) ["a", 1]  其中0:'a', 1:'1', length:2 ;  (2) ["b", 2]   其中0:'b', 1:'2', length:2 ;
            // console.log(typeof item);
        }
    } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
            }
        } finally {
            if (_didIteratorError7) {
                throw _iteratorError7;
            }
        }
    }

    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = _map[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _step8$value = _slicedToArray(_step8.value, 2),
                _key3 = _step8$value[0],
                _value4 = _step8$value[1];

            console.log([_key3, _value4]); //(2) ["a", 1]  其中0:'a', 1:'1', length:2 ;  (2) ["b", 2]   其中0:'b', 1:'2', length:2 ;
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }
}

{
    //weakmap:
    var weakmap = new WeakMap();
    // weakmap.set('x',2);//Uncaught TypeError: Invalid value used as weak map key， WeakMap只能添加对象类型的key，不能添加基本类型和String
    var o = {};
    // weakmap.set(o,1);
    // console.log(weakmap,weakmap.get(o));//需要引babel.polyfill
    //1. WeakMap只能添加对象类型的key，不能添加基本类型和String
    //2.无size属性，无clear方法（add,delete,has方法同Set）；
    // 3.不能遍历
}

{
    //map 和 Array的对比：增删改查
    var _map2 = new Map();

    console.log(_map2);
    var _arr4 = [];
    //增
    _map2.set('a', 1); //map
    _map2.set('b', 2); //Map(2) {"a" => 1, "b" => 2},    0:{a=> 1} 1:{b=> 2}
    _map2.set(2, 3);
    _arr4.push({ 'a': 1 }); //1
    _arr4.push({ 'b': 2 }); //2     [ 0:{a: 1}1:{b: 2}]
    _arr4.push({ 2: 3 });
    // arr.push({'a':3});
    console.log(_map2, _arr4); //均为 0:{a:1}
    //查
    var map_exist = _map2.has('a'); //true
    var arr_exist = _arr4.find(function (item) {
        return item.a;
    }); //{a:1}  ,找到第一个满足条件的即返回，返回这个元素本身，notice !!!!!!!!!
    console.log(map_exist, arr_exist); //true {a: 1}
    //改
    _map2.set('b', 33);
    var index_modify = _arr4.findIndex(function (item) {
        return item.b;
    });
    _arr4[index_modify].b = 33;
    // arr.forEach(item => item.b ? item.b = 33 : '');// notice !!!!!!!!!!! 找到满足条件的 b 即改成33，否则什么都不做
    console.log(_map2, _arr4);
    console.log(_arr4.find(function (item) {
        return item.b;
    }));
    // //删
    // map.delete('b');
    // // console.log(arr);//查看数组确实没有delete,remove等方法，可以得到index，然后用splice(index,1)来实现
    // let index = arr.findIndex(item=>item.b);//1  notice !!!!!!!!!!,找到第一个满足条件的即返回，返回这个元素的下标，notice !!!!!!!!!
    // arr.splice(index,1);//  notice !!!!!!!!!!!!!!
    // console.log(map,arr);
}

{
    //set 和 Array 的对比：
    var set = new Set();
    var _arr5 = [];
    //增
    set.add({ t: 1 }).add({ k: 2 });
    _arr5.push({ 't': 1 });
    _arr5.push({ 'k': 2 });
    console.log(set, _arr5);
    // Array.from(set);
    //查
    var set_exist = set.has({ t: 1 }); //存的是引用类型，因此肯定是false,只为了说明set的查询用has方法，如要查询，可按下述方式保存引用地址，然后去查询是否has这个引用地址
    var _arr_exist = _arr5.find(function (item) {
        return item.t;
    });
    console.log(set_exist, _arr_exist);
    var add_temp = { x: 3 };
    set.add(add_temp);
    console.log(set.has(add_temp)); //true
    _arr5.push({ x: 3 });
    //     //改
    //     set.forEach(item => item.t ? item.t = 222 : '');
    //     arr.forEach(item => item.t ? item.t=222 : '');
    //     console.log(set,arr);
    //     console.log(arr.find(item => item.t));
    //     console.log(arr.find(item => item.x));
    //     console.log(arr.find(item => item.k));
    //     //删, set 和 Array 的删除都比较麻烦，set通过forEach找到地址，数组通过findIndex找到索引值
    //     set.delete(add_temp);//按照引用删除，可以删掉
    //     let index = arr.findIndex(item => item.x);
    //     arr.splice(index,1);
    //     console.log(set, arr);
    //     set.delete({t:222});//引用是不同的，这样删不掉，如果没保存引用还想删除set,则要按照如下方法
    //     let index1 = arr.find(item => item.x);
    //     arr.splice(index1,1);
    //     console.log(set,arr);
    //     set.forEach(item => item.t ? set.delete(item) : '');//  notice !!!!!!!!!
    //     console.log(set,arr);
}
//
// {
//     //Map,Set 与 Object 的对比
//     let obj = {}
//     let set = new Set();
//     let map = new Map();
//     //增
//     obj.x = 1;
//     set.add({x:1});
//     map.set('x',1);
//     console.info(obj,set,map);
//     // //查
//     let obj_exist = obj.hasOwnProperty('x');//true
//     let obj_exist2 = 'x' in obj;
//     let set_exist = set.forEach(item => item.x ? true :'' );//set没有find函数，这样找不到，要存对象地址let temp = {x:1}然后按照temp地址查找,undefined
//     let map_exist = map.has('x');//true
//     console.info(obj_exist,obj_exist2,set_exist,map_exist);
//     // //改
//     obj.x = 2;
//     set.forEach(item => item.x ? item.x = 2 :'');//或者存let temp = {x:1}的地址，然后直接改temp.x = 2
//     map.set('x',2);
//     console.info(obj,set,map);
//     // // 删
//     delete obj.x;
//     set.forEach(item => item.x ? set.delete(item) : '');
//     map.delete('x');
//     console.info(obj,set,map);
// }

/***/ })
/******/ ]);