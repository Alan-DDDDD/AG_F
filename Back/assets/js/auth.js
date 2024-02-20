getA("Auth","Get",null).then(x=>{
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
        "Auth",
        "Get",
        `nm=${$(`#q_nm`).val().trim() || ""}&type=${$(`#q_el option:selected`).val() || ""}&agree=${$(`#q_agree option:selected`).val() || ""}`)
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

$(`#authlist`).on(`click`,`.agree`,async function(){
    let me = $(this)
    let id = me.data("id");
    let type = me.data("type");
    getD("Auth","chgAgree",`id=${id}&type=${type}`,true).then(x=>{
        if(x){
            bindT();
            $(`#select`).click();
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    });
});

function bindT(){
    let t = $(`#authlist`);
    t.empty();
    $.each(datalist,(i,d)=>{
        let b = d.Agree == "Y";
        let ac = b ? "danger":"success";
        let at = b ? "取消":"授權";
        t.append(`<tr>
                      <td>${d.type}</td>
                      <td>${d.nm}</td>
                      <td>${d.phone}</td>
                      <td>${d.addr}</td>
                      <td>
                        <button 
                            type="button" class="btn btn-${ac} agree" data-id="${d.lineid}" data-type="${d.typeid}">
                            ${at}
                        </button>
                      </td>
                    </tr>`);
    });
}