//导航吸顶
$(function(){
  //获取目标
 var nav = document.getElementById("navt");
 //var menul = document.getElementById("menul")
 // var menu = document.querySelector(".smenu")
 window.onscroll = function(){
  var stop = document.documentElement.scrollTop || document.body.scrollTop;
  //当滑动的距离大于185
  if(stop >= 185 ){
    // nav.style.position = "fixed";
    // 	nav.style.top = 0;
    //给导航增加一个属性样式fix
    nav.className="nav fix";

		//	menul.className="fixl smenus";
	
    //给左边导航增加一个属性样式fix
    
  }else{
    // nav.style.position = "static";
    nav.className="nav clearfix";
   
			 //menul.className="smenu";
	
   
  }
  
}

});
