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
      for(let i = 1; i <= num; ++i) {
        let flag = true;
        for(let j = 2; j < i; ++j) {
          if(i % j === 0) {//只要能被整除的一次，他就不是质数
            flag = false;
            break;
          }
        }
        if(flag && i !== 2) {
          str += i + (i === num ? '' : ',');
        }
      }
      return str;
    }
;

/**
 * 找出数组中质数
 * @param {Array}arr
 * @returns {*|Array}
 */

export const get_primes = (arr) => {
      return arr.filter(function (e, idx) {
        let flag = true;
        for(let i = 2; i < e; ++i) {
          if(e % i === 0) {
            flag = false;
            break;
          }
        }
        if(e === 1 || e === 0) {
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
      if(!isFinite(num)) {
        return defaultReturn;
      }
      return `${ parseFloat(num).toFixed(dot) }%`
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
      Sys.browser = m[ 1 ].replace(/version/, "'safari");
      Sys.ver = m[ 2 ];
      return Sys;
    }
;

/**
 * 比较两个对象是否相等
 * */
export const isEqualToObj = (x, y) => {
      // If both x and y are null or undefined and exactly the same
      if(x === y) {
        return true;
      }

      // If they are not strictly equal, they both need to be Objects
      if(!(x instanceof Object) || !(y instanceof Object)) {
        return false;
      }

      // They must have the exact same prototype chain, the closest we can do is test
      // the constructor.
      if(x.constructor !== y.constructor) {
        return false;
      }

      for(let p in x) {
        // Inherited properties were tested using x.constructor === y.constructor
        if(x.hasOwnProperty(p)) {
          // Allows comparing x[ p ] and y[ p ] when set to undefined
          if(!y.hasOwnProperty(p)) {
            return false;
          }

          // If they have the same strict value or identity then they are equal
          if(x[ p ] === y[ p ]) {
            continue;
          }

          // Numbers, Strings, Functions, Booleans must be strictly equal
          if(typeof (x[ p ]) !== "object") {
            return false;
          }

          // Objects and Arrays must be tested recursively
          if(!_isEqualToObj(x[ p ], y[ p ])) {
            return false;
          }
        }
      }

      for(p in y) {
        // allows x[ p ] to be set to undefined
        if(y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
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
export const toThousands = (s) => {
      if(!s) {
        return
      }
      let _s = s.toString().split('.');
      let reg = /\B(?=(\d{3})+(?!\d))/g;
      _s[ 0 ] = _s[ 0 ].replace(reg, ',');
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
  for(let i = 0, len = arr.length; i < len; ++i) {
    if(_arr.indexOf(arr[ i ]) === -1) {
      _arr.push(arr[ i ])
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
      while(index < s.length) {
        obj[ s[ index ] ] = obj[ s[ index ] ] !== undefined ? obj[ s[ index ] ] + 1 : 1;
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
        if(charts.length > count) {
          count = charts.length;
          chart = [];
        }
        if(charts.length === count) {
          chart.push(son)
        }
      });
      return { count, chart }
    }
;
/**
 * 字符串或者数组首字母大写
 * @param {String|Array}arr
 * @returns {U[]|Array}
 */
export const normalize = (arr) => {
      return [].concat(arr).map(function (e, i) {
        return e[ 0 ].toUpperCase() + e.substring(1).toLowerCase();
      })
    }
;

/**
 * @method convertGroup 自定义数组递归修改元素属性方法
 * @param {Array}groups:要被递归循环的数据
 * @return {Array}
 */
export const convertGroup = (groups) => {
  if(!groups) {
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
const treeObj = (originObj) => {
  //对象深拷贝
  let obj = {};
  for(const key in originObj) {
    var val = originObj[ key ];
    obj[ key ] = typeof val === 'object' ? treeObj(val) : val;
  }
  //对象新增children键值，用于存放子树
  obj[ 'children' ] = [];
  return obj;
};
const toTreeData = (data, attributes) => {
  let resData = data;
  let tree = [];

  //找寻根节点
  for(let i = 0; i < resData.length; i++) {

    if(resData[ i ][ attributes.parentId ] === '' || resData[ i ][ attributes.parentId ] === null) {
      tree.push(this.treeObj(resData[ i ]));
      resData.splice(i, 1);
      i--;

    }
  }


  //找寻子树
  const run = (chiArr) => {
    if(resData.length !== 0) {
      for(let i = 0; i < chiArr.length; i++) {
        for(let j = 0; j < resData.length; j++) {
          if(chiArr[ i ][ attributes.id ] === resData[ j ][ attributes.parentId ]) {
            let obj = this.treeObj(resData[ j ]);
            chiArr[ i ].children.push(obj);
            resData.splice(j, 1);
            j--;
          }
        }
        run(chiArr[ i ].children);
      }
    }
  };
  run(tree);
  return tree;

};

/**
 * @method launchFullScreen 开启全屏
 * @param {Object} elem = document.documentElement 作用的元素
 */
export function fullScreen (elem = document.documentElement) {
  if(elem.requestFullScreen) {
    elem.requestFullScreen();
  } else if(elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if(elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen();
  }
}
/**
 * @method exitFullScreen 关闭全屏
 */
export const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}
/**
 * 把数字转换为以{separator}分割的字符串
 * @param number
 * @param limit
 * @param separator
 * @param precise 精确多少位小数
 * @return {string}
 */
export function thousandsSwitch (number, limit = 3, separator = ',', precise = 2) {
  number = number || '0'
  const unitArr = [
    { unit: '', length: 4, suffix: 0 },
    { unit: '万', length: 8, suffix: 4 },
    { unit: '亿', length: 12, suffix: 8 },
    { unit: '兆', length: 16, suffix: 12 }
  ]
  let unit = {}
  let unitIndex = 0
  // 小于10000，不需要转换单位
  if (parseInt(number, 10) < 1000) {
    return `${number}`
  }
  // return number.toLocaleString('en-US')
  const numberStr = `${number}`
  const temp = numberStr.split('')
  // 确认单位
  for (let i = 0, len = unitArr.length; i < len; ++i) {
    const long = unitArr[i].length
    // 匹配到单位或者截止到最后一个单位
    if (temp.length <= long || i === unitArr.length - 1) {
      unit = unitArr[i]
      unitIndex = i
      break
    }
  }
  let result = ''
  let float = '' // 小数部分
  temp.reverse()
  // 去除用单位代替的数字
  if (unitIndex !== 0) {
    // 精确位数必须大于0时并且精确的小数位数小于自己本身的位数，才进行精确小数
    if(precise > 0 && precise <= unit.suffix){
      float = temp.slice(unit.suffix - precise, unit.suffix)
      float.reverse()
      float = parseFloat(float.join(''))
      //小数只有一位数，并且为0时，不显示小数
      if(float !== 0){
        float = '.' + float.toFixed(0)
      }else {
        float = ''
      }
    }
    temp.splice(0, unit.suffix)
  }
  for (let start = 0; start <= temp.length;) {
    const end = start + limit
    const arr = temp.slice(start, end)
    if (arr.length) {
      arr.reverse()
      result = separator + arr.join('') + result
    }
    if (arr.length < limit) {
      result = result.slice(1) + float + (unit.unit || '')
      break
    }
    start += limit
  }
  return result
}

/**
 * 评分
 * @param rate 星星分数
 * @param max 星星分数
 */
export function star (rate, max = 5){
    if(!max || typeof max !== 'number' || rate > max){
        return ''
    }
    const _rate = Math.floor(rate);
    const array1 = new Array(_rate).fill('★')
    const array2 = new Array(max - _rate).fill('☆')
    return array1.concat(array2).join('');
}

/**
 * 字节转换
 * @param bytes {Number} 要转换的字节数
 * @param maxUnit { String }最大的限制单位
 * @return {string}
 */
export function byteConvert2 (bytes) {
    if (isNaN(bytes)) {
        return '';
    }
    //在这里定义了常用的字节，字节、千字节、兆字节、吉字节、太字节、拍字节、艾字节、Z字节、Y字节
    var symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var exp = Math.floor(Math.log(bytes) / Math.log(2));
    if (exp < 1) {
        exp = 0;
    }
    var i = Math.floor(exp / 10);
    bytes /= Math.pow(2, 10 * i);
    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2);
    }
    return bytes + ' ' + symbols[i];
}

/** 字节转换为指定单位，没有达到指定单位时，则进行自动转换
* @param num {Number} 文件大小 单位为 字节 b
* @param unit {String} 要输出的转换单位
*/
export const byteConvert = (num, unit = 'MB') => {
    const switchArr = ['B', 'KB', 'MB', 'GB']
    let index = switchArr.findIndex((e) => e === unit.toUpperCase())
    // 没有找到对应的单位时
    if (index === -1) {
        return
    } else if (index === 0) {
        return `${num}${switchArr[0]}`
    }
    let newNum = num
    for (let i = 0; i < index; ++i) {
        newNum = (newNum / 1024)
        if (newNum < 1000) {
            index = i + 1
            break
        }
    }
    return `${parseInt(newNum, 10) === newNum ? parseInt(newNum, 10) : newNum.toFixed(2)}${switchArr[index]}`
}
