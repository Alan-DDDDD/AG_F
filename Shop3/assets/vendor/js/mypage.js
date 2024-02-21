$(function(){
    $(window).scroll(function(){
        mybar($(`.mybar`));
    });
});

function mybar(j){
    var jh = j.offset().top;
    var scrollTop = $(window).scrollTop();
    if(scrollTop>jh){
        j.css("display","none");
        j.css("position","fixed");
        j.css("top","0");
    }
}