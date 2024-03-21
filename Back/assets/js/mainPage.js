let i = $(`#ch`);
let js = i.val();
console.log(js);

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
                "type":"E"
              });
            hcj = new Headers({
                "ngrok-skip-browser-warning": "69420",
                "Content-Type":"application/json",
                "authorization":id,
                "type":"E"
              });
            pfdid = id;
            getD("Login","Login",`LineId=${id}&type=E`,false).then(x=>{
                if(x){
                    if(js == 0){
                        let url = new URL(location.href);
                        let p = url.searchParams.get('page');
                        let page = "pdc";
                        if(p == 'odr'){
                            caseid = url.searchParams.get('caseid');
                            page = p;
                        }
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
// if(js == 0){
//     let page = "pdc";
//     reList(page);
//     reView(page);
//     //reJs(page);
//     i.val("OK");
// }

$(`#pageList li`).on(`click`,function(event){
    event.preventDefault();
    let me = $(this);
    let id = me.attr("id");
    if(liff.isLoggedIn()){
        reList(id);
        reView(id);
        //reJs(id);
        caseid = null;
    }else{
        liff.login();
    }
    // reList(id);
    //     reView(id);
})

function reList(page){
    let lis = $(`#pageList li`);
    $.each(lis,(i,d)=>{
        $(d).removeClass("active");
    });
    $(`#`+page).addClass("active")
}

async function reView(page){
    let view = $(`#view`);
    //var r = await fetch("https://alan-ddddd.github.io/AG_F/html/"+page+".html");
    var r = await fetch("../html/"+page+".html");
    var t = await r.text();
    view.html(t);
    reJs(page);
}

function reJs(page){
    let js = $(`.myjs`);
    $.each(js,function(i,d){
        $(d).remove();
    });
    let script = document.createElement('script');
    script.src = "../assets/js/"+page+".js";
    script.classList.add("myjs");
    document.body.appendChild(script);
}

$(`#view`).on(`click`,`#qBar`,function(){
    $(`#qArea`).toggle(130);
});

$(`#notifyicon`).on('click',function(){
    $(this).removeClass('bx-tada');
})