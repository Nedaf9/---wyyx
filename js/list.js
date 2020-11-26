$(function (){

  $.ajax({
    url: './data/list.json',
    type: 'get',
    dataType: 'json',
    success: function (json){
      // console.log(json)
      var goodsStr = ''
      $.each(json,function (index,item){
        console.log(item)
        goodsStr += `<dl code="${item.code}">
        <dt><img src="${item.imgurl}" alt=""></dt>
        <dd>${item.title}</dd>
        <dd>${item.price}<span class="linerx"></span></dd>
        <dd>${item.msg}</dd>
      </dl>`
      })
       $('.list-goods').html(goodsStr)
    }
  })


  //获取dl上的code值
  $('.list-goods').on('click','dl',function (){
    // 获取当前点击商品的编号
    var code = $(this).attr('code')
    console.log(code);
    var listArr=[]
    var hasList = false

     // 如果购物车没有当前选中的商品，添加一条数据
     if (!hasList) {
      // var objStr = JSON.stringify({code:code,num:1})
      listArr.push({num:code})
    }

    // 更新本地存储的数据
    localStorage.setItem('lists',JSON.stringify(listArr))

    location='./details.html';

 })



});