{/* <script src="https://cdn.jsdelivr.net/npm/@microsoft/signalr@8.0.0/dist/cjs/index.min.js"></script> */}
var connect = new signalR.HubConnectionBuilder().withUrl("https://a12e-61-230-139-110.ngrok-free.app/chatHub").withAutomaticReconnect().build();
connect.start().then(()=>{
    connect.invoke("sendNewCase","O20240206001");
});

connect.on("Notify",function(msg){
    //alert(msg);
});