// $(function(){
//     getddl(["ITEM","UNIT","BND","LST"]).then(x=>{
//         if(x){
//             let bar = $(`.mybar`);
//             bar.empty();
//             $.each(ddllist["ITEM"],(i,d)=>{
//                 bar.append(`<li data-id="${d.Dataid}"><h6>${d.Data}</h6></li>`);
//             })
//             getCart("Car","GetCart").then(x=>{
//                 if(x){
//                     bindCart()
//                 }else{
//                     console.log(msg);
//                 }
//             }).catch(x=>{console.log(x)})
//         }else{
//             console.log(msg);
//         }
//     }).catch(x=>{console.log(x)});
// })
$(function(){
    $(window).scroll(function(){
            if($(`#view`).data("page")=="pdc"){
                mybar($(`.mysite`));
            }
        });
});
$(function(){
    getD("AD","Get").then(x=>{
        if(x){
            $(`#AD`).html(data);
        }
    }).catch(x=>{
        console.log(x)
    })
})

function mybar(j){
    var scrollTop = $(window).scrollTop();
        if(scrollTop>=120 || datalist.length<4){
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
    car.empty();
    let cartred = $(`#cartred`);
    $.each(cart,(i,d)=>{
        cartred.html(i+1)
        car.append(`
                    <div class="card mb-2 cart">
                      <div class="card-body" style="padding: 1rem 1.5rem;">
                          <div class="row">
                              <div class="col">
                                  <h5 class="card-title mb-2">${d.product.Pdcnm}</h5>
                                  <div class="pdclistbtngp" data-id="${d.product.Pdid}">
                                    <div class="pdcprice">$${d.product.Price.numberFormat(0,".",",")}</div>
                                    <div class="pdccount">
                                          <button class="countbtn countleft" data-action="minus"><i class='bx bx-${d.car.Count == 1 ? "trash":"minus"}'></i></button>
                                          <div class="pdccountval" style="min-width: 2rem;">${d.car.Count}</div>
                                          <button class="countbtn countright" data-action="plus"><i class='bx bx-plus'></i></button>
                                          <div class="card-text pdcunit"  style="margin: 0 0.5rem;">${ddllist["UNIT"].filter(x=>x.Dataid == d.product.Unit)[0].Data || ""}</div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                   `);
    });
    if(cart.length == 0){
        cartred.html("");
    }
}
$(`.mybar`).on('click','li',function(){
    if($(this).parent().data("view")=="Y"){
        bindPdclist($(this).data("id"));
    }
    $(`.mybar h6`).css("color","white");
    $(this).find("h6").css("color","gray");
});

$(`#cartbody`).on('click','.countbtn',function(){
    let me = $(this);
    let a = me.data('action');
    let v = me.parent().find(".pdccountval");
    let id = me.parents('.pdclistbtngp').data('id');
    let pdc = cart.filter(x=>x.product.Pdid == id)[0];
    if(a=="plus"){
        v.html(+v.html()+1);
        pdc.car.Count += 1; 
    }else if(a=="minus"&&+v.html()>1){
        v.html(+v.html()-1);
        pdc.car.Count -= 1; 
    }else if(a=="minus"&&+v.html()==1){
        if(confirm("確定要移除這個商品嗎?")){
            me.parents('.card').remove();
            cart.splice(cart.indexOf(pdc),1);
            bindCart();
        }
    }
    if(a=="minus"){
        if(+v.html()==1){
            me.find(`i`).removeClass("bx-minus");
            me.find(`i`).addClass("bx-trash");
        }
    }else{
        me.prev().prev().find(`i`).removeClass("bx-trash");
        me.prev().prev().find(`i`).addClass("bx-minus");
    }
});

$(`#cartbuy`).on('click',function(){
    postD("Order","InsertOrder",cart).then(x=>{
        if(x){
            console.log(data);
            order = data;
            bindView()
        }else{
            console.log(msg);
        }
    }).catch(x=>{
        console.log(x);
    })
    changePage("order");
});

$(`#cartC`).on('click',function(){
    if($(`#view`).data("page") != "pdc"){
        changePage("pdc");
    }
});

$(`#modalCenter`).on('click',function(e){
    let id = $(e.target).attr('id');
    if(id == 'cartC' || id == 'modalCenter' || id == 'MClose' || id == 'cartbuy'){
        console.log("重新更新carTable")
        postD("Car","UpdateCart",cart).then(x=>{
            if(x){
                order = data;
            }else{
                console.log(msg)
            }
        }).catch(x=>{console(x)})
    }
})