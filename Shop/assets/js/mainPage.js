let i = $(`#ch`);
let js = i.val();

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
            uid = id;
            //console.log(window.localStorage.getItem(`LIFF_STORE:${liffId}:context`));
            h = new Headers({
                "ngrok-skip-browser-warning": "69420",
                "authorization": id,
                "type":"C"
              });
            hcj = new Headers({
                "ngrok-skip-browser-warning": "69420",
                "Content-Type":"application/json",
                "authorization":id,
                "type":"C"
              });
            getD("Login","Login",`LineId=${id}&type=C`,false).then(x=>{
                if(x){
                    getddl(["ITEM","UNIT","BND","LST"]).then(x=>{
                        if(x){
                            let bar = $(`.mybar`);
                            bar.empty();
                            $.each(ddllist["ITEM"],(i,d)=>{
                                bar.append(`<li data-id="${d.Dataid}"><h6>${d.Data}</h6></li>`);
                            })
                            getCart("Car","GetCart").then(x=>{
                                if(x){
                                    bindCart()
                                }else{
                                    console.log(msg);
                                }
                            }).catch(x=>{console.log(x)})
                        }else{
                            console.log(msg);
                        }
                    }).catch(x=>{console.log(x)});
                    if(js == 0){
                        let url = new URL(location.href);
                        let p = url.searchParams.get('page');
                        let page = "pdc";
                        if(p == 'codrlist'){
                            caseid = url.searchParams.get('caseid');
                            page = p;
                        }
                        reList(page);
                        reView(page);
                        i.val("OK");
                    }
                }else{
                    if(msg == "沒有權限"){
                            p = {
                                custnm:nm,
                                phone:"",
                                level:"1",
                                custid:id,
                                mail:mail
                            }
                            pgD("Login","Insert",p,"type=C",false).then(x=>{
                                let page = "pdc";
                                reList(page);
                                reView(page);
                                i.val("OK");
                            }).catch(x=>{alert(x);});
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
        changePage(id);
    }else{
        liff.login();
    }
    
    // if(id!="cart"){
    //     reList(id);
    //     reView(id).then(x=>{
    //         $(`#view`).data("page",id);
    //         let j = $(`.mysite`);
    //         j.css("opacity","0");
    //         $(`.mynav`).css("background-color","");
    //         j.data("view","N");
    //     });
    // }
    $(`#menuclose`).click();
})

function changePage(id){
    if(id!="cart"){
        reList(id);
        reView(id).then(x=>{
            $(`#view`).data("page",id);
            let j = $(`.mysite`);
            j.css("opacity","0");
            $(`.mynav`).css("background-color","");
            j.data("view","N");
        });
    }else if($(`#view`).data('page')!="order"){
        $(`#mycart`).click()
    }
}

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