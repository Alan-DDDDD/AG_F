var ch = $(`.mysite`).offset().top;
$(function(){
    $(window).scroll(function(){
        mybar($(`.mysite`));
    });
});

function mybar(j){
    var jh = j.offset().top;
    var scrollTop = $(window).scrollTop();
        if(scrollTop>jh){
            j.css("position","fixed");
            j.css("top","0");
        }else{
            j.css("position","");
            j.css("top","0");
        }
}