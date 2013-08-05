#pragma strict

enum animEnum{ //enumerates the possible state of player.  Outside of Class
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

class __mt_IO_State_Anim extends __mt_IO_State{
  private   var anim    : tk2dAnimatedSprite ;

  private var animState : animEnum        ; //To be accessed by subclasses   ; !protected/private
  private var animClip  : String          ;
  private var animHold  : boolean = false ;

  function Start(){
    super.Start()                           ;
    anim = GetComponent(tk2dAnimatedSprite) ;
    animClip = "Idle";
    animState = animState.idle;
  }

  function LateUpdate () {
    super.LateUpdate() ;
    //Play_Clip()        ;
    animPlay(animClip);
  }

  function Set_Anim(IN_animState: animEnum){
    animState = IN_animState;
  }

  function Get_Anim():animEnum{
    return animState ;
  }

  function Set_Clip(IN_animClip:String){
    animClip = IN_animClip;
  }

  function Get_Clip():String{
    return animClip;
  }

  function Play_Clip(){
    //if(!animHold){
    animPlay(animClip);
    //}
  }

  function Set_animHold(IN_animHold:boolean){
    animHold = IN_animHold;
  }

  function Get_animHold():boolean{
    return animHold;
  }

  function animPlay(clip:String){
    if (!anim.IsPlaying(clip)) {  // Only play the clip if it is not already playing.
      if(!animHold){
        anim.Play(clip);            // Calling play will restart the clip if it is already playing.
      }
    }
  }

}
