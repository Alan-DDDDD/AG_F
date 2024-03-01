$(function(){
    getddl(["ITEM","UNIT","BND","LST"]).then(x=>{
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
    getCart("Car","GetCart").then(x=>{
        if(x){
            let x;
        }else{
            console.log(msg);
        }
    }).catch(x=>{console.log(x)})
})
$(function(){
    $(window).scroll(function(){
            if($(`#view`).data("page")=="pdc"){
                mybar($(`.mysite`));
            }
        });
});

function mybar(j){
    var scrollTop = $(window).scrollTop();
        if(scrollTop>=120 || +($(`#view`).css('height').substring(0,4))<700){
            j.css("opacity","1");
            $(`.mynav`).css("background-color","#baa88b");
            j.data("view","Y");
        }else{
            j.css("opacity","0");
            $(`.mynav`).css("background-color","");
            j.data("view","N");
        }
}
// ($(`#bi`).height())

function bindCart(){
    let car = $(`#cartbody`);
}

$(`#cartbody`).on('click','.countbtn',function(){
    let me = $(this);
    let a = me.data('action');
    let v = me.parent().find(".pdccountval");
    if(a=="plus"&&+v.html()<10){
        v.html(+v.html()+1);
    }else if(a=="minus"&&+v.html()>1){
        v.html(+v.html()-1);
    }
});