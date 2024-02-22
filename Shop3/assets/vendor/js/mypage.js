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
            j.data("view","Y");
        }else{
            j.css("opacity","0");
            $(`.mynav`).css("background-color","");
            j.data("view","N");
        }
}
$(`.mybar`).on('click','li',function(){
    if($(this).parent().data("view")=="Y"){
        alert($(this).html());
    }
});