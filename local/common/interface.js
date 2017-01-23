$(function(){
  
  $('#runButton').bind('click', function(){
    var url = window.location.pathname; //暂定，根据实际情况再改
    $.ajax({
      url: url+'/update_answer',
      method: 'POST',
      data: {
        code: BlocklyInterface.getCode()
      }
    }).done(function(data){
      
    })
  })
  
})