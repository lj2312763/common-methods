/**
 * 构造对象的prototype 方法
 * @return {[null]}
 */
//################ 数组去重#################
Array.prototype.unique = function () {
	this.sort();
	let re = [this[0]];
	for (let i = 1; i < this.length; i++) {
		if (this[i] !== re[re.length - 1]) {
			re.push(this[i]);
		}
	}
	return re;
};


/**
 * 两个数组交集
 * @param {Array}b:要与之交集的数组
 * @return {null[]}：返回结果，有去重方法直接去重，否则返回交集之后去重的数组
 */
Array.prototype.intersect = function(b) {
	let result = [];
	let a = this;
	for(let i = 0; i < b.length; i ++) {
		let temp = b[i];
		for(let j = 0; j < a.length; j ++) {
			if(temp === a[j]) {
				result.push(temp);
				break;
			}
		}
	}
	return result.unique?result.unique():result;
};


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
};

