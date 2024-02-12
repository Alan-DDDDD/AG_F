let i = $(`#ch`);
let js = i.val();
console.log(js);
var liffId = "2003018925-03bR6Jo3";
liff.init({
    liffId:liffId
}).then(async function(){
    alert("XX");
    liff.getProfile(async function(profile){
        alert(profile.userId);
        const name = profile.displayName;
        console.log(profile.displayName);
        console.log(profile.userId);
        console.log(profile);
        if(js == 0){
            let page = "pdc";
            reList(page);
            reView(page);
            //reJs(page);
            i.val("OK");
        }
    })
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

$(`#pageList li`).on(`click`,async function(event){
    event.preventDefault();
    let me = $(this);
    let id = me.attr("id");
    reList(id);
    await reView(id);
    //reJs(id);
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