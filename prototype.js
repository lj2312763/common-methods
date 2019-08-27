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