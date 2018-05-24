const Ajax = ({type = 'GET', url, data}) => {
  return new Promise((resolve, reject) => {
    window.$.ajax({
      type: type,
      url: url,
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      data: data,
      statusCode: {
        404: function () {
          console.failure('没有连接到请求:404');
        },
        400: function () {
          console.failure('参数错误:400');
        },
        500: function (e) {
          console.failure('服务器错误: 500');
        },
      },
      success: function (res) {
        resolve(res);
        console.success(res)
      },
      error: (e) => {
        console.failure('ajax err:'+ e.statusText)
        // reject(e)
      }
    });
  });


};

export default Ajax