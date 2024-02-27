$(function(){
    bindPdclist($($(`.mybar`).find('li')[0]).data("id"));
});
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
    postD("Car","addCart",p,false,"cart").then(x=>{
        if(x){
            bindCart();
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    })
});

function bindPdclist(item){
    let list = $(`#pdclist`);
    getA("Product","Get"
        ,`bnd=&item=${item||1}&pdcnm=&agree=Y`)
        .then(x=>{
            if(x){
                list.empty();
                $.each(datalist,(i,d)=>{
                    list.append(`<div class="card mb-2">
                                    <div class="card-body" style="padding: 1rem 1.5rem;">
                                        <div class="row">
                                            <div class="col-4" style="padding: 0;">
                                                <img src="../assets/img/elements/17.jpg" style="width: 100%;"/>
                                            </div>
                                            <div class="col-8">
                                                <h5 class="card-title mb-2">${d.Pdcnm}</h5>
                                                <div class="card-subtitle text-muted mb-3">瓶</div>
                                                <p class="card-text">
                                                    備註
                                                </p>
                                                <div class="pdclistbtngp" data-id="1">
                                                    <div class="pdcprice">$159</div>
                                                    <div class="pdccount">
                                                        <button class="countbtn countleft" data-action="minus"><i class='bx bx-minus'></i></button>
                                                        <div class="pdccountval">1</div>
                                                        <button class="countbtn countright" data-action="plus"><i class='bx bx-plus'></i></button>
                                                    </div>
                                                    <!-- <i class='bx bxs-trash'></i> -->
                                                    <button type="button" class="btn btn-primary addcart">
                                                        <i class='bx bxs-cart-download'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
                });
            }else{
                console.log(msg);
            }
        }).catch(x=>{
            console.log(x);
        })
}

function bindCart(){

}

