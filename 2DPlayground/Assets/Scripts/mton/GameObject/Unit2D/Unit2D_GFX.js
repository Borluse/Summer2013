#pragma strict

class Unit2D_GFX extends Unit2D{ //map state to animation playback

  protected var animState   : animEnum        ; //To be accessed by subclasses   ; !protected/private
  private   var animHold    : boolean = false ;

  // update Animation Playback 
  function Update () {
    super.Update() ;
    doPlayback()   ;    
  }

  function doPlayback(){
    if(!animHold){
      doClip()         ;
      _io_.Play_Clip() ;
    }
    if(animState != animEnum.duck){
      animHold = false;
    }
    _io_.Set_animHold(animHold);
  }

  function doClip(){
    if (animState == animEnum.walk) {
      _io_.Set_Clip("walk") ;
    }
    else if (animState == animEnum.fall) {
      _io_.Set_Clip("fall") ;
    }
    else if (animState == animEnum.dash) {
      _io_.Set_Clip("dash") ;
    }
    else if (animState == animEnum.duck){
      _io_.Set_Clip("duck") ;
      animHold = true       ;
    }
    else if (animState == animEnum.jump){
      _io_.Set_Clip("jump") ;
    }
    else {
      _io_.Set_Clip("idle") ;
    }
  }

}
