if(caseid){
    getD("Order","Get","caseid="+caseid).then(x=>{
        console.log(data);
        alert(caseid);
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
    if(data.caseStatus == "棄單" || data.caseStatus == "完成"){
        $(`.modal-footer button`).attr('disabled',true)
    }else{

    }
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