
$(function(){
    getA("Order"
        ,"GetList"
        ,"s=ING&u="+uid)
    .then(x=>{
        if(x){
            let codrdatalist = $(`#codrdatalist`);
            codrdatalist.empty(); 
            $.each(datalist,(i,d)=>{
                codrdatalist.append(`
                    <div class="card mb-2">
                        <h5 class="card-header" id="codrcaseid">${d.caseorder.Csid}</h5>
                        <div class="card-body">
                            <div style="display: flex;margin:0 0.25rem">
                                <div class="text-start col-4">訂單狀態:</div>
                                <div class="text-end col-8">${d.caseStatus}</div>
                            </div>
                            <div style="display: flex;margin:0 0.25rem">
                                <div class="text-start col-4">取貨方式:</div>
                                <div class="text-end col-8">${d.methodNm}</div>
                            </div>
                            <div style="display: flex;margin:0 0.25rem">
                              <div class="text-start col-4">取貨人:</div>
                              <div class="text-end col-8">${d.addr ? d.addr.Name:""}</div>
                            </div>
                            <div style="display: flex;margin:0 0.25rem">
                              <div class="text-start col-4">電話:</div>
                              <div class="text-end col-8">${d.addr ? d.addr.Phone:""}</div>
                            </div>
                            <div style="display: flex;margin:0 0.25rem">
                              <div class="text-start col-4">地址:</div>
                              <div class="text-end col-8">${d.addr ? d.addr.Addr1:""}</div>
                            </div>
                            <div style="display: flex;margin:0 0.25rem">
                                <div class="text-start col-4">總金額:</div>
                                <div class="text-end col-8">$${d.caseorder.Total}</div>
                            </div>
                            <div style="display: flex;justify-content: flex-end;margin:0 0.25rem">
                                <button type="button" class="btn btn-primary codrbtn" data-id="${d.caseorder.Csid}" data-bs-toggle="modal" data-bs-target="#ordermodal">訂單細節</button>
                            </div>
                        </div>
                    </div>
                `);
            });
            if(caseid){
                bindM(caseid);
                $(`#autoclick`).click();
            }
        }else{
            alert(msg+',請聯繫客服人員!!');
        }
    }).catch(x=>{alert(x)})
})

$(`#codrdatalist`).on('click','.codrbtn',function(){
    let caseid = $(this).data("id");
    console.log(caseid);
    bindM(caseid);
});

function bindM(caseid){
    let t = $(`#odetailbody`);
    let o = datalist.filter(x=>x.caseorder.Csid == caseid)[0];
    if(!o){
        alert("沒有此筆訂單或訂單已經完成請至歷史訂單查詢");
        return;
    }
    t.empty();
    $.each(o.odetails,(i,d)=>{
        t.append(`<tr>
                    <td>${d.Product.Pdcnm}</td>
                    <td>${d.Odetail.Count}</td>
                    <td>${d.Odetail.Price}</td>
                    <td>${d.Odetail.Amount}</td>
                  </tr>`);
    });
    $(`#ordermodalTitle`).find('span').html(caseid)
}