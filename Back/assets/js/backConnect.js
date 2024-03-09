{/* <script src="https://cdn.jsdelivr.net/npm/@microsoft/signalr@8.0.0/dist/cjs/index.min.js"></script> */}
var connect = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/chatHub").withAutomaticReconnect().build();

connect.start().then(()=>{
    connect.invoke("sendNewCase","O20240206001");
});

connect.on("Notify",function(msg){
    //alert(msg);
});

connect.on("IntoCase",function(o){
    //alert(msg);
    console.log(o);
    let page = $(`#pageList`).find('.active').attr('id');
    let notify = $(`#notifyicon`);
    let body = $(`#notifyBody`);
    body.append(`
    <div class="bs-toast toast fade show bg-dark mb-3" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <i class="bx bx-star bx-tada me-2"></i>
        <div class="me-auto fw-semibold">新進案件</div>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${o.caseorder.Csid}
      </div>
    </div>
    `);
    notify.addClass('bx-tada');
    setTimeout(x=>{
        notify.removeClass('tada');
    },5000);
    console.log(page);
    if(page === "odr"){
        let notify = $(`#notifyicon`)
        notify.addClass('bx-tada')
        setTimeout(x=>{
            notify.removeClass('tada');
        },5000);
    }
});