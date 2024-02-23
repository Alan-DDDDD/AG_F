$(`.pdccount`).on('click','.countbtn',function(){
    let me = $(this);
    let a = me.data('action');
    let v = me.parent().find(".pdccountval");
    if(a=="plus"&&+v.html()<10){
        v.html(+v.html()+1);
    }else if(a=="minus"&&+v.html()>1){
        v.html(+v.html()-1);
    }
});
$(`.pdclistbtngp`).on('click','.addcart',function(){
    let me = $(this);
    let parent = me.parent();
    let c = $(parent).find(".pdccountval").html();
    let p = {
        pdid : parent.data("id"),
        count : +c
    }
    console.log(p);
});

function addCartView(){
    
}