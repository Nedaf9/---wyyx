$(function () {
  var user = document.querySelector(
    ".login-inner-input input[name='username']"
  );
  var pass = document.querySelector(
    ".login-inner-input input[name='password']"
  );
  var sign = document.querySelector(".sign");
  var login = document.querySelector(".login-btn");
  var auto = document.querySelector(".auto");

  //登录
  login.onclick = function (e) {
    console.log(this);
    e.stopPropagation();
    var username = user.value;
    var password = pass.value;
  
    $.ajax({
      url: "./data/login.json",
      type: "get",
      dataType: "json",
      success: function (json) {
        // console.log(json)
        $.each(json, function (index, item) {
          console.log(item);
          //判断用户名和密码还有协议是否都输入正确
          if (auto.checked){
            if ((item.user === username) && (item.ps === password)) {
               location.href = "./goods.html";
               console.log(1111);
            }
          }
        });

        //   $('.content').html(goodsStr)
      },
    });
  };
  //登录成功就在本地存储一个值
  localStorage.setItem("username","")
});
