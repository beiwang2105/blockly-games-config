function initAnswer(){
  $.ajax({
    url: 'http://studio.istemedu.com/api/v1/script_levels/get_answer',
    method: 'GET',
    data: {
      script: params['script'],//Blockly4Pi.Script,
      stage: params['stage'],//Blockly4Pi.Stage,
      level: params['level']//BlocklyGames.LEVEL
    },
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data){
    console.log(data);
    if(data['user_level'] != null && data['user_level']['data'] != null){
      BlocklyInterface.setCode(data['user_level']['data']);
    };
  });
};

function saveAnswer(){
  $.ajax({
    url: 'http://studio.istemedu.com/api/v1/script_levels/answer',
    method: 'POST',
    data: {
      script: params['script'],//Blockly4Pi.Script,
      stage: params['stage'],//Blockly4Pi.Stage,
      level: params['level'],//BlocklyGames.LEVEL
      data: BlocklyInterface.getCode()
    }
  }).done(function(data){
    console.log(data);
  });
};

function standardAnswer(){
  $.ajax({
    url: 'http://studio.istemedu.com/api/v1/script_levels/admin_answer',
    method: 'POST',
    data: {
      script: params['script'],//Blockly4Pi.Script,
      stage: params['stage'],//Blockly4Pi.Stage,
      level: params['level'],//BlocklyGames.LEVEL
      data: BlocklyInterface.getCode()
    }
  }).done(function(data){
    console.log(data);
  });
}

var params = {};
function getScriptLevel(){
  window.location.search.split(/[&\?]+/).forEach(function(str){
    var kAndV = str.split('=');
    params[kAndV[0]] = kAndV[1];
  });
};

getScriptLevel();
