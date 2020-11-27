//首页banner图片轮播
$(function () {
  var imgs = document.querySelectorAll(".main img");
  var prev = document.querySelector(".prev");
  var next = document.querySelector(".next");
  var lis = document.querySelectorAll(".nums li");
  var showIndex = 0; // 当前显示图片的下标
  var timer;

  // 自动播放
  animate(imgs[showIndex], { opacity: 1 }, function () {
    timer = setInterval(function () {
      moveNext(); //播放下一张
    }, 1000);
  });
  // 播放下一张
  function moveNext() {
    // 去掉上一张的样式
    imgs[showIndex].className = "";
    lis[showIndex].className = "";
    imgs[showIndex].style.opacity = 1;

    showIndex++;
    if (showIndex >= imgs.length) {
      showIndex = 0;
    }
    // 下一张图片添加类名
    imgs[showIndex].className = "show";
    lis[showIndex].className = "active";
    animate(imgs[showIndex], { opacity: 1 });
  }

  // 播放上一张
  function movePrev() {
    // 去掉上一张的样式
    imgs[showIndex].className = "";
    lis[showIndex].className = "";
    imgs[showIndex].style.opacity = 1;

    showIndex--;
    if (showIndex < 0) {
      showIndex = imgs.length - 1;
    }
    // 下一张图片添加类名
    imgs[showIndex].className = "show";
    lis[showIndex].className = "active";
    animate(imgs[showIndex], { opacity: 1 });
  }

  // 点击上一页
  prev.onclick = function () {
    // 清除当前所有计时器
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);

    movePrev();

    // 控制结束2秒后自动播放
    timer = setInterval(function () {
      moveNext();
    }, 1000);
  };

  // 点击下一页
  next.onclick = function () {
    // 清除当前所有计时器
    clearInterval(timer);
    clearInterval(imgs[showIndex].timer);

    moveNext();

    // 控制结束2秒后自动播放
    timer = setInterval(function () {
      moveNext();
    }, 1000);
  };

  // 点击数字圆点切换图片
  for (var i = 0, len = lis.length; i < len; i++) {
    lis[i].index = i;
    lis[i].onclick = function () {
      // 清除当前所有计时器
      clearInterval(timer);
      clearInterval(imgs[showIndex].timer);

      // 去掉上一张的样式
      imgs[showIndex].className = "";
      lis[showIndex].className = "";
      imgs[showIndex].style.opacity = 0.1;

      showIndex = this.index;

      // 下一张图片添加类名
      imgs[showIndex].className = "show";
      lis[showIndex].className = "active";
      animate(imgs[showIndex], { opacity: 1 });

      // 控制结束2秒后自动播放
      timer = setInterval(function () {
        moveNext();
      }, 1000);
    };
  }
});

//首页菜单数据交互
$(function () {
  //获取元素menus
  var lis = $(".nav-inner ul .bt");
  var ul = $(".nav-inner ul");
  //记录下下标数字
  var i;
  // 获取商品列表数据
  $.ajax({
    url: "./data/goods.json",
    type: "get",
    dataType: "json",
    success: function (json) {
      // console.log(json)
      var goodsStr = "";

      $.each(lis, function (index, lis) {
        // console.log(lis);
        //移入获取code值
        lis.onmouseenter = function () {
          // 获取当前点击商品的编号
          // console.log(this)
          var code = $(this).attr("code");
          //  var code = lis.attr('code')
          console.log(code);
          $.each(json, function (index, item) {
            // console.log(item.num);
            if (item.num === code) {
              console.log(1111);
              console.log(item);
              $.each(item.a, function (ind, obj) {
                console.log(obj);
                goodsStr += `<dl>
                <dt>${obj.title}</dt>
                <dd><span><img src="${obj.imgurl[0]}" alt=""></span>${obj.lk[0]}</dd>
                <dd><span><img src="${obj.imgurl[1]}" alt=""></span>${obj.lk[1]}</dd>
                <dd><span><img src="${obj.imgurl[2]}" alt=""></span>${obj.lk[2]}</dd>
                <dd><span><img src="${obj.imgurl[3]}" alt=""></span>${obj.lk[3]}</dd>
                <dd><span><img src="${obj.imgurl[4]}" alt=""></span>${obj.lk[4]}</dd>
                </dl>`;
              });
            }
          });
        };
      });

      $(".nav-inner ul li .menu").html(goodsStr);
    },
  });
});

//导航吸顶
$(function () {
  //获取目标
  var nav = document.getElementById("navt");
  var menul = document.getElementById("menul");
  var menu = document.querySelector(".smenu");
  var navlist = $(".nav-inner ul li .menu");
  var ulli = $(".nav-inner ul li");
  //ul最后两个li
  var li1 = $(".nav-inner .bts")[0];
  var li2 = $(".nav-inner .bts")[1];
  //获取nav上的logo
  var div = document.querySelector(".nav-inner .logo");

  //获取nav后面的skip元素
  var skip = $(".nav-inner .skip");

//获取用户浏览器的页面宽度
var width = document.documentElement.clientWidth || document.body.clientWidth;
console.log(width);

  // console.log(ulli);
  //获取menu块到最外层的高度
  var offtop = offset(menu).top;
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

      if (offtop - stop <= 100) {
        menul.className = "fixl smenus";
      
 }
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

      menul.className = "smenu";
    
    }
  };
});

