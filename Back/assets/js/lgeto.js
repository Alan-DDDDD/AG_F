liffId = "2003018925-rwkag21V";

liff.init({
    liffId:liffId
}).then(function(){
    if(liff.isLoggedIn()){
        let nm;
        let id;
        let mail;
        liff.getProfile().then((profile) => {
            console.log(profile);
            nm = profile.displayName;
            id = profile.userId;
            let user = liff.getDecodedIDToken();
            console.log(user);
            mail = user.email;
            console.log(window.localStorage.getItem(`LIFF_STORE:${liffId}:context`));
            h = new Headers({
                "ngrok-skip-browser-warning": "69420",
                "authorization": id,
                "type":"L"
              });
            hcj = new Headers({
                "ngrok-skip-browser-warning": "69420",
                "Content-Type":"application/json",
                "authorization":id,
                "type":"L"
              });
            getD("Login","Login",`LineId=${id}&type=L`,false).then(x=>{
                if(x){
                    if(js == 0){
                        let page = "pdc";
                        reList(page);
                        reView(page);
                        //reJs(page);
                        i.val("OK");
                    }
                }else{
                    if(msg == "沒有權限"){
                        if(confirm(msg+",是否申請員工權限?")){
                            data = {
                                emplnm:nm,
                                phone:"",
                                addr:"",
                                lineid:id,
                                linemail:mail
                            }
                            reView("signup");   
                        }
                    }else{
                        alert(msg);
                    }
                }
            }).catch(x=>{
                alert(x);
            });
        }).catch((err)=>{
            console.log(err);
            window.localStorage.clear();
            window.sessionStorage.clear();
            
            liff.login();
        });
    }else{
        liff.login();
    }
}).catch((x)=>{
 alert(x);
});