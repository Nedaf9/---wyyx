//导航吸顶
$(function () {
  //获取目标
  var nav = document.getElementById("navt");
/*   var menul = document.getElementById("menul");
  var menu = document.querySelector(".smenu"); */
  var navlist = $(".nav-inner ul li .menu");
  var ulli = $(".nav-inner ul li");
  //ul最后两个li
  var li1 = $(".nav-inner .bts")[0];
  var li2 = $(".nav-inner .bts")[1];
  //获取nav上的logo
  var div = document.querySelector(".nav-inner .logo");

  //获取nav后面的skip元素
  var skip = $(".nav-inner .skip");

  // console.log(ulli);
  //获取menu块到最外层的高度
  // var offtop = offset(menu).top;

  window.onscroll = function () {
    var stop = document.documentElement.scrollTop || document.body.scrollTop;
    //当滑动的距离大于185
    if (stop >= 150) {
      // nav.style.position = "fixed";
      // 	nav.style.top = 0;
      //给导航增加一个属性样式fix
      nav.className = "nav fix";

      //最后两个li隐藏
      li1.style.display = "none";
      li2.style.display = "none";

      //ulli的margin减小
      ulli.css("margin", "0 20px");

      //下拉列表navlist样式
      navlist.css("left", "-200px");

      //显示logo
      div.style.display = "block";

      //显示skip
      skip.css("display", "block");

      /* if (offtop - stop <= 100) {
        menul.className = "fixl smenus";
      }
 */
      //给左边导航增加一个属性样式fix
    } else {
      // nav.style.position = "static";
      nav.className = "nav clearfix";

      li1.style.display = "";
      li2.style.display = "";
      div.style.display = "none";

      ulli.css("margin", "0 26px");

      //下拉列表navlist样式
      navlist.css("left", "-35px");

      //恢复隐藏
      skip.css("display", "none");

     /*  menul.className = "smenu"; */
    }
  };
});