// const numberInput = document.getElementById('numberInput');
//     const incrementButton = document.getElementById('increment');
//     const decrementButton = document.getElementById('decrement');

//     incrementButton.addEventListener('click', () => {
//         if(parseInt(numberInput.value) < 10){
//             numberInput.value = parseInt(numberInput.value) + 1;
//         }
//     });

//     decrementButton.addEventListener('click', () => {
//         if(parseInt(numberInput.value) > 1){
//             numberInput.value = parseInt(numberInput.value) - 1;
//         }
//     });

$(`.pdccount`).on('click','.countbtn',function(){
    let me = $(this);
    let a = me.data('action');
    let v = me.parent().find(".pdccountval");
    if(a=="plus"&&+v.html()<10){
        v.html(+v.html()+1);
    }else if(a=="minus"&&+v.html()>1){
        v.html(+v.html()-1);
    }
});