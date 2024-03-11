$(function(){
    getA("Order"
        ,"GetList"
        ,"s=ING&u="+JSON.parse(localStorage.getItem(`LIFF_STORE:2003018925-3RglVyA5:context`)).userId)
    .then(x=>{
        if(x){
            let list = $(`#codrlist`);
            list.empty();
            $.each(datalist,(i,d)=>{
                list.append(`
                    <div class="card mb-2">
                        <h5 class="card-header" id="codrcaseid">${d.cseorder.Csid}</h5>
                        <div class="card-body">
                            <div style="display: flex;margin:0 0.25rem">
                                <div class="text-start col-4">案件狀態:</div>
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
                            <button type="button" data-id="${d.cseorder.Csid}" data-bs-toggle="modal" data-bs-target="#modalCenter">訂單細節</button>
                        </div>
                    </div>
                `);
            });
        }else{
            alert(msg);
        }
    }).catch(x=>{console.log(x)})
})