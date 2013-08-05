#pragma strict

function Update () {	
	if(mton_GLOBAL.uiTimeBool===true){
		Time.timeScale = 0.5;	
	}
	else{
		Time.timeScale = 1.0;
	}
}
