if(caseid){
    getD("Order","Get","caseid="+caseid).then(x=>{
        console.log(data);
        //alert(caseid);
        bindM();
        $(`#d`).click();
    })
}
{/* <div style="display: flex;margin:0 0.25rem">
  <div class="text-start col-6">送貨狀態:</div>
  <div class="text-end col-6">${data.lgtStatus}</div>
</div> */}
function bindM(){
    let title = $(`#modalCenterTitle`).find('span');
    title.html(caseid);
    let datapage = $(`#datapage`);
    datapage.empty();
    datapage.append(`<div class="col-6 border-end" style="padding: 0 0.25rem;">
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">訂單狀態:</div>
                         <div class="text-end col-6">${data.caseStatus}</div>
                       </div>
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">送貨:</div>
                         <div class="text-end col-6">${data.lgtnm}</div>
                       </div>
                       
                     </div>
                     <div class="col-6" style="padding: 0 0.25rem;">
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">總計:</div>
                         <div class="text-end col-6">$${data.caseorder.Price}</div>
                       </div>
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">取貨方式:</div>
                         <div class="text-end col-6">${data.methodNm}</div>
                       </div>
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">運費:</div>
                         <div class="text-end col-6">$${data.caseorder.Fare}</div>
                       </div>
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">合計:</div>
                         <div class="text-end col-6">$${data.caseorder.Total}</div>
                       </div>
                     </div>`);
    let t = $(`#ordertbody`);
    t.empty();
    $.each(data.odetails,(i,d)=>{
        t.append(`<tr>
            <td>${i+1}</td>
            <td>${d.Product.Pdcnm}</td>
            <td>${d.Odetail.Count}</td>
            <td>$${d.Odetail.Price}</td>
            <td>$${d.Odetail.Amount}</td>
        </tr>`)
    });
    bindbtn();
}

function bindbtn(){
    let s = data.caseStatus;
    mbtno();
    switch(s){
        case "棄單":
        case "完成":
        case "送貨中":
        case "自取":
            $(`.modal-footer button`).attr('disabled',true);
            break;
        case "等待派件":
        case "保留自送":
            break;
    }
}
function mbtno(){
    $(`.modal-footer button`).removeAttr('disabled');
}

$(`#giveup`).on('click',function(){
    getD("Order","giveup","caseid="+caseid).then(x=>{
        if(x){
            alert(msg);
        }else{
            alert(msg);
        }
    }).catch(x=>{alert(x)})
});
$(`#assign`).on('click',function(){
    getD("Order","LGS","caseid="+caseid).then(x=>{
        if(x){
            alert(msg);
        }else{
            alert(msg);
        }
    }).catch(x=>{alert(x)})
});
$(`#keep`).on('click',function(){
    getD("Order","keep","caseid="+caseid).then(x=>{
        if(x){
            alert(msg);
        }else{
            alert(msg);
        }
    }).catch(x=>{alert(x)})
});
$(`#custgiveup`).on('click',function(){
    if(confirm("是否為客戶惡意棄單?")){
        getD("Order","custgivewup","caseid="+caseid).then(x=>{
            if(x){
                alert(msg);
            }else{
                alert(msg);
            }
        }).catch(x=>{alert(x)})
    }
});
$(`#done`).on('click',function(){
    if(confirm("請確認收取金額與案件編號正確?")){
        getD("Order","done","caseid="+caseid).then(x=>{
            if(x){
                alert(msg);
            }else{
                alert(msg);
            }
        }).catch(x=>{alert(x)})
    }
});