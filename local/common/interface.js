$(function(){
  
  $('#runButton').bind('click', function(){
    var scriptLevelId = 0;
    window.location.search.split(/[&\?]+/).forEach(function(str){
      var kAndV = str.split('=');
      if(kAndV[0] == 'script_level_id'){scriptLevelId = kAndV[1];}
    });
    
    $.ajax({
      url: 'http://studio.istemedu.com/api/v1/script_levels/update_user_level',
      method: 'POST',
      data: {
        id: scriptLevelId,
        data: BlocklyInterface.getCode()
      },
      xhrFields: {
        withCredentials: true
      }
    }).done(function(data){
      console.log(data);
    });
  });
  
});
