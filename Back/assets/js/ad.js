const quill = new Quill("#editor", {
    theme: "snow",
  });

$(`#save`).on('click',function(){
    let data = $(`#editor .ql-editor`).html();
    console.log(data)
});