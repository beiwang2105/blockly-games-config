var scriptLevelID = null;

$(function(){

  initAnswer();
  
});

$('#runButton').bind('click', function(){
  $.ajax({
    url: 'http://studio.istemedu.com/api/v1/script_levels/update_user_level',
    method: 'POST',
    data: {
      id: scriptLevelId(),
      data: BlocklyInterface.getCode()
    },
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data){
    console.log(data);
  });
});

function initAnswer() {
  $.ajax({
    url: 'http://studio.istemedu.com/api/v1/script_levels/'+scriptLevelId(),
    method: 'GET',
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data){
    console.log(data);
  });
};

function scriptLevelId(){
  window.location.search.split(/[&\?]+/).forEach(function(str){
    var kAndV = str.split('=');
    if(kAndV[0] == 'script_level_id'){scriptLevelID = kAndV[1];}
  });
  return scriptLevelID;
};
