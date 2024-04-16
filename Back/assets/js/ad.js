var myedit = null;
ClassicEditor
.create(document.querySelector( 
        '#editor'))
.then(editor=>{
       console.log(editor);
       myedit = editor;
})
.catch(error=>{
       console.error(error);
});