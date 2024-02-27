$(`#addrP`).hide();
culTotal();
$(`#mtd`).on(`change`,function(){
    let v = $(`#mtd option:selected`).val();
    let addrprice = $(`#addrPrice`);
    switch(v){
        case 'N':
            $(`#addrP`).show(300);
            addrprice.html('70');
            break;
        case 'Y':
            $(`#addrP`).hide(300);
            addrprice.html('0');
            break;
    };
    culTotal();
});

function culTotal(){
    let a = +$(`#amount`).html();
    let ap = +$(`#addrPrice`).html();
    let t = $(`#total`);
    t.html(a+ap);
}