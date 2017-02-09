$('#runButton').bind('click', function(){
  $.ajax({
    url: 'http://studio.istemedu.com/api/v1/script_levels/answer',
    method: 'POST',
    data: {
      script: Blockly4Pi.Script,
      stage: Blockly4Pi.Stage,
      level: BlocklyGames.LEVEL,
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
    url: 'http://studio.istemedu.com/api/v1/script_levels/get_answer',
    method: 'GET',
    data: {
      script: Blockly4Pi.Script,
      stage: Blockly4Pi.Stage,
      level: BlocklyGames.LEVEL
    }
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data){
    console.log(data);
  });
};
