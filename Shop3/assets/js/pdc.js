const numberInput = document.getElementById('numberInput');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');

    incrementButton.addEventListener('click', () => {
        if(parseInt(numberInput.value) < 10){
            numberInput.value = parseInt(numberInput.value) + 1;
        }
    });

    decrementButton.addEventListener('click', () => {
        if(parseInt(numberInput.value) > 1){
            numberInput.value = parseInt(numberInput.value) - 1;
        }
    });