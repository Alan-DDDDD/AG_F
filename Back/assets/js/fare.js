getA("Fare","Get",null).then(x=>{
    if(x){
        bindT();
    }else{
        alert(msg);
    }
}).catch(x=>{
    alert(x);
});

$(`#select`).on(`click`,function(){
    getA(
        "Fare",
        "Get",
        `odprcmin=${$(`#q_odprcmin`).val().trim() || ""}&invaliddt=${$(`#q_invaliddt option:selected`).val() || ""}`)
    .then(x=>{
        if(x){
            bindT();
            $(`#qArea`).hide(130);
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    });
});

$(`#save`).on('click',function(){
    let p = {
        id : "",
        price : $(`#price`).data(`id`),
        odprcmin : $(`#odprcmin`).val(),
        invaliddt : $(`#invaliddt`).val()
    }
    let a = p.Pdid ? "Update":"Insert";
    postD("Fare",a,p,true).then(x=>{
        if(x){
            bindT();
            $(`#qArea`).hide(130);
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    }).finally(x=>{
        $(`#MClose`).click();
    });
});

$(`#farelist`).on(`click`,`.agree`,async function(){
    let me = $(this)
    let id = me.data("id");
    getD("Product","chgAgree",`pdid=${id}`,true).then(x=>{
        if(x){
            bindT();
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    });
});

$(`#farelist`).on(`click`,`.ud`,function(){
    let me = $(this);
    let id = me.data("id");
    let o = datalist.filter(x=>x.Pdid == id)[0];
    bindM(o);
});

$(`#nM`).on('click',function(){
    cM();
});

$(`.uimg`).on(`change`,function(){
    showimg(this);
});

function bindT(){
    let t = $(`#pdclist`);
    t.empty();
    $.each(datalist,(i,d)=>{
        let b = d.Agree == "Y";
        let ac = b ? "danger":"success";
        let at = b ? "下架":"上架";
        t.append(`<tr>
                      <td class="ud" data-id="${d.Pdid}" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#modalCenter">${d.Pdcnm}</td>
                      <td>${d.Price.numberFormat(0,".",",")}</td>
                      <td>${ddllist["unit"].filter(x=>x.Dataid == d.Unit)[0].Data}</td>
                      <td>${d.Stock.numberFormat(0,".",",")}</td>
                      <td>
                        <button 
                            type="button" class="btn btn-${ac} agree" data-id="${d.Pdid}">
                            ${at}
                        </button>
                      </td>
                    </tr>`);
    });
}

function bindM(o){
    $(`#bnd option`).removeAttr("selected").filter(`[value=${o.Brand}]`).attr(`selected`,true);
    $(`#item option`).removeAttr("selected").filter(`[value=${o.Item}]`).attr(`selected`,true);
    $(`#unit option`).removeAttr("selected").filter(`[value=${o.Unit}]`).attr(`selected`,true);
    o.Agree == "Y" ? $(`#agree`).attr("checked",true):$(`#agree`).removeAttr("checked");
    $(`#pdcnm`).val(o.Pdcnm);
    $(`#price`).val(o.Price);
    $(`#stock`).val(o.Stock);
    $(`#caution`).val(o.Caution);
    getD("Product","getFile",`pdid=${o.Pdid}`,false).then(x=>{
        if(x){
            $.each(data,(i,d)=>{
                let img = $(`img[name='pic${i+1}']`);
                if(d != ""){
                    img.attr("src",d)
                }else{
                    img.attr("src","../assets/img/backgrounds/nopic.jpg")
                }
            })
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    })
    $(`#save`).data('id',o.Pdid);
}

function cM(){
    $(`#bnd option`).removeAttr("selected");
    $(`#item option`).removeAttr("selected");
    $(`#unit option`).removeAttr("selected");
    $(`#agree`).removeAttr("checked");
    $(`#pdcnm`).val('');
    $(`#price`).val('');
    $(`#stock`).val('');
    $(`#caution`).val('');
    $(`#save`).removeAttr("data-id");
    $(`.pic`).attr("src","../assets/img/backgrounds/nopic.jpg");
}