$(function(){
    getddl(["ITEM","UNIT","BND","LST"]).then(x=>{
        if(x){
            let bar = $(`.mybar`);
            bar.empty();
            $.each(ddllist["ITEM"],(i,d)=>{
                bar.append(`<li data-id="${d.Dataid}"><h6>${d.Data}</h6></li>`);
            })
            getCart("Car","GetCart").then(x=>{
                if(x){
                    bindCart()
                }else{
                    console.log(msg);
                }
            }).catch(x=>{console.log(x)})
        }else{
            console.log(msg);
        }
    }).catch(x=>{console.log(x)});
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
    car.empty();
    $.each(cart,(i,d)=>{
        car.append(`
                    <div class="card mb-2 cart">
                      <div class="card-body" style="padding: 1rem 1.5rem;">
                          <div class="row">
                              <div class="col">
                                  <h5 class="card-title mb-2">${d.product.Pdcnm}</h5>
                                  <div class="pdclistbtngp" data-id="${d.product.Pdid}">
                                    <div class="pdcprice">$${d.product.Price.numberFormat(0,".",",")}</div>
                                    <div class="pdccount">
                                          <button class="countbtn countleft" data-action="minus"><i class='bx bx-minus'></i></button>
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
}
$(`.mybar`).on('click','li',function(){
    if($(this).parent().data("view")=="Y"){
        bindPdclist($(this).data("id"));
    }
});

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

$(`#cartbuy`).on('click',function(){
    changePage("order");
});

$(`#cartC`).on('click',function(){
    if($(`#view`).data("page") != "pdc"){
        changePage("pdc");
    }
});