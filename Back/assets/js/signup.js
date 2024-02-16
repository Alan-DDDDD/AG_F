$(`#signup`).on(`click`,async function(){
    let ph = $(`#phone`).val();
    let addr = $(`#addr`).val();
    if(ph && addr){
        let p = data;
        p.phone = ph;
        p.addr = addr;
        pgD("Login","Insert",p,"type=E",false).then(x=>{
            alert(msg);
            reView("pdc")
        }).catch(x=>{alert(x);});
    }else{
        alert("欄位都要輸入");
    }
});