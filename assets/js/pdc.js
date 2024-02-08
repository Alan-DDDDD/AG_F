getdata("Product","Get",null).then(x=>{
    let table = $(`#pdclist`);
    $.each(datalist,(i,d)=>{
        console.log(d);
    });
}).catch(x=>{
    alert(msg);
})






$(`#save`).on('click',function(){
    let parame = {
        Brand : $(`#bnd option:selected`).val(),
        Pdcnm : $(`#pdcnm`).val(),
        Item : $(`#item option:selected`).val(),
        Price : $(`#price`).val(),
        Unit : $(`#unit option:selected`).val(),
        Stock : $(`#stock`).val(),
        Caution : $(`#caution`).val(),
        Agree : $(`#agree`).is(":checked")?"Y":"N",
        files : $(`#pdcpic`).files()
    }
});