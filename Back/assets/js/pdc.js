ddlp = ["bnd","item","unit"];
getddl(ddlp).then(x=>{
    if(x){
        bindDDL(ddlp);
        getA("Product","Get",null).then(x=>{
            if(x){
                bindT();
            }else{
                alert(msg);
            }
        }).catch(x=>{
            alert(x);
        });
    }else{
        alert(msg);
    }
}).catch(x=>{
    alert(x);
});

$(`#select`).on(`click`,function(){
    getA(
        "Product",
        "Get",
        `pdcnm=${$(`#q_pdcnm`).val().trim() || ""}&bnd=${$(`#q_bnd option:selected`).val() || ""}&item=${$(`#q_item option:selected`).val() || ""}&agree=${$(`#q_agree option:selected`).val() || ""}`)
    .then(x=>{
        if(x){
            bindT();
            $(`#qArea`).hide(130);
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    });
});
//
// $(`#save`).on('click',function(){
//     let p = {
//         Pdid : $(`#save`).data(`id`),
//         Brand : $(`#bnd option:selected`).val(),
//         Pdcnm : $(`#pdcnm`).val(),
//         Item : $(`#item option:selected`).val(),
//         Price : $(`#price`).val() || 0,
//         Unit : $(`#unit option:selected`).val(),
//         Stock : $(`#stock`).val() || 0,
//         Caution : $(`#caution`).val(),
//         Agree : $(`#agree`).is(":checked")?"Y":"N"
//     }
//     if(p.Brand =="" || p.Item == "" || p.Unit == ""){
//         alert("請將資料填寫齊全");
//     }else{

//         var form = new FormData();
//         let f = [
//             document.getElementById('pic1').files[0],
//             document.getElementById('pic2').files[0],
//             document.getElementById('pic3').files[0]
//         ]
//         for(let i = 0;i<f.length;i++){
//             if(f[i]){
//                 form.append(`files`,f[i],'Pic'+(i+1))
//             }
//         }
//         form.append(`json`,JSON.stringify(p));
//         let a = p.Pdid ? "Update":"Insert";
//         postFD("Product",a,form).then(x=>{
//             if(x){
//                 bindT();
//                 $(`#qArea`).hide(130);
//             }else{
//                 alert(msg);
//             }
//         }).catch(x=>{
//             alert(x);
//         }).finally(x=>{
//             $(`#MClose`).click();
//         });
//     }
// });

$(`#save`).on('click',async function(){
    let p = {
        Pdid : $(`#save`).data(`id`),
        Brand : $(`#bnd option:selected`).val(),
        Pdcnm : $(`#pdcnm`).val(),
        Item : $(`#item option:selected`).val(),
        Price : $(`#price`).val() || 0,
        Unit : $(`#unit option:selected`).val(),
        Stock : $(`#stock`).val() || 0,
        Caution : $(`#caution`).val(),
        Agree : $(`#agree`).is(":checked")?"Y":"N",
        Pic1 : $(`#pic1`).val()
    }
    if(p.Brand =="" || p.Item == "" || p.Unit == ""){
        alert("請將資料填寫齊全");
    }else{

        var form = new FormData();
        form.append(`json`,JSON.stringify(p));
        let f = [];
        for(let i=1 ;i<=3;i++){
            let pic = document.getElementById(`pic${i}`).files[0];
            if(pic){
                f.push(pic);
            }
        }
        const compressedFiles = [];
        let filesProcessed = 0;
        $.each(f,(i,d)=>{
            compressImage(d,async function(compressedImage) {
                compressedFiles.push(compressedImage);
                
                // 检查是否所有文件都已经处理完毕
                filesProcessed++;
                if (filesProcessed === f.length) {
                    // 所有文件都已处理完毕
                    
                    // 打包其他数据
                    $.each(compressedFiles,(ii,dd)=>{
                        form.append('files',dd,`Pic${ii+1}`);
                    })
                    
                    let a = p.Pdid ? "Update":"Insert";
                    postFD("Product",a,form).then(x=>{
                        if(x){
                            bindT();
                            $(`#qArea`).hide(130);
                        }else{
                            alert(msg);
                        }
                    }).catch(x=>{
                        alert(x);
                    }).finally(x=>{
                        $(`#MClose`).click();
                    });
                }
            });
        });
        if(f.length == 0){
            let a = p.Pdid ? "Update":"Insert";
            postFD("Product",a,form).then(x=>{
                if(x){
                    bindT();
                    $(`#qArea`).hide(130);
                }else{
                    alert(msg);
                }
            }).catch(x=>{
                alert(x);
            }).finally(x=>{
                $(`#MClose`).click();
            });
        }
    }
});

function compressImage(file, callback) {
    new Compressor(file, {
        quality: 0.1,
        success(result) {
            callback(result);
        },
        error(error) {
        },
    });
}

$(`#pdclist`).on(`click`,`.agree`,async function(){
    let me = $(this)
    let id = me.data("id");
    getD("Product","chgAgree",`pdid=${id}`,true).then(x=>{
        if(x){
            bindT();
        }else{
            alert(msg);
        }
    }).catch(x=>{
        alert(x);
    });
});

$(`#pdclist`).on(`click`,`.ud`,function(){
    let me = $(this);
    let id = me.data("id");
    let o = datalist.filter(x=>x.Pdid == id)[0];
    bindM(o);
});

$(`#nM`).on('click',function(){
    cM();
});

$(`.uimg`).on(`change`,function(){
    showimg(this);
});

function bindT(){
    let t = $(`#pdclist`);
    t.empty();
    $.each(datalist,(i,d)=>{
        let b = d.Agree == "Y";
        let ac = b ? "danger":"success";
        let at = b ? "下架":"上架";
        t.append(`<tr>
                      <td class="ud" data-id="${d.Pdid}" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#modalCenter">${d.Pdcnm}</td>
                      <td>${d.Price.numberFormat(0,".",",")}</td>
                      <td>${ddllist["unit"].filter(x=>x.Dataid == d.Unit)[0].Data}</td>
                      <td>${d.Stock.numberFormat(0,".",",")}</td>
                      <td>
                        <button
                            type="button" class="btn btn-${ac} agree" data-id="${d.Pdid}">
                            ${at}
                        </button>
                      </td>
                    </tr>`);
    });
}

function bindM(o){
    $(`#bnd option`).removeAttr("selected").filter(`[value=${o.Brand}]`).attr(`selected`,true);
    $(`#item option`).removeAttr("selected").filter(`[value=${o.Item}]`).attr(`selected`,true);
    $(`#unit option`).removeAttr("selected").filter(`[value=${o.Unit}]`).attr(`selected`,true);
    o.Agree == "Y" ? $(`#agree`).attr("checked",true):$(`#agree`).removeAttr("checked");
    $(`#pdcnm`).val(o.Pdcnm);
    $(`#price`).val(o.Price);
    $(`#stock`).val(o.Stock);
    $(`#caution`).val(o.Caution);
    $(`#pic1`).val(o.Pic1);
    // getD("Product","getFile",`pdid=${o.Pdid}`,false).then(x=>{
    //     if(x){
    //         $.each(data,(i,d)=>{
    //             let img = $(`img[name='pic${i+1}']`);
    //             if(d != ""){
    //                 img.attr("src",d)
    //             }else{
    //                 img.attr("src","../assets/img/backgrounds/nopic.jpg")
    //             }
    //         })
    //     }else{
    //         alert(msg);
    //     }
    // }).catch(x=>{
    //     alert(x);
    // })
    $(`#save`).data('id',o.Pdid);
}

function cM(){
    $(`#bnd option`).removeAttr("selected");
    $(`#item option`).removeAttr("selected");
    $(`#unit option`).removeAttr("selected");
    $(`#agree`).removeAttr("checked");
    $(`#pdcnm`).val('');
    $(`#price`).val('');
    $(`#stock`).val('');
    $(`#caution`).val('');
    $(`#save`).data("id",0);
    $(`.pic`).attr("src","../assets/img/backgrounds/nopic.jpg");
}

//圖檔瀏覽
async function showimg(input){
    let id = $(input).attr("id");
    let img = $(`img[name='${id}']`);
    if(input.files && input.files[0]){
      var reader = new FileReader();
      reader.onload = function(e){
        img.attr("src",e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }else if($(input).data("path")){
    //   let path = $(input).data("path");
    //   var response = await fetch(url + "/api/OrderCase/getFile?fileString="+path+"&user="+curruntid,{
    //     method : "Get",
    //     headers : new Headers({
    //       "ngrok-skip-browser-warning": "69420",
    //     }),
    //   })
    //   var file = await response.json();
    //   console.log(file)
    //   if(file.Status){
    //     view.attr("src",file.Data);
    //     view.css("max-heigth","100%");
    //     view.css("max-width","100%");
    //     view.css("object-fit","contain");
    //     $(`#imgmainwait`).remove();
    //     view.css("display","");
    //   }else{
    //     $(`#imgmainwait`).remove();
    //   }
    }
  }