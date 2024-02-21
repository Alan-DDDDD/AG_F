$(function(){
    $(window).scroll(function(){
        mybar($(`.mybar`));
    });
});

function mybar(j){
    var jh = j.offset().top;
    var scrollTop = $(window).scrollTop();
    if(scrollTop>jh){
        j.addClass("mybarfix");
    }else{
        j.removeClass("mybarfix");
    }
}