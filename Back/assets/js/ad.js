$('#summernote').summernote({
    tabsize: 2,
    height: 200,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ]
  });
$(function(){
    getD("Ad","Get").then(x=>{
        if(x){
            $('#summernote').summernote('code', data);
        }
    }).catch(x=>{
        console.log(x)
    })
})
$(`#save`).on('click',function(){
    let data = $('#summernote').summernote('code');
    console.log(data)
    postD("Ad","Ad",{ad:data}).then(x=>{
        if(!x){
            alert(msg);
        }
    });
})