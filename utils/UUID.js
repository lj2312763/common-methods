const ARR = [];
/**
 * @method  生成随机A-Z和0-9的默认16位字符串,之后每次调用.uuid时，按着顺序加 1
 * @returns {string}：随机A-Z和0-9的默认16位字符串
 */
const uuid = {
  // 是否进位
  carrtBit: false,
  // 最大长度
  maxLength: 16,
  /**
   * @method makeUID 生成由数字和字母组成的 长度{maxLength}的字符串
   * @returns {string}
   */
  makeUID () {
    let n = 0;
    const arr = ARR;
    if(arr.length) {
      return void 0;
    }
    while(n < this.maxLength) {//生成len位数组
      let RNum = Math.round(Math.random() * 25);//生成0-26数字
      let num = Math.round(Math.random() * 10);//生成0-10的数字
      let chart = String.fromCharCode(65 + RNum);//转换为A-Z的字符
      let el = Math.round(Math.random()) ? chart : num;//元素的每一个元素随机为数字或者字母
      arr.push(el);
      n++;
    }
    arr.reverse();
    console.log([].concat(arr).reverse().join(''))
    return [].concat(arr).reverse().join('');
  },
  //验证是否进位的函数，修改原数组
  carryBitFun (a, i) {
    if(typeof a[ i ] === 'string') {
      if(a[ i ].charCodeAt(0) >= 90) {
        this.carrtBit = true;
        a[ i ] = String.fromCharCode(65);
      } else {
        this.carrtBit = false;
        a[ i ] = String.fromCharCode(a[ i ].charCodeAt(0) + 1);
      }
    } else {
      a[ i ] = a[ i ].toString();
      if(a[ i ].charCodeAt(0) >= 57) {
        this.carrtBit = true;
        a[ i ] = String.fromCharCode(48);
      } else {
        this.carrtBit = false;
        a[ i ] = String.fromCharCode(a[ i ].charCodeAt(0) + 1);
      }
      a[ i ] = parseInt(a[ i ]);
    }
  },
  // uuid的获取值  使用方法为 .uuid
  get uuid () {
    this.makeUID();
    const arr = ARR;
    this.carryBitFun(arr, 0);
    // 最后一位是否进位
    if(this.carrtBit) {
      for(let i = 1, l = arr.length; i < l; ++i) {
        // 向左进一位
        this.carryBitFun(arr, i);
        // 不再进位时
        if(!this.carrtBit) {
          break;
        }
      }
    }
    return [].concat(arr).reverse().join('');
  },

};

exports = uuid;

