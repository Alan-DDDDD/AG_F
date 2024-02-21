var ch = $(`.mysite`).offset().top;
$(function(){
    $(window).scroll(function(){
        mybar($(`.mysite`));
    });
});

function mybar(j){
    var jh = j.offset().top;
    var scrollTop = $(window).scrollTop();
    if(jh > 0){

        if(scrollTop>jh){
            j.css("position","fixed");
            j.css("top","0");
            j.css("display","flex");
        }else{
            j.css("position","");
            j.css("top","0");
            j.css("display","flex");
        }
    }
}