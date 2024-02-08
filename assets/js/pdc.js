$(`#save`).on('click',function(){
    let parame = {
        brand : $(`#bnd option:selected`).val(),
        item : $(`#item option:selected`).val(),
        pdcnm : $(`#pdcnm`).val(),
        price : $(`#price`).val(),
        unit : $(`#unit option:selected`).val(),
        stock : $(`#stock`).val(),
        agree : $(`#agree`).is(":checked")?"Y":"N"
    }
});