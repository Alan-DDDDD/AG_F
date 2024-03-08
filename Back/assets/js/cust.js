getA("Cust","Get",null).then(x=>{
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
        "Cust",
        "Get",
        `custnm=${$(`#q_custnm`).val().trim() || ""}&agree=${$(`#q_agree option:selected`).val() || ""}`)
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

$(`#custlist`).on(`click`,`.agree`,async function(){
    let me = $(this)
    let id = me.data("id");
    getD("Cust","chgAgree",`custid=${id}`,true,'cust').then(x=>{
        if(x){
            bindT();
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    });
});

function bindT(){
    let t = $(`#custlist`);
    t.empty();
    $.each(datalist,(i,d)=>{
        let b = d.cust.Agree == "Y";
        let ac = b ? "danger":"success";
        let at = b ? "黑名單":"授權";
        t.append(`<tr>
                      <td>${d.cust.Custnm}</td>
                      <td>${d.count.numberFormat(0,".",",")}</td>
                      <td>${d.amount.numberFormat(0,".",",")}</td>
                      <td>${d.giveup.numberFormat(0,".",",")}</td>
                      <td>
                        <button 
                            type="button" class="btn btn-${ac} agree" data-id="${d.cust.Custid}">
                            ${at}
                        </button>
                      </td>
                    </tr>`);
    });
}