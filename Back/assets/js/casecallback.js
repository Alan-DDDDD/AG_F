liffId = "2003018925-Z2qY8m6R";

liff.init({
    liffId:liffId
}).then(function(){
    if(liff.isLoggedIn()){
        let nm;
        let id;
        let mail;
        liff.getProfile().then((profile) => {
            //console.log(profile);
            nm = profile.displayName;
            id = profile.userId;
            let user = liff.getDecodedIDToken();
            //console.log(user);
            mail = user.email;
            //console.log(window.localStorage.getItem(`LIFF_STORE:${liffId}:context`));
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
                    liff.scanCodeV2().then((result) => {
                          // result = { value: "" }
                          getD("Transportation","getodr",result.value).then(x=>{
                            if(x){
                                alert(data);
                            }else{
                                alert(msg);
                            }
                          }).catch(x=>{alert(x)});
                        }).catch((error) => {
                          console.log("error", error);
                        });
                }else{
                    if(msg == "沒有權限"){

                        data = {
                            lgtnm:nm,
                            phone:"",
                            addr:"",
                            lgtid:id,
                            mail:mail
                        };
                        pgD("Login","Insert",data,"type=L",false).then(x=>{
                            if(x){
                                console.log("xxx");
                            }else{
                                alert(msg);
                            }
                        }).catch(x=>{
                            alert(x);
                        });
                    }else{
                        alert(msg);
                        liff.closeWindow();
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