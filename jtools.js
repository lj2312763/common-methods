/**
 * Created with JetBrains WebStorm.
 * Author: Jian Li
 * Date: 2017/7/12 10:07
 * desc:自己实用的方法收藏
 *  */

/**
 * 求1-num以内的质数
 * @param num
 * @returns {string}
 */
export const findZhiShu = (num) => {
		let str = '';
		for (let i = 1; i <= num; ++i) {
			let flag = true;
			for (let j = 2; j < i; ++j) {
				if (i % j === 0) {//只要能被整除的一次，他就不是质数
					flag = false;
					break;
				}
			}
			if (flag && i !== 2) {
				str += i + (i === num ? '' : ',');
			}
		}
		return str;
	}
;

/**
 * 找出书中中质数
 * @param {Array}arr
 * @returns {*|Array}
 */

export const get_primes = (arr) => {
		return arr.filter(function (e, idx) {
			let flag = true;
			for (let i = 2; i < e; ++i) {
				if (e % i === 0) {
					flag = false;
					break;
				}
			}
			if (e === 1 || e === 0) {
				flag = false;
			}
			return flag
		})
	}
;

/**
 * 转换成百分数
 * @param {Number}num 要转换的值
 * @param {Number}dot 保留的小数的位数
 * @param {*} errRetuen:传入的数字如果不符合要求默认返回值
 * @returns {String}:返回带有百分号的字符串
 * */
export const percentageNumber = (num, dot = 0, errRetuen = 0) => {
		//不能转换为有限数字时，返回默认返回值
		if (!isFinite(num)) {
			return defaultReturn;
		}
		return `${ parseFloat(num).toFixed(dot)}%`
	}
;
/**
 * 获取浏览器信息
 * */
export const getBrowserInfo = () => {
		let Sys = {};
		let ua = navigator
			.userAgent
			.toLowerCase();
		let re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
		let m = ua.match(re);
		Sys.browser = m[1].replace(/version/, "'safari");
		Sys.ver = m[2];
		return Sys;
	}
;

/**
 * 比较两个对象是否相等
 * */
export const isEqualToObj = (x, y) => {
		// If both x and y are null or undefined and exactly the same
		if (x === y) {
			return true;
		}

		// If they are not strictly equal, they both need to be Objects
		if (!(x instanceof Object) || !(y instanceof Object)) {
			return false;
		}

		// They must have the exact same prototype chain, the closest we can do is test
		// the constructor.
		if (x.constructor !== y.constructor) {
			return false;
		}

		for (let p in x) {
			// Inherited properties were tested using x.constructor === y.constructor
			if (x.hasOwnProperty(p)) {
				// Allows comparing x[ p ] and y[ p ] when set to undefined
				if (!y.hasOwnProperty(p)) {
					return false;
				}

				// If they have the same strict value or identity then they are equal
				if (x[p] === y[p]) {
					continue;
				}

				// Numbers, Strings, Functions, Booleans must be strictly equal
				if (typeof (x[p]) !== "object") {
					return false;
				}

				// Objects and Arrays must be tested recursively
				if (!_isEqualToObj(x[p], y[p])) {
					return false;
				}
			}
		}

		for (p in y) {
			// allows x[ p ] to be set to undefined
			if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
				return false;
			}
		}
		return true;
	}
;

/**
 * 千分位
 * @param {Number|String}s:要转换为千分位的字符或者数字
 * @returns {string}：转换过后的字符串
 */
export const toThousands = (s) =>
{
	if (!s) {
		return
	}
	let _s = s.toString().split('.');
	let reg = /\B(?=(\d{3})+(?!\d))/g;
	_s[0] = _s[0].replace(reg, ',');
	return _s.join('.')
}
;

/**
 * 数组去重
 * @param {Array}arr:要去重的数组
 * @returns {Array}
 */
export const unRepeat1 = (arr) => {
	let _arr = [];
	for (let i = 0, len = arr.length; i < len; ++i) {
		if (_arr.indexOf(arr[i]) === -1) {
			_arr.push(arr[i])
		}
	}
	return _arr
}
/**
 * 数组去重,使用ES6 新特性set
 * @param {Array}arr:要去重的数组
 * @returns {Array}
 */
export const unRepeat2 = (arr) => {
	return Array.from(new Set(arr));
}
/**
 * 数组去重,使用ES6 新特性filter函数
 * @param {Array}arr:要去重的数组
 * @returns {Array}
 */
export const unRepeat3 = (arr) => {
		return arr.filter((e, i, self) => {
			return self.indexOf(e) === i
		}
	)
	}
;

/**
 * 字符串中的字符的数量
 * @param {String}s
 * @return{Object}
 */
export const chartsCount = (s) => {
		let index = 0;
		let obj = {};
		while (index < s.length) {
			obj[s[index]] = obj[s[index]] !== undefined ? obj[s[index]] + 1 : 1;
			index++;
		}
		return obj
	}
;

/**
 * 找到字符串中最多的字符
 * @param {String}s
 * @returns {{count: number, chart: Array}}
 */
export const mostChart = (s) => {
		let _s = s.split('').sort().join('');
		let reg = /(\w)\1+/g;
		let count = 0;
		let chart = [];
		_s.replace(reg, function (charts, son) {
			if (charts.length > count) {
				count = charts.length;
				chart = [];
			}
			if (charts.length === count) {
				chart.push(son)
			}
		});
		return {count, chart}
	}
;
/**
 * 字符串或者数组首字母大写
 * @param {String|Array}arr
 * @returns {U[]|Array}
 */
export const normalize = (arr) => {
		return [].concat(arr).map(function (e, i) {
			return e[0].toUpperCase() + e.substring(1).toLowerCase();
		})
	}
;

/**
 * ID生成函数的内内容重复，生成函数
 * @param {Number}len:生成ID的长度，默认为16位
 * @returns {string}：随机A-Z和0-9的默认16位字符串
 */
export function* makeUID(len = 16) {
	let n = 0;
	let arr = [];
	let count = 0;
	let index = 0;
	let offset = 0;
	let next = arr[1];
	let carrtBit = false;
	while (n < len) {//生成len位数组
		let RNum = Math.round(Math.random() * 25);//生成0-26数字
		let num = Math.round(Math.random() * 10);//生成0-10的数字
		let chart = String.fromCharCode(65 + RNum);//转换为A-Z的字符
		let el = Math.round(Math.random()) ? chart : num;//元素的每一个元素随机为数字或者字母
		arr.push(el);
		n++;
	}
	arr.reverse();
	//验证是否进位的函数，修改原数组
	let carryBitFun = function (a, i) {
		if (typeof a[i] === 'string') {
			if (a[i].charCodeAt(0) >= 90) {
				carrtBit = true;
				a[i] = String.fromCharCode(65);
			} else {
				carrtBit = false;
				a[i] = String.fromCharCode(a[i].charCodeAt(0) + 1);
			}
		} else {
			a[i] = a[i].toString();
			if (a[i].charCodeAt(0) >= 57) {
				carrtBit = true;
				a[i] = String.fromCharCode(48);
			} else {
				carrtBit = false;
				a[i] = String.fromCharCode(a[i].charCodeAt(0) + 1);
			}
			a[i] = parseInt(a[i]);
		}
	};
	offset = typeof arr[0] === 'string' ? 25 : 10;
	while (count <= offset) {
		carryBitFun(arr, 0);
		++count;
		if (carrtBit) {
			count = 0;
			for (let i = 1, l = arr.length; i < l; ++i) {
				carryBitFun(arr, i);
				if (!carrtBit) {
					break
				}
			}
		}
		yield  [].concat(arr).reverse().join('');
	}

	return [].concat(arr).reverse().join('')
}


/**
 * 日期对象显示格式
 * @param fmt
 * @return {*}
 * @constructor
 */
Date.prototype.Format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * 自定义promise异步函数
 * 会自动绑定到windows对象上Promise
 */
(function (root) {

	// Store setTimeout reference so promise-polyfill will be unaffected by
	// other code modifying setTimeout (like sinon.useFakeTimers())
	var setTimeoutFunc = setTimeout;

	function noop() {
	}

	// Polyfill for Function.prototype.bind
	function bind(fn, thisArg) {
		return function () {
			fn.apply(thisArg, arguments);
		};
	}

	function Promise(fn) {
		if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
		if (typeof fn !== 'function') throw new TypeError('not a function');
		this._state = 0;
		this._handled = false;
		this._value = undefined;
		this._deferreds = [];

		doResolve(fn, this);
	}

	function handle(self, deferred) {
		while (self._state === 3) {
			self = self._value;
		}
		if (self._state === 0) {
			self._deferreds.push(deferred);
			return;
		}
		self._handled = true;
		Promise._immediateFn(function () {
			var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
			if (cb === null) {
				(self._state === 1 ? resolve : reject)(deferred.promise, self._value);
				return;
			}
			var ret;
			try {
				ret = cb(self._value);
			} catch (e) {
				reject(deferred.promise, e);
				return;
			}
			resolve(deferred.promise, ret);
		});
	}

	function resolve(self, newValue) {
		try {
			// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
			if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
			if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
				var then = newValue.then;
				if (newValue instanceof Promise) {
					self._state = 3;
					self._value = newValue;
					finale(self);
					return;
				} else if (typeof then === 'function') {
					doResolve(bind(then, newValue), self);
					return;
				}
			}
			self._state = 1;
			self._value = newValue;
			finale(self);
		} catch (e) {
			reject(self, e);
		}
	}

	function reject(self, newValue) {
		self._state = 2;
		self._value = newValue;
		finale(self);
	}

	function finale(self) {
		if (self._state === 2 && self._deferreds.length === 0) {
			Promise._immediateFn(function () {
				if (!self._handled) {
					Promise._unhandledRejectionFn(self._value);
				}
			});
		}

		for (var i = 0, len = self._deferreds.length; i < len; i++) {
			handle(self, self._deferreds[i]);
		}
		self._deferreds = null;
	}

	function Handler(onFulfilled, onRejected, promise) {
		this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
		this.onRejected = typeof onRejected === 'function' ? onRejected : null;
		this.promise = promise;
	}

	/**
	 * Take a potentially misbehaving resolver function and make sure
	 * onFulfilled and onRejected are only called once.
	 *
	 * Makes no guarantees about asynchrony.
	 */
	function doResolve(fn, self) {
		var done = false;
		try {
			fn(function (value) {
				if (done) return;
				done = true;
				resolve(self, value);
			}, function (reason) {
				if (done) return;
				done = true;
				reject(self, reason);
			});
		} catch (ex) {
			if (done) return;
			done = true;
			reject(self, ex);
		}
	}

	Promise.prototype['catch'] = function (onRejected) {
		return this.then(null, onRejected);
	};

	Promise.prototype.then = function (onFulfilled, onRejected) {
		var prom = new (this.constructor)(noop);

		handle(this, new Handler(onFulfilled, onRejected, prom));
		return prom;
	};

	Promise.all = function (arr) {
		var args = Array.prototype.slice.call(arr);

		return new Promise(function (resolve, reject) {
			if (args.length === 0) return resolve([]);
			var remaining = args.length;

			function res(i, val) {
				try {
					if (val && (typeof val === 'object' || typeof val === 'function')) {
						var then = val.then;
						if (typeof then === 'function') {
							then.call(val, function (val) {
								res(i, val);
							}, reject);
							return;
						}
					}
					args[i] = val;
					if (--remaining === 0) {
						resolve(args);
					}
				} catch (ex) {
					reject(ex);
				}
			}

			for (var i = 0; i < args.length; i++) {
				res(i, args[i]);
			}
		});
	};

	Promise.resolve = function (value) {
		if (value && typeof value === 'object' && value.constructor === Promise) {
			return value;
		}

		return new Promise(function (resolve) {
			resolve(value);
		});
	};

	Promise.reject = function (value) {
		return new Promise(function (resolve, reject) {
			reject(value);
		});
	};

	Promise.race = function (values) {
		return new Promise(function (resolve, reject) {
			for (var i = 0, len = values.length; i < len; i++) {
				values[i].then(resolve, reject);
			}
		});
	};

	// Use polyfill for setImmediate for performance gains
	Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) {
			setImmediate(fn);
		}) ||
		function (fn) {
			setTimeoutFunc(fn, 0);
		};

	Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
		if (typeof console !== 'undefined' && console) {
			console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
		}
	};

	/**
	 * Set the immediate function to execute callbacks
	 * @param fn {function} Function to execute
	 * @deprecated
	 */
	Promise._setImmediateFn = function _setImmediateFn(fn) {
		Promise._immediateFn = fn;
	};

	/**
	 * Change the function to execute on unhandled rejection
	 * @param {function} fn Function to execute on unhandled rejection
	 * @deprecated
	 */
	Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
		Promise._unhandledRejectionFn = fn;
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = Promise;
	} else if (!root.Promise) {
		root.Promise = Promise;
	}

})(this);


/**
 * 自定义数组递归修改元素属性方法
 * @param {Array}groups:要被递归循环的数据
 * @return {Array}
 */
export const convertGroup = (groups) => {
	if (!groups) {
		return [];
	}

	return groups.map(group => {
		return {
			label: group.name,
			value: group.id,
			key: group.id,
			main: group.main,
			type: group.name,
			children: !group.children ? null : convertGroup(group.children)
		}
	})
};
