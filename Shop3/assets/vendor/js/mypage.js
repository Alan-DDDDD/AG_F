$(function(){
    $(window).scroll(function(){
        mybar($(`.mysite`));
    });
});

function mybar(j){
    var scrollTop = $(window).scrollTop();
        if(scrollTop>=$(`#bi`).height()){
            j.css("opacity","1");
            $(`.mynav`).css("background-color","#baa88b");
        }else{
            j.css("opacity","0");
            $(`.mynav`).css("background-color","");
        }
}