#pragma strict

class Unit2D_GFX extends Unit2D{ //map state to animation playback

  protected var animState : animEnum        ; //To be accessed by subclasses ; !protected/private
  protected var animHold  : boolean = false ;
  protected var animMod   : int     = 0     ;

  private class AnimClipSource{
    public static var walk : String[] = ["walk","walk_00","walk_01","walk_02","walk_03"] ;
  }

  public class AnimClipPlay{
    public var walk : String ;
  }

  private  var animSource : AnimClipSource                    ; // = new AnimClipSource() ;
  private  var animClip   : AnimClipPlay = new AnimClipPlay() ;
/*
protected animEnum{ //enumerates the possible state of player.  Outside of Class
idle,
walk,
dash,
duck,
ddsh, //duck dash
jump,
jdsh, //jump dash
jbll, //jump ball
fall,
fdsh, //fall dash
attk,
powr,
spcl,
time  //time freeze
}
*/

  function Start(){
    super.Start()                                          ;
    var mod_Length   = animSource.walk.Length              ;
    animClip.walk    = animSource.walk[animMod%mod_Length] ;
    var mod_0:String = animSource.walk[0%mod_Length]       ;
    var mod_1:String = animSource.walk[1%mod_Length]       ;
    print("Unit2D_GFX Array : "+mod_1+animClip.walk)       ;
/*
for(each in animState){
print(" Unit2D_GFX : " + each);
}
*/
  }

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
      _io_.Set_Clip(animClip.walk) ;
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
