var ch = $(`.mysite`).offset().top;
$(function(){
    $(window).scroll(function(){
        mybar($(`.mysite`));
    });
});

function mybar(j){
    var jh = j.offset().top;
    var scrollTop = $(window).scrollTop();
        if(scrollTop>=$(`#bi`).height()){
            j.css("position","fixed");
            j.css("top","0");
            j.removeAttr("hidden");
        }else{
            j.css("position","");
            j.attr("hidden",true)
        }
}