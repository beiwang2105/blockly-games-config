'use strict';

goog.provide('DataInterface');

goog.require('BlocklyGames');

function getXmlHttp(){
  var xmlhttp;
  if(window.XMLHttpRequest){xmlhttp = new XMLHttpRequest();}
  else{xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");};
  return xmlhttp;
};

DataInterface.loadStages = function(){
  var xmlhttp = getXmlHttp();
  xmlhttp.open("GET","http://studio.istemedu.com/api/v1/script_levels/stages?script="+BlocklyGames.SCRIPT+"&stage="+BlocklyGames.STAGE+"&level="+BlocklyGames.LEVEL,true);
  xmlhttp.withCredentials = true;
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("script="+BlocklyGames.SCRIPT+"&stage="+BlocklyGames.STAGE+"&level="+BlocklyGames.LEVEL+"&data="+encodeURI(BlocklyInterface.getCode()));
  
  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var result = JSON.parse(xmlhttp.responseText);
      var html = '<div style="display: block;" id="showStageAll"><table>';
      result['stages'].forEach(function(stage){
        html += '<tr><td>';
        html += stage.name;
        html += '</td><td>';
        stage['script_levels'].forEach(function(script_level){
          html += '<td>'
          html += '<a href='+script_level.link+'>'+script_level.position+'</a>'
          html += '</td>'
        });
        html += '</td></tr>';
      });
      html += '</table></div>';
      
      var showStageMenu = document.createElement("span");
      
      document.getElementById('levels').appendChild(showStageMenu);
      showStageMenu.innerHTML = "<span id='stage_menu'>▼</span>";
      showStageMenu.onclick = function(){document.getElementById('stage_menu').innerText = '▼';};
      document.getElementById('stage_menu').onclick = function(){BlocklyDialogs.showStages(html);};
    };
  };
};

DataInterface.loadUserInfo = function(){
	var xmlhttp;
	if(window.XMLHttpRequest){xmlhttp = new XMLHttpRequest();}
	else{xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");};
	xmlhttp.open("GET","http://studio.istemedu.com/api/v1/users/info",true);
	xmlhttp.withCredentials = true;
	xmlhttp.send();

  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var result = JSON.parse(xmlhttp.responseText);
      var userNameButton = document.getElementById('user-name');
      userNameButton.innerHTML = "<span>"+result['name']+"</span><span id='user_menu_glyph'>▼</span>";
      userNameButton.onclick = function(){
        var userInfo = document.getElementById('user-info');
        var userMenuGlyph = document.getElementById('user_menu_glyph');
        if(userInfo.getAttribute('style') != 'display: block;'){
          userInfo.setAttribute('style', 'display: block;');
          userMenuGlyph.innerText = '▲'
        }else{
          userInfo.setAttribute('style', 'display: none;');
          userMenuGlyph.innerText = '▼'
        }
      }
      var html = ''
      if(result['teacher'] == true){html += '<a href="http://www.istemedu.com/teacher-dashboard">教师主页</a>'};
      html += '<a href="http://studio.istemedu.com/">代码工作室</a><a href="http://studio.istemedu.com/users/edit">我的账户</a><a href="http://studio.istemedu.com/users/sign_out">注销</a>'
      document.getElementById('user-info').innerHTML = html;      
			if(result['admin'] != null && result['admin'] == true){
				document.getElementById('admin-buttons').setAttribute('style', 'display: inline-flex;width:50%;justify-content: flex-end;')
				document.getElementById('user-buttons').setAttribute('style', 'display: inline-flex;width:50%;')
			};
		};
	};
};

DataInterface.checkButtonClick = function(e){
  var xmlhttp = getXmlHttp();
  xmlhttp.open("GET","http://studio.istemedu.com/api/v1/script_levels/get_answer?script="+BlocklyGames.SCRIPT+"&stage="+BlocklyGames.STAGE+"&level="+BlocklyGames.LEVEL,true);
  xmlhttp.withCredentials = true;
  xmlhttp.send();

  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var result = JSON.parse(xmlhttp.responseText);
      if(result['ideal_level_source'] != null && result['ideal_level_source']['data'] != null){
        if(Blockly4Pi.compare(result['ideal_level_source']['data'])){
          alert(BlocklyGames.getMsg("The_answer_is_correct"));
        }else{
          alert(BlocklyGames.getMsg("The_answer_is_wrong"));
        }
      }else{
        alert(BlocklyGames.getMsg("Check_failed"));
      };
    };
  };
};

DataInterface.loadButtonClick = function(){
  var xmlhttp = getXmlHttp();
  xmlhttp.open("GET","http://studio.istemedu.com/api/v1/script_levels/get_answer?script="+BlocklyGames.SCRIPT+"&stage="+BlocklyGames.STAGE+"&level="+BlocklyGames.LEVEL,true);
  xmlhttp.withCredentials = true;
  xmlhttp.send();

  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var result = JSON.parse(xmlhttp.responseText);
      if(result['user_level'] != null && result['user_level']['data'] != null){
        BlocklyInterface.setCode(result['user_level']['data']);
      };
    };
  };
};

DataInterface.standardAnswerClick = function(e){
  var xmlhttp = getXmlHttp();
  xmlhttp.open("POST","http://studio.istemedu.com/api/v1/script_levels/admin_answer",true);
  xmlhttp.withCredentials = true;
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("script="+BlocklyGames.SCRIPT+"&stage="+BlocklyGames.STAGE+"&level="+BlocklyGames.LEVEL+"&data="+encodeURI(BlocklyInterface.getCode()));

  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      alert(BlocklyGames.getMsg("Saved_successfully"));
    };
  };
};
