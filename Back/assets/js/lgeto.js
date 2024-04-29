liffId = "2003018925-rwkag21V";

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
                    let u = location.href;
                    console.log(u);
                    let p = location.search;
                    console.log(p);
                    getA("Order","GetList","s=ING").then(x=>{
                      if(x){
                          bintT();
                          if(caseid){
                              data = datalist.filter(x=>x.caseorder.Csid == caseid)[0];
                              bindM();
                              $(`#d`).click();
                          }
                      }else{
                          alert(msg)
                      }
                  }).catch(x=>{alert(x)});
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

function lgeto(){
  getD("Transportation","lgeto",p.substring(1),false).then(x=>{
    if(data == "此訂單取消或是動作慢了一點"){
        liff.sendMessages([{
            type:"flex",
            altText:"系統回報",
            contents:{
                type: "bubble",
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "系統訊息",
                      weight: "bold",
                      size: "xl"
                    },
                    {
                      type: "text",
                      text: data
                    }
                  ]
                }
            }
        }]).then(() => {
              console.log('message sent');
            }).catch((err) => {
              console.log('error', err);
            });
    }else{
        liff.sendMessages([{
            type:"flex",
            altText:"系統回報",
            contents:{
                type: "bubble",
                body: {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "系統訊息",
                      weight: "bold",
                      size: "xl"
                    },
                    {
                      type: "text",
                      text: data
                    }
                  ]
                },
                footer: {
                    type: "box",
                    layout: "vertical",
                    spacing: "sm",
                    contents: [
                      {
                        type: "button",
                        style: "primary",
                        height: "sm",
                        action: {
                          type: "uri",
                          label: "訂單回報",
                          uri: "https://liff.line.me/2003018925-Z2qY8m6R"
                        }
                      }
                    ],
                    flex: 0
                  }
            }
        }]).then(() => {
              console.log('message sent');
            }).catch((err) => {
              console.log('error', err);
            });
    }
    //liff.closeWindow();
  }).catch(x=>{
      alert(x);
  })
}
function bintT(){
  let t = $(`#orderlist`);
  t.empty();
  $.each(datalist,(i,d)=>{
      t.append(`<tr data-bs-toggle="modal" data-bs-target="#modalCenter">
          <td>${d.caseorder.Csid}</td>
          <td>${d.caseorder.Total.numberFormat(0,".",",")}</td>
          <td>${d.methodNm}</td>
          <td>${d.caseStatus}</td>
          </tr>`)
  });
}

function bindM(){
  let title = $(`#modalCenterTitle`).find('span');
  title.html(caseid);
  let datapage = $(`#datapage`);
  datapage.empty();
  datapage.append(`<div class="col-6 border-end" style="padding: 0 0.25rem;">
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">訂單狀態:</div>
                       <div class="text-end col-8">${data.caseStatus}</div>
                     </div>
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">送貨:</div>
                       <div class="text-end col-8">${data.lgtnm || ""}</div>
                     </div>
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">取貨人:</div>
                       <div class="text-end col-8">${data.addr ? data.addr.Name : ""}</div>
                     </div>
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">電話:</div>
                       <div class="text-end col-8">${data.addr ? data.addr.Phone : ""}</div>
                     </div>
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-2">地址:</div>
                       <div class="text-end col-10"><a href="https://www.google.com/maps/place/${data.addr ? data.addr.Addr1 : ""}" target="_blank">${data.addr ? data.addr.Addr1 : ""}</a></div>
                     </div>
                     
                   </div>
                   <div class="col-6" style="padding: 0 0.25rem;">
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">總計:</div>
                       <div class="text-end col-8">$${data.caseorder.Price.numberFormat(0,".",",")}</div>
                     </div>
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">取貨方式:</div>
                       <div class="text-end col-8">${data.methodNm}</div>
                     </div>
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">運費:</div>
                       <div class="text-end col-8">$${data.caseorder.Fare.numberFormat(0,".",",")}</div>
                     </div>
                     <div style="display: flex;margin:0 0.25rem">
                       <div class="text-start col-4">合計:</div>
                       <div class="text-end col-8">$${data.caseorder.Total.numberFormat(0,".",",")}</div>
                     </div>
                   </div>`);
  let t = $(`#ordertbody`);
  t.empty();
  $.each(data.odetails,(i,d)=>{
      t.append(`<tr>
          <td class="caseid">${i+1}</td>
          <td>${d.Product.Pdcnm}</td>
          <td>${d.Odetail.Count.numberFormat(0,".",",")}</td>
          <td>$${d.Odetail.Price.numberFormat(0,".",",")}</td>
          <td>$${d.Odetail.Amount.numberFormat(0,".",",")}</td>
      </tr>`)
  });
  bindbtn();
}