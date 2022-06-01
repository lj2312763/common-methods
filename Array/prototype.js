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
 * 优势：只循环一次，借助 对象的引用，快速组合tree
 * 劣势：会改变原始数据
 * 数组转换tree
 * @return {*[]}
 */
Array.prototype.arrayToTree = function () {
    const result = [];   // 存放结果集
    const itemMap = {};  //
    const items = this;
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;

        if (!itemMap[id]) {
            itemMap[id] = {
                children: [],
            }
        }

        itemMap[id] = {
            ...item,
            children: itemMap[id]['children']
        }

        const treeItem =  itemMap[id];

        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}
