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