$(function(){
    $(window).scroll(function(){
        mybar($(`.mysite`));
    });
});

function mybar(j){
    var scrollTop = $(window).scrollTop();
        if(scrollTop>=$(`#bi`).height()){
            j.css("position","fixed");
            j.css("top","0");
            j.css("opacity","1");
        }else{
            j.css("position","");
            j.attr("hidden",true);
            j.css("opacity","0");
        }
}