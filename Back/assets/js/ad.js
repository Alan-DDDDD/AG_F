var myedit = null;
ClassicEditor
.create(document.querySelector( 
        '#editor'), {
            fontColor: {
                colorPicker: {
                    // Use 'hex' format for output instead of 'hsl'.
                    format: 'hex'
                }
            },
            fontBackgroundColor: {
                // Do not display the color picker.
                colorPicker: false
            },
            toolbar: [
                'heading', 'bulletedList', 'numberedList', 'fontColor', 'fontBackgroundColor', 'undo', 'redo'
            ]
        })
.then(editor=>{
       console.log(editor);
       myedit = editor;
})
.catch(error=>{
       console.error(error);
});
$(`#save`).on('click',function(){
    console.log(myedit.getData());
})