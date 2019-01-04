$(document).ready(function(){
    function left_carusel(){
       var block_width = $('.carousel-block').width() + 20;
       $(".carousel-items .carousel-block").eq(-1).clone().prependTo(".carousel-items"); 
       $(".carousel-items").css({"left":"-"+block_width+"px"}); 
       $(".carousel-items").animate({left: "0px"}, 200); 
       $(".carousel-items .carousel-block").eq(-1).remove(); 
    }
    function right_carusel(){
       var block_width = $('.carousel-block').width() + 20;
       $(".carousel-items").animate({left: "-"+ block_width +"px"}, 200); 
       setTimeout(function () { 
          $(".carousel-items .carousel-block").eq(0).clone().appendTo(".carousel-items"); 
          $(".carousel-items .carousel-block").eq(0).remove(); 
          $(".carousel-items").css({"left":"0px"}); 
       }, 300);
    }
    
    $(".carousel-button-right").click(function(){ 
       right_carusel();
    });
      
    $(".carousel-button-left").click(function(){ 
       left_carusel();
    });
       
})