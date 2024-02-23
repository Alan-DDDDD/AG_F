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
    let v = me.parent().find("input");
    if(a=="plus"&&+v.val()<10){
        v.val(+v.val()+1);
    }else if(a=="minus"&&+v.val()>1){
        v.val(+v.val()-1);
    }
});