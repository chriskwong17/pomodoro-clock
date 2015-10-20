
$(document).ready(function() { 
  var timerIsOn = false;
  var breakTime = false;
  var timerId;
  var audio = new Audio('http://myinstants.com/media/sounds/correct.swf.mp3');

  var presetTimer = {
    sessionLength:25,
    currentSessTimeSecs: 25*60,
    breakLength:5,
    currentBreakTimeSecs: 5*60    
  };
  
  //Set the default preset timer values on to the main text
  $("#breakValue").text(presetTimer.breakLength);
  $("#sessionValue").text(presetTimer.sessionLength);
  $("#sessionTimerValue").text(presetTimer.sessionLength);
  
  //Starts the Timer
  function TimerStart(){
    if(breakTime){
      timerId = setInterval(function(){
      if(presetTimer.currentBreakTimeSecs > 0){
        presetTimer.currentBreakTimeSecs = presetTimer.currentBreakTimeSecs - 1;
        var display = displayTime(presetTimer.currentBreakTimeSecs);
        $("#sessionTimerValue").text("BreakTime: " + display);
      }
      else{
        clearInterval(timerId);
        breakTime = false;
        presetTimer.currentBreakTimeSecs = presetTimer.breakLength*60;
        audio.play();
        TimerStart();
      }
    }, 1000);
      
    }else{
      timerId = setInterval(function(){
        if (presetTimer.currentSessTimeSecs > 0){
          presetTimer.currentSessTimeSecs = presetTimer.currentSessTimeSecs - 1;
          var display = displayTime(presetTimer.currentSessTimeSecs);
          $("#sessionTimerValue").text("Session Time: " + display);
        }else{
          clearInterval(timerId);
          breakTime = true;
          presetTimer.currentSessTimeSecs = presetTimer.sessionLength*60;
          audio.play();
          TimerStart();
        }
      }, 1000);
    }
  }
  
  function TimerStop(){
    clearInterval(timerId);
    timerId = null;
  }
  
function displayTime(currentTime){
   var hours   = Math.floor(currentTime / 3600);
   var minutes = Math.floor((currentTime - (hours * 3600)) / 60);
   var seconds = currentTime - (hours * 3600) - (minutes * 60);
   if (hours   < 10) {hours   = "0" + hours;}
   if (minutes < 10) {minutes = "0" + minutes;}
   if (seconds < 10) {seconds = "0" + seconds;}
   var time  = hours +':'+minutes+':'+seconds;
   return time;
}

function IncBreakValue (increment){
  if(increment){
    presetTimer.breakLength = presetTimer.breakLength + 1;
    presetTimer.currentBreakTimeSecs = presetTimer.currentBreakTimeSecs + convertMinsToSecs(1);
  }else{
    presetTimer.breakLength = presetTimer.breakLength - 1;
    presetTimer.currentBreakTimeSecs = presetTimer.currentBreakTimeSecs - convertMinsToSecs(1);
  }    
  $("#breakValue").text(presetTimer.breakLength);
}
function IncSessionValue(increment){
  if(increment){
    presetTimer.sessionLength = presetTimer.sessionLength + 1;
    presetTimer.currentSessTimeSecs = presetTimer.sessionLength*60;
  }else{
    presetTimer.sessionLength = presetTimer.sessionLength - 1;
    presetTimer.currentSessTimeSecs = presetTimer.sessionLength*60;
  }  
  $("#sessionValue").text(presetTimer.sessionLength); 
  $("#sessionTimerValue").text(presetTimer.sessionLength);
}
function convertMinsToSecs(min){
  return min*60;
}
  
  function disableIncDecButtons(){
    $("#btnincreBreak").prop("disabled",true);
    $("#btndecreBreak").prop("disabled",true);
    $("#btnincreSession").prop("disabled",true);
    $("#btndecreSession").prop("disabled",true);
  }
  function enableIncDecButtons(){
    $("#btnincreBreak").prop("disabled",false);
    $("#btndecreBreak").prop("disabled",false);
    $("#btnincreSession").prop("disabled",false);
    $("#btndecreSession").prop("disabled",false);
  }
  
  $("#btndecreBreak").click(function(){
    if(presetTimer.breakLength > 0){
      IncBreakValue(false);
    }
  });
  $("#btnincreBreak").click(function() {
    IncBreakValue(true);
  });
  $("#btndecreSession").click(function(){
      if(presetTimer.sessionLength > 0){
        IncSessionValue(false);
      }
  });
  $("#btnincreSession").click(function() {
      IncSessionValue(true);
  });
  
  //Main timer start button
  $("#btnStart").click(function() {
    if(!timerIsOn){
      $("#btnStart").text("Stop");
      timerIsOn = true;
      disableIncDecButtons();
      TimerStart();
    }
    else{
      $("#btnStart").text("Start");
      timerIsOn = false;
      enableIncDecButtons();
      TimerStop();
    }
  });
});