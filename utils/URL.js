// function URL() {
//
// }
// URL.prototype.toUTF8Array = function (str) {
//   var utf8 = [];
//   for (var i = 0; i < str.length; i++) {
//     var charcode = str.charCodeAt(i);
//     if (charcode < 0x80) utf8.push(charcode);
//     else if (charcode < 0x800) {
//       utf8.push(0xc0 | (charcode >> 6),
//           0x80 | (charcode & 0x3f));
//     }
//     else if (charcode < 0xd800 || charcode >= 0xe000) {
//       utf8.push(0xe0 | (charcode >> 12),
//           0x80 | ((charcode >> 6) & 0x3f),
//           0x80 | (charcode & 0x3f));
//     }
//     else {
//       i++;
//       charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff)
//       utf8.push(0xf0 | (charcode >> 18),
//           0x80 | ((charcode >> 12) & 0x3f),
//           0x80 | ((charcode >> 6) & 0x3f),
//           0x80 | (charcode & 0x3f));
//     }
//   }
//   console.log(utf8, 'utf8');
//   return utf8;
// }
// URL.prototype.Utf8ArrayToStr = function () {
//   var out, i, len, c;
//   var char2, char3;
//
//   out = "";
//   len = array.length;
//   i = 0;
//   while (i < len) {
//     c = array[i++];
//     switch (c >> 4) {
//       case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
//         // 0xxxxxxx
//         out += String.fromCharCode(c);
//         break;
//       case 12: case 13:
//         // 110x xxxx   10xx xxxx
//         char2 = array[i++];
//         out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
//         break;
//       case 14:
//         // 1110 xxxx  10xx xxxx  10xx xxxx
//         char2 = array[i++];
//         char3 = array[i++];
//         out += String.fromCharCode(((c & 0x0F) << 12) |
//             ((char2 & 0x3F) << 6) |
//             ((char3 & 0x3F) << 0));
//         break;
//     }
//   }
//
//   return out;
// }
// 获取utf8数组
// let unversioned = this.toUTF8Array(url)
//     // 转换为base 4字符串
//     // padstart非常重要！否则会丢失前导0
//     .map(n => n.toString(4).padStart(4, "0"))
//     // 转换为字符数组
//     .join("").split("")
//     // 映射到o的不同形式
//     .map(x => this.enc[parseInt(x)])
//     // 连接成单个字符串
//     .join("")
class OOO {
  enc = ["o", "ο", "о", "ᴏ"]
  //           006f 03bf 043e 1d0f
  dec = {
    "o": "0",
    "ο": "1",
    "о": "2",
    "ᴏ": "3"
  }

  ver = {
    "oooo": true
  }

  currVer = "oooo"

  removeAndCheckVersion(ooo) {
    if (this.ver[ooo.substring(0, 4)]) {
      return ooo.substring(4)
    } else {
      return null
    }
  }

  addVersion(ooo) {
    return this.currVer + ooo
  }

  encodeUrl(url) {
    // get utf8 array
    let unversioned = this.toUTF8Array(url)
        // convert to string with base 4
        // padstart very important! otherwise missing leading 0s
        .map(n => n.toString(4).padStart(4, "0"))
        // convert to array of characters
        .join("").split("")
        // map to the o's
        .map(x => this.enc[parseInt(x)])
        // join into single string
        .join("")

    return this.addVersion(unversioned)
  }

  decodeUrl(ooo) {

    ooo = this.removeAndCheckVersion(ooo)
    if (ooo === null) return

    // get the base 4 string representation of the url
    let b4str = ooo.split("").map(x => this.dec[x]).join("")

    let utf8arr = []

    // parse 4 characters at a time (255 in b10 = 3333 in b4)
    // remember adding leading 0s padding
    for (let i = 0; i < b4str.length; i += 4)
      utf8arr.push(parseInt(b4str.substring(i, i + 4), 4))

    return this.Utf8ArrayToStr(utf8arr)
  }


  // from https://gist.github.com/joni/3760795
  toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
            0x80 | (charcode & 0x3f));
      }
      else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f));
      }
      // surrogate pair
      else {
        i++;
        charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff)
        utf8.push(0xf0 | (charcode >> 18),
            0x80 | ((charcode >> 12) & 0x3f),
            0x80 | ((charcode >> 6) & 0x3f),
            0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

  // from https://gist.github.com/wumingdan/759564f6cb887a55bceb
  Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
      c = array[i++];
      switch (c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          // 110x xxxx   10xx xxxx
          char2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx  10xx xxxx  10xx xxxx
          char2 = array[i++];
          char3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) |
              ((char2 & 0x3F) << 6) |
              ((char3 & 0x3F) << 0));
          break;
      }
    }

    return out;
  }

}


const input = document.getElementById("input-url");
const output = document.getElementById("output-url");
const oooBtn = document.getElementById("ooo-button");
const copyBtn = document.getElementById("copy-button");

// init
input.addEventListener("keydown", e => e.code == "Enter" ? oooify() : null)

// mouse enter listener

let oooBtnInt;

oooBtn.addEventListener("mouseenter", () => oooBtnInt = setInterval(() => {
  console.log("a");
  if (oooBtn.innerText == "oOo") oooBtn.innerText = "OoO";
  else oooBtn.innerText = "oOo";
}, 200));

oooBtn.addEventListener("mouseleave", () => {
  clearInterval(oooBtnInt);
  // oooBtn.innerText = "oOo";
});


function oooify() {

  if (window.inBlinking) return

  try {
    new URL(input.value)
  } catch (e) {

    window.inBlinking = true

    input.style.opacity = 1
    input.disabled = true

    let oldValue = input.value
    input.value = "Invalid URL! Noooooooooooo D:"

    let times = 0

    let i = setInterval(async () => {
      if (parseInt(input.style.opacity) == 1)
        input.style.opacity = 0.2;
      else
        input.style.opacity = 1;

      if (++times == 6) {
        clearInterval(i)
        input.value = oldValue
        input.disabled = false
        input.focus()
        inBlinking = false
      }
    }, 150)
    return
  }

  const domain = location.host;

  let url = new OOO().encodeUrl(input.value.trim());
  url = `https://ooooooooooooooooooooooo.ooo/${url}`;

  // show the output div
  document.getElementById("output-div").style.display = "block";

  output.innerHTML = url;
  output.setAttribute("href", url);

  input.value = "";
}

function copy() {
  const el = document.createElement('textarea');
  el.value = output.innerHTML;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  copyBtn.parentNode.setAttribute("data-showme", "");
  setTimeout(() => copyBtn.parentNode.removeAttribute("data-showme"), 1000);
};



