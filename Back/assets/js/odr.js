$(function(){
    getD("Cust","Get","agree=Y").then(x=>{
        if(x){
            let cust = $(`#qcust`);
            cust.empty();
            cust.append(`<option value="">全部</option>`)
            $.each(data,(i,d)=>{
                cust.append(`<option value="${d.cust.Custid}">${d.cust.Custnm}</option>`);
            })
        }
    })
    getA("Order","GetList").then(x=>{
        if(x){
            bintT();
            if(caseid){
                // getD("Order","Get","caseid="+caseid).then(x=>{
                //     console.log(data);
                //     //alert(caseid);
                // })
                data = datalist.filter(x=>x.caseorder.Csid == caseid);
                bindM();
                $(`#d`).click();
            }
        }else{
            alert(msg)
        }
    }).catch(x=>{alert(x)});
})



    
{/* <div style="display: flex;margin:0 0.25rem">
  <div class="text-start col-6">送貨狀態:</div>
  <div class="text-end col-6">${data.lgtStatus}</div>
</div> */}
function bintT(){
    let t = $(`#orderlist`);
    t.empty();
    $.each(datalist,(i,d)=>{
        t.append(`<tr data-bs-toggle="modal" data-bs-target="#modalCenter">
            <td>${d.caseorder.Csid}</td>
            <td>${d.caseorder.Total.numberFormat(0,".",",")}</td>
            <td>${d.methodNm}</td>
            <td>${d.caseStatus}</td>
            <td></td>
            </tr>`)
    });
}
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
                         <div class="text-end col-6">$${data.caseorder.Price.numberFormat(0,".",",")}</div>
                       </div>
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">取貨方式:</div>
                         <div class="text-end col-6">${data.methodNm}</div>
                       </div>
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">運費:</div>
                         <div class="text-end col-6">$${data.caseorder.Fare.numberFormat(0,".",",")}</div>
                       </div>
                       <div style="display: flex;margin:0 0.25rem">
                         <div class="text-start col-6">合計:</div>
                         <div class="text-end col-6">$${data.caseorder.Total.numberFormat(0,".",",")}</div>
                       </div>
                     </div>`);
    let t = $(`#ordertbody`);
    t.empty();
    $.each(data.odetails,(i,d)=>{
        t.append(`<tr>
            <td class="caseid">${i+1}</td>
            <td>${d.Product.Pdcnm}</td>
            <td>${d.Odetail.Count.numberFormat(0,".",",")}</td>
            <td>$${d.Odetail.Price.numberFormat(0,".",",")}</td>
            <td>$${d.Odetail.Amount.numberFormat(0,".",",")}</td>
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
            $(`.modal-footer button`).attr('disabled',true);
            break;
        case "自取":
        $(`.modal-footer button`).attr('disabled',true);
        $(`#done`).removeAttr('disabled');
            break;
        case "等待派件":
        case "保留自送":
            break;
    }
}
function mbtno(){
    $(`.modal-footer button`).removeAttr('disabled');
}
$(`#ordersearch`).on('click',function(){
    getA('Order','GetList',`s=${$(`#qcasestatus option:selected`).val()}&c=${$(`#qcaseid`).val()}&u=${$(`#qcust option:selected`).val()}`).then(x=>{
        if(x){
            bintT();
        }else{
            alert(msg);
        }
    }).catch(x=>{alert(x)});
});
$(`#orderlist`).on('click',"tr",function(){
    let me = $(this);
    caseid = me.find('td').html();
    console.log(caseid)
    data = datalist.filter(x=>x.caseorder.Csid==caseid)[0];
    bindM();
});

$(`#giveup`).on('click',function(){
    getD("Order","giveup","caseid="+caseid,true,"order").then(x=>{
        if(x){
            bintT();
            bindM();
        }else{
            alert(msg);
        }
    }).catch(x=>{alert(x)})
});
$(`#assign`).on('click',function(){
    getD("Order","LGS","caseid="+caseid,true,"order").then(x=>{
        if(x){
            bintT();
            bindM();
        }else{
            alert(msg);
        }
    }).catch(x=>{alert(x)})
});
$(`#keep`).on('click',function(){
    getD("Order","keep","caseid="+caseid,true,"order").then(x=>{
        if(x){
            bintT();
            bindM();
        }else{
            alert(msg);
        }
    }).catch(x=>{alert(x)})
});
$(`#custgiveup`).on('click',function(){
    if(confirm("是否為客戶惡意棄單?")){
        getD("Order","custgiveup","caseid="+caseid,true,"order").then(x=>{
            if(x){
                bintT();
                bindM();
            }else{
                alert(msg);
            }
        }).catch(x=>{alert(x)})
    }
});
$(`#done`).on('click',function(){
    if(confirm("請確認收取金額與案件編號正確?")){
        getD("Order","done","caseid="+caseid,true,"order").then(x=>{
            if(x){
                bintT();
                bindM();
            }else{
                alert(msg);
            }
        }).catch(x=>{alert(x)})
    }
});