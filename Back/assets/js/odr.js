if(caseid){
    getD("Order","Get","caseid="+caseid).then(x=>{
        console.log(data);
        alert(caseid);
        $(`#d`).click();
    })
}

function bindM(){
    let datapage = $(`#datapage`);
    datapage.empty();
    datapage.append(`<div class="col-6 border-end" style="padding: 0 0.25rem;">
    <div style="display: flex;margin:0 0.25rem">
      <div class="text-start col-6">訂單狀態:</div>
      <div class="text-end col-6">未接單</div>
    </div>
    <div style="display: flex;margin:0 0.25rem">
      <div class="text-start col-6">送貨:</div>
      <div class="text-end col-6">小張</div>
    </div>
    <div style="display: flex;margin:0 0.25rem">
      <div class="text-start col-6">送貨狀態:</div>
      <div class="text-end col-6">${data.methodNm}</div>
    </div>
  </div>
  <div class="col-6" style="padding: 0 0.25rem;">
    <div style="display: flex;margin:0 0.25rem">
      <div class="text-start col-6">總計:</div>
      <div class="text-end col-6">$577</div>
    </div>
    <div style="display: flex;margin:0 0.25rem">
      <div class="text-start col-6">取貨方式:</div>
      <div class="text-end col-6">外送</div>
    </div>
    <div style="display: flex;margin:0 0.25rem">
      <div class="text-start col-6">運費:</div>
      <div class="text-end col-6">$70</div>
    </div>
    <div style="display: flex;margin:0 0.25rem">
      <div class="text-start col-6">合計:</div>
      <div class="text-end col-6">$647</div>
    </div>
  </div>`)
}