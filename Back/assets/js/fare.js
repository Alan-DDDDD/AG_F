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
        `odprcmin=${$(`#q_odprcmin`).val().trim() || ""}&invalid=${$(`#q_invaliddt option:selected`).val() || ""}`)
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
    console.log($(`#invaliddt`).val())
    let p = {
        id : $(`#save`).data("id"),
        price : $(`#price`).val(),
        odprcmin : $(`#odprcmin`).val(),
        invaliddt : $(`#invaliddt`).val() || null
    }
    let a = p.id ? "Update":"Insert";
    postD("Fare",a,p,true,"fare").then(x=>{
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
    getD("Fare","chgAgree",`id=${id}`,true,'fare').then(x=>{
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
    let o = datalist.filter(x=>x.fare.Id == id)[0];
    bindM(o);
});

$(`#nM`).on('click',function(){
    cM();
});

function bindT(){
    let t = $(`#farelist`);
    t.empty();
    $.each(datalist,(i,d)=>{
        let b = d.INV == "N";
        let ac = b ? "danger":"success";
        let at = b ? "失效":"使用";
        t.append(`<tr>
                      <td class="ud" data-id="${d.fare.Id}" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#modalCenter">${d.fare.Price.numberFormat(0,".",",")}</td>
                      <td>${d.fare.Odprcmin.numberFormat(0,".",",")}</td>
                      <td>${(d.fare.Invaliddt || "").substring(0,10)}</td>
                      <td>
                        <button 
                            type="button" class="btn btn-${ac} agree" data-id="${d.fare.Id}">
                            ${at}
                        </button>
                      </td>
                    </tr>`);
    });
}

function bindM(o){
    $(`#price`).val(o.fare.Price);
    $(`#odprcmin`).val(o.fare.Odprcmin);
    if(o.fare.Invaliddt){
        let d = new Date(o.fare.Invaliddt);
        document.getElementById(`invaliddt`).valueAsDate = new Date(d.setDate(d.getDate()+1));
    }else{
        $(`#invaliddt`).val("");
    }
    // $(`#invaliddt`).val(new Date(o.fare.Invaliddt));
    $(`#save`).data('id',o.fare.Id);
}

function cM(){
    $(`#price`).val("");
    $(`#odprcmin`).val("");
    $(`#invaliddt`).val("");
    $(`#save`).data('id',0);
}