// 下拉列表
$(function () {
  // 获取元素
  var lis = document.querySelectorAll(".nav-inner ul .bt");
  var menus = document.querySelectorAll(".nav-inner #menu");
  var prevIndex = 0; //保存上次选中元素的下标
  // console.log(menus);

  for (var i = 0, len = lis.length; i < len; i++) {
    lis[i].index = i;

    lis[i].onmouseenter = function () {
      /* menus[prevIndex].className = "menu";
      
        menus[this.index].className = "menu show";*/
      menus[prevIndex].style.display = "";

      menus[this.index].style.display = "block";

      prevIndex = this.index;
    };
    lis[i].onmouseleave = function () {
      /* menus[prevIndex].className = "menu";
     
       menus[this.index].className = "menu show";*/
      menus[prevIndex].style.display = "";

      prevIndex = this.index;
    };
  }
});

/* //左侧菜单固定
$(function(){
  var menul = document.getElementById("menul")
  var menu = document.getSelection("smenu")
  var w1 = getComputedStyle(menu).position
  console.log(menu);
  window.onscroll = function(){
   var stop = document.documentElement.scrollTop || document.body.scrollTop;
   // console.log(stop);
   if(stop >= 600){
     // nav.style.position = "fixed";
     // 	nav.style.top = 0;
     w1=relative
   }else{
     // nav.style.position = "static";
     //menul.className=("smenu")
   }
   
 }
 
 
 });
 */

//评论区轮播
$(function () {
  var content = document.querySelector(".content");
  var main = document.querySelector(".mains");
  var prev = document.querySelector(".prev2");
  var next = document.querySelector(".next2");
  var lis = document.querySelectorAll(".nums li");
  var timer;
  var imgIndex = 0; // 当前显示图片的下标
  var numIndex = 0; // 当前显示数字的下标

  // 向main中补一张图片
  var firstImg = main.children[0].cloneNode(true);
  main.appendChild(firstImg);

  // 图片长度
  var imgLen = main.children.length;
  // 图片宽度
  var imgWidth = main.children[0].clientWidth;

  // 进入页面自动播放
  autoMove();

  // 自动播放
  function autoMove() {
    timer = setInterval(function () {
      moveNext();
    }, 1000);
  }

  // 播放下一页
  function moveNext() {
    imgIndex++;
    // 临界值判断
    if (imgIndex >= imgLen) {
      imgIndex = 1; // 应该显示的下一张图片下标
      content.scrollLeft = 0; // 让滚动条瞬间回到前面的第一张图片位置
    }
    // 移动滚动条
    animate(content, { scrollLeft: imgIndex * imgWidth });

    // 去掉上次显示数字的类名
    lis[numIndex].className = "";
    // 数字下标递增
    numIndex++;
    // 临界值判断
    if (numIndex >= lis.length) {
      numIndex = 0;
    }
    // 当前显示的数字添加类名
    lis[numIndex].className = "active";
  }

  // 播放上一页
  function movePrev() {
    imgIndex--;
    // 临界值判断
    if (imgIndex < 0) {
      imgIndex = imgLen - 2; // 应该显示的下一张图片下标
      content.scrollLeft = imgWidth * (imgLen - 1); // 让滚动条瞬间回到后面的第一张图片位置
    }
    // 移动滚动条
    animate(content, { scrollLeft: imgIndex * imgWidth });

    // 去掉上次显示数字的类名
    lis[numIndex].className = "";
    // 数字下标递减
    numIndex--;
    // 临界值判断
    if (numIndex < 0) {
      numIndex = lis.length - 1;
    }
    // 当前显示的数字添加类名
    lis[numIndex].className = "active";
  }

  // 点击下一页
  next.onclick = function () {
    clearInterval(timer); // 停止自定播放
    moveNext();
    // 启动自定播放
    autoMove();
  };

  // 点击上一页
  prev.onclick = function () {
    clearInterval(timer); // 停止自定播放
    movePrev();
    // 启动自定播放
    autoMove();
  };

  // 点击数字切换图片
  for (var i = 0, len = lis.length; i < len; i++) {
    lis[i].index = i;
    lis[i].onclick = function () {
      clearInterval(timer); // 停止自定播放

      imgIndex = this.index;
      // 移动滚动条
      animate(content, { scrollLeft: imgIndex * imgWidth });

      // 去掉上次显示数字的类名
      lis[numIndex].className = "";
      numIndex = this.index;
      // 当前显示的数字添加类名
      lis[numIndex].className = "active";

      // 启动自定播放
      autoMove();
    };
  }
});
