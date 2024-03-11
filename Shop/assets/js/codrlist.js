$(function(){
    getA("Order","GetList","s=ING&u="+localStorage.getItem(`LIFF_STORE:2003018925-3RglVyA5:context`).userId)
    .then(x=>{
        if(x){
            
        }else{
            alert(msg);
        }
    }).catch(x=>{console.log(x)})
})