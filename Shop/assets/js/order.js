$(`#addrP`).hide();
getaddr();
bindOrder();
$(`.mycart`).hide();
$(function(){
    let lst = $(`#mtd`);
    lst.empty();
    $.each(ddllist["LST"],(i,d)=>{
        lst.append(`<option value="${d.Dataid}">${d.Data}</option>`)
    });
})
function getaddr(){
    getD("Addr","GetAddr").then(x=>{
        if(x){
            addr = data;
            let s = $(`#caddr`)
            s.empty();
            s.append('<option value="">請選擇</option>')
            $.each(addr,(i,d)=>{
                s.append(`<option value="${d.Id}">${d.Name+' '+d.Phone}</option>`)
            });
        }else{
            console.log(msg);
        }
    }).catch(x=>{console.log(x)})
}

culTotal();
$(`#mtd`).on(`change`,function(){
    let v = $(`#mtd option:selected`).val();
    let addrprice = $(`#addrPrice`);
    $(`#ordercul`).removeAttr('hidden');
    $(`#pay`).attr('hidden',true);
    switch(v){
        case 'N':
            $(`#addrP`).show(300);
            $(`#addaddr`).hide();
            order.Fare = 70;
            break;
        case '1':
            $(`#addrP`).hide(300);
            order.Fare = 0;
            //addrprice.html('0');
            break;
        default:
            $(`#addrP`).show(300);
            $(`#addaddr`).hide();
            order.Fare = 70;
            break;
    };
    if($(`#mtd option:selected`).val()=='1'){
        $(`#memo`).attr('placeholder',"註明自取時間")
    }else{
        $(`#memo`).attr('placeholder',"這裡可以標記小費")
    }
    bindView();
    //culTotal();
});

function culTotal(){
    let a = +$(`#amount`).html();
    let ap = +$(`#addrPrice`).html();
    let t = $(`#total`);
    t.html(a+ap);
}

$(`.addaddr`).on('click',function(){
    $(`#addaddr`).toggle();
});
$(`#sendaddr`).on('click',function(){
    let p = {
        id : 0,
        Custid : "",
        Addr1 : $(`#addr`).val(),
        Name : $(`#name`).val(),
        Phone : $(`#phone`).val(),
    };
    if(p.Phone.length > 10){
        alert("電話號碼不能高過10碼");
        return;
    }
    if(!p.Addr1 || !p.Name || !p.Phone){
        alert("取貨人,地址與電話不能空白");
        return;
    }
    postD("Addr","Insert",p).then(x=>{
        if(x){
            $(`#addaddr`).hide();
            getaddr();
        }else{
            console.log(msg);
        }
    }).catch(x=>{console.log(x)})
})

$(`#caddr`).on('change',function(){
    let v = $(this).find('option:selected').val();
    if(v==""){
        $(`#preaddr`).html("");
    }
    $(`#preaddr`).html(addr.filter(x=>x.Id == v)[0].Addr1);
})

$(`#pay`).on('click',function(){
    order.Addrid = $(`#caddr option:selected`).val();
    order.Method = $(`#mtd option:selected`).val();
    order.Memo = $(`#memo`).val();
    order.Total = order.Price + order.Fare;
    let p = {
        carts : cart,
        order:order
    };
    if(cart.length == 0){
        alert("趕快加入商品吧");
        cart = [];
        bindCart();
        return;
    }
    console.log(p)
    postD("Order","UpdateOrder",p).then(x=>{
        if(x){
            console.log(data);
        }else{
            alert("訂購成功");
            cart = [];
            bindCart();
            changePage("pdc");
        }
    }).catch(x=>{console.log(x)})
});

function bindOrder(){
    let od = $(`#orderbody`);
    od.empty();
    $.each(cart,(i,d)=>{
        od.append(`
                    <div class="card mb-2 order">
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
    if(order){
        bindView();
    }
}

$(`#orderbody`).on('click','.countbtn',function(){
    let me = $(this);
    let a = me.data('action');
    let v = me.parent().find(".pdccountval");
    let id = me.parents('.pdclistbtngp').data('id');
    let pdc = cart.filter(x=>x.product.Pdid == id)[0];
    if(a=="plus"){
        v.html(+v.html()+1);
        pdc.car.Count += 1; 
        order.Price += pdc.product.Price;
    }else if(a=="minus"&&+v.html()>1){
        v.html(+v.html()-1);
        pdc.car.Count -= 1; 
        order.Price -= pdc.product.Price;
    }else if(a=="minus"&&+v.html()==1){
        if(confirm("確定要移除這個商品嗎?")){
            cart.splice(cart.indexOf(pdc),1);
            order.Price -= pdc.product.Price;
            bindOrder();
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
    bindView()
});

function bindView(){
    $(`#amount`).html(order.Price || 0);
    $(`#addrPrice`).html(order.Fare || 0);
    $(`#total`).html(order.Price+order.Fare || 0);
}

$(`#ordercul`).on('click',function(){
    let amount = $(`#amount`).html();
    let mtd = $(`#mtd option:selected`);
    let n = ["1"]
    if(n.indexOf(mtd.val())>-1){
        $(`#pay`).removeAttr('hidden');
        $(`#ordercul`).attr('hidden',true);
        order.Fare = 0;
        bindView();
        return;
    }else{
        let addr = $(`#caddr option:selected`).val();
        if(!addr){
            alert("選擇 ["+mtd.html()+"] 需要選擇取貨人");
            return;
        }
    }
    getD("Fare","GetFare","amount="+amount).then(x=>{
        if(x){
            order.Fare = data;
            bindView();
            $(`#pay`).removeAttr('hidden');
            $(`#ordercul`).attr('hidden',true);
        }else{
            console.log(msg);
        }
    }).catch(x=>{console.log(x)})
})