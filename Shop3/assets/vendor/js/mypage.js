$(function(){
    $(window).scroll(function(){
            if($(`#view`).data("page")=="pdc"){
                mybar($(`.mysite`));
            }
        });
});

$(function(){
    getddl(["ITEM"]).then(x=>{
        if(x){
            let bar = $(`.mybar`);
            bar.empty();
            $.each(ddllist["ITEM"],(i,d)=>{
                bar.append(`<li data-id="${d.Dataid}"><h6>${d.Data}</h6></li>`);
            })
        }else{
            console.log(msg);
        }
    }).catch(x=>{console.log(x)});
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
        alert($(this).data("id"));
    }
});