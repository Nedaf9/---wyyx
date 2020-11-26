$(function (){

  // 判断本地存储是否有购物车数据
  if (localStorage.getItem('cartgoods')) {// 有数据
    // 获取本地存储中购物车的数据
    var goodsArr = JSON.parse( localStorage.getItem('cartgoods') )
    var size = JSON.parse( localStorage.getItem('sizes') )

    // 获取数据
    $.ajax({
      url: './data/list.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        var domStr = ''
        $.each(goodsArr,function (index,item){
          $.each(json,function (ind,obj){
            $.each(size,function (ins,ob){
            console.log(json);
            if ( item.code === obj.code ) {
              domStr += `
              <div class="mon">
              <input type="checkbox" name="" id="" />
              <i><img src="${obj.imgurl}" alt="" /></i>
              <b>${obj.title}</b>
              <a href="#">${ob.size}<i></i></a>
              <strong>${obj.price}</strong>
              <span><em>-</em><u>1</u><em>+</em></span>
              <strong>${obj.price}</strong>
              <a href="#">移入收藏夹</a>
              <a href="#">删除</a>
            </div>
              `
            }
          })
        })
        })
        $('.wares').html(domStr)
      }
    })

    // 商品移出购物车
    $('.list').on('click','li em',function (){
      // 删除该商品对应的li
      $(this).parent().remove()

      // 更新本地存储中的数据
      var code = $(this).attr('code') // 要删除商品的编号
      // 删除数组元素：pop()  unshift()  splice(index,1)
      $.each(goodsArr,function (index,item){
        if (item.code === code) {
          goodsArr.splice(index,1)
          return false
        }
      })

      // 判断购物车是否还有数据
      if (goodsArr.length > 0) {
        // 更新本地数据
        localStorage.setItem('goods',JSON.stringify(goodsArr))
      } else {
        // 清除本地数据
        localStorage.removeItem('goods')
        var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
        $('.list').html(nodata)
      }

      alert('商品移出购物车成功！')

    })

  } else {// 没数据
    var nodata = '<li style="line-height: 70px; text-align: center;">购物车暂无数据！</li>'
    $('.list').html(nodata)
  }

})