/* $(function(){


    var minBox = document.querySelector('.minBox')
    var mask = document.querySelector('.mask')
    var maxBox = document.querySelector('.maxBox')
    var maxImg = document.querySelector('.maxBox img')
    
     console.log(minBox);
    // 鼠标移动，mask跟随移动
    window.onscroll = function(){
     var sto = document.documentElement.scrollTop || document.body.scrollTop;

  $(".fdgood-lt").on("mousemove",".minBox",function(ev){
    // $("p").one("mousemove", function(ev){
    // minBox.onmousemove = function(ev){
     var e = ev || event
     
      // 计算msk的定位坐标
      var maskLeft = e.clientX - offset(minBox).left - mask.clientWidth/2
      var maskTop = e.clientY - offset(minBox).top - mask.clientHeight/2+sto
       
     //   console.log(maskLeft);
      // 限制mask移动范围
      if (maskLeft < 0) {
        maskLeft = 0
      }
      if (maskLeft >= (minBox.clientWidth-mask.clientWidth)) {
        maskLeft = minBox.clientWidth-mask.clientWidth
      }
      if (maskTop < 0) {
        maskTop = 0
      }
      if (maskTop >= (minBox.clientHeight-mask.clientHeight)) {
        maskTop = minBox.clientHeight-mask.clientHeight
      }
      mask.style.left = maskLeft + 'px'
      mask.style.top = maskTop + 'px'
    
      var scaleX = maskLeft/(minBox.clientWidth-mask.clientWidth)
      var scaleY = maskTop/(minBox.clientHeight-mask.clientHeight)
    
      // 大图也跟随移动
      maxImg.style.left = -scaleX*(maxImg.clientWidth-maxBox.clientWidth) + 'px'
      maxImg.style.top = -scaleY*(maxImg.clientHeight-maxBox.clientHeight) + 'px'
     console.log(maxImg.clientWidth);
    // }
  })

    }
    
    minBox.onmouseenter = function (){
      mask.style.display = 'block'
      maxBox.style.display = 'block'
    }
    minBox.onmouseleave = function (){
      mask.style.display = 'none'
      maxBox.style.display = 'none'
    }
    
})
    
 */

//获取从st页面传过来的数据
var listArr = JSON.parse(localStorage.getItem("lists"));

//获取数据
$.ajax({
  url: "./data/list.json",
  type: "get",
  dataType: "json",
  success: function (json) {
    // console.log(json)
    var goodsStr = "";
    $.each(listArr, function (index, item) {
      $.each(json, function (ind, obj) {
        if (item.num === obj.code) {
          // console.log(123);
          goodsStr += ` 
          <div class="fdgoods clearfix">
          <div class="fdgood-lt">
           
                <span></span>
             <div class="minBox">
              <img src="${obj.imgurl}" alt="" />
              <div class="mask"></div>
            </div>

            <div class="maxBox">
              <img src="${obj.imgurl}" alt="" />
            </div> 
            <div class="smallpic">
              <ul class="clearfix">
                <li><img src="${obj.imgurl}" alt="" /></li>
                <li><img src="${obj.imgurl}" alt="" /></li>
                <li><img src="${obj.imgurl}" alt="" /></li>
                <li><img src="${obj.imgurl}" alt="" /></li>
                <li><img src="${obj.imgurl}" alt="" /></li>
              </ul>
              <a href="#">企业采购更优惠 ></a>
            </div> 
          </div>

          <div class="fdgood-rg">
             <div class="fdgood-text">
              <p><b>${obj.title}</b></p>
              <span>99.5%<em>好评率></em></span>
              <i>${obj.msg}</i>
            </div> 
            <div class="fdgood-info">
              <ul>
                <li><b>价格</b><strong>${obj.price}</strong></li>
                <li>
                  <i>Pro共享</i><span>Pro会员叠加优惠，到手价<b>94.91</b></span
                  ><a href="#">立即开通></a>
                </li>
                <li>
                  <b>促销</b><span>全球换购</span
                  ><a href="#">低至3折超值换购</a>
                </li>
                <li>
                  <b>购物返</b><span>最高返<i>9积分</i><em>?</em></span>
                </li>
                <li><b>邮费</b><i>满99元免邮</i></li>
                <li><b>配送</b>至<a href="#">请选择地址</a></li>
                <li>
                  <b>服务</b><span><i></i>网易自营品牌</span
                  ><span><i></i>30天无忧退换</span
                  ><span><i></i>国内部分地区不可配送</span>
                </li>
              </ul>
            </div>

            <div class="fdgood-small">
              <ul>
                <li>
                  <b>颜色</b>
                  <span><img src="${obj.imgurl}" alt="" /></span>
                  <span><img src="${obj.imgurl}" alt="" /></span>
                  <span><img src="${obj.imgurl}" alt="" /></span>
                  <span><img src="${obj.imgurl}" alt="" /></span>
                  <span><img src="${obj.imgurl}" alt="" /></span>
                  <span><img src="${obj.imgurl}" alt="" /></span>
                </li>
                <li class="sizes">
                  <b>尺码</b> <span>XS</span><span>S</span><span>M</span
                  ><span>L</span><span>XL</span><span>XXl</span
                  ><span>XXXL</span>
                </li>
                <li class="count">
                  <b>数量</b>
                  <p><i>-</i><span>1</span><b>+</b></p>
                  <a href="#">尺码助手</a>
                </li>
              </ul>
              <div class="btn">
                <span class="span1" cartcode="${obj.code}">立即购买</span>
                <span class="span1" cartcode="${obj.code}">加入购物车</span>
                <span><i></i>收藏</span>
              </div>
            </div>
          </div>
        </div>
    `;
        }
      });
    });
    // $(".fdgood-lt .smallpic").before(goodsStr)
    $(".top-text").after(goodsStr);
    // $(".fdgood-lt").html(goodsStr);

    //放大镜
    $(function () {
      var minBox = document.querySelector(".minBox");
      var mask = document.querySelector(".mask");
      var maxBox = document.querySelector(".maxBox");
      var maxImg = document.querySelector(".maxBox img");

      //  console.log(minBox);
      // 鼠标移动，mask跟随移动
      // window.onscroll = function () {
      //var sto = document.documentElement.scrollTop || document.body.scrollTop;

      $(".fdgood-lt").on("mousemove", ".minBox", function (ev) {
        // $("p").one("mousemove", function(ev){
        // minBox.onmousemove = function(ev){
        var e = ev || event;

        // 计算msk的定位坐标
        var maskLeft = e.clientX - offset(minBox).left - mask.clientWidth / 2;
        var maskTop = e.pageY - offset(minBox).top - mask.clientHeight / 2;

        // 限制mask移动范围
        if (maskLeft < 0) {
          maskLeft = 0;
        }
        if (maskLeft >= minBox.clientWidth - mask.clientWidth) {
          maskLeft = minBox.clientWidth - mask.clientWidth;
        }
        if (maskTop < 0) {
          maskTop = 0;
        }
        if (maskTop >= minBox.clientHeight - mask.clientHeight) {
          maskTop = minBox.clientHeight - mask.clientHeight;
        }
        mask.style.left = maskLeft + "px";
        mask.style.top = maskTop + "px";

        var scaleX = maskLeft / (minBox.clientWidth - mask.clientWidth);
        var scaleY = maskTop / (minBox.clientHeight - mask.clientHeight);

        // 大图也跟随移动
        maxImg.style.left =
          -scaleX * (maxImg.clientWidth - maxBox.clientWidth) + "px";
        maxImg.style.top =
          -scaleY * (maxImg.clientHeight - maxBox.clientHeight) + "px";

        // }
      });
      // };

      minBox.onmouseenter = function () {
        mask.style.display = "block";
        maxBox.style.display = "block";
      };
      minBox.onmouseleave = function () {
        mask.style.display = "none";
        maxBox.style.display = "none";
      };
    });


    //要获取的元素是未来添加的所以要放在这
    // 获取点击的商品信息
    $(function () {
      var li = $(".fdgood-small .sizes");
      var sizes = $(".fdgood-small .sizes span");
      var ul = $(".fdgood-small ul");

      // console.log(sizes);

      $.each(sizes, function (index, item) {
        item.onclick = function () {
          var sizeval = $(this).text();
          console.log(sizeval);
          var sizeArr = [];
          var hassize = false;

          //如果本地没有就添加一条数据
          if (!hassize) {
            sizeArr.push({ size: sizeval });
          }
          console.log(sizeArr);

          //更新本地存储的数据
          localStorage.setItem("sizes", JSON.stringify(sizeArr));
        };
      });

      // 点击加入购物车
      $(".btn").on("click", ".span1", function () {
        // 获取当前点击商品的编号
        var number = $(this).attr("cartcode");


        // localStorage  key = value
        //  goods = [{code:'abc1',num:1},{code:'abc2',num:2}]
        // 判断本地存储是否有数据
        if (localStorage.getItem("cartgoods")) {
          var cartgoodsArr = JSON.parse(localStorage.getItem("cartgoods"));
        } else {
          var cartgoodsArr = [];
        }

        var hasGoods = false;

        if (cartgoodsArr.length > 0) {
          
          // 判断当前选中商品是否在购物车中

          $.each(cartgoodsArr, function (index, item) {
            // console.log(index);
            // console.log(item);
            if (item.code === number) {
              // 商品存在购物车中，数量+1
              item.num++;
              hasGoods = true;
              return false;
            }
          });
        }

        // 如果购物车没有当前选中的商品，添加一条数据
        if (!hasGoods) {
          // var objStr = JSON.stringify({code:code,num:1})
          cartgoodsArr.push({ code: number, num: 1 });
        }

        // 更新本地存储的数据
        localStorage.setItem("cartgoods", JSON.stringify(cartgoodsArr));

        alert("添加购物车成功");

        location.href = "./goods.html";
      });
    });
  },
});
