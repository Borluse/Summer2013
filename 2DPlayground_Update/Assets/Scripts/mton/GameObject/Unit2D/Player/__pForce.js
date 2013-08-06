#pragma strict
@script RequireComponent(__p_uXforms_User)        ; //shares all player state and anim info for add-ons to use ..character controller state not accessible directly

class __pForce extends __pUnit2D{                          //Force commands

  protected var uXforms : Transform[]   ; //stores eligible targets

  private var _ux_    : __p_uXforms_User ;
  private var uFirstB : boolean = true   ; //hightlight closest eligible target; else farthest

  private var pUnit2D : Unit2D ;

  private var animState : animEnum        ; //To be accessed by subclasses   ; !protected/private
  private var animLayer : boolean = false ; //layer animation on top of what's set so far?

  private var holdBool : boolean = false        ;  
  private var gPullDir : Vector3 = Vector3.zero ;  //pull/grapple direction
  private var velocity : Vector3 = Vector3.zero ;
  private var friction : float   = 0.125        ; 

  private var forceObj  : mt_OnHit2D_Force ; //object lift/push/warp
  private var pointObj  : mt_OnHit2D_Point ; //object grapple

  private var waitDurn : float = 0.35 ; //time (seconds until eligible for next hit)
  private var nextSwap : float = 0.0  ; //time until next psychic swap
  private var nextSwng : float = 0.0  ; //time until next psychic swing

  function Start(){
    super.Start();
    _ux_    = Get_UX()                    ;
    pUnit2D = pXform.GetComponent(Unit2D) ;
  }

  function Update(){
    super.Update() ;
    doUpdate()     ;
  }

  function LateUpdate () {  // Hack WTH : Order matters holdBool/dash-->uXforms-->super.LateUpdate()  
    super.LateUpdate() ;
    doControl()        ;    // HACK : Had to do in LateUpdate.  Unit2D_IO_PlayAnim does animation clip related functions in Update
  }

  function doUpdate(){
    uXforms   = _ux_.Get_uXforms() ;
    animState = _io_.Get_Anim()    ;
    animLayer = false              ;

    if (_io_.bJumpD) {  //WTH does this do? Threshold for jump->grapple
      nextSwng = Time.time + 0.35;
    }

  }

  function doControl(){
    if(holdBool){    //resolve grappling
      animLayer = true          ;
      animState = animEnum.jbll ;
      _io_.Set_Clip("jdsh")     ;
    }
    else if(bDash){   //resolve special moves state
      animLayer = true          ;
      if(animState == animEnum.jump){
        animState = animEnum.jdsh ;
      }
      else if(animState == animEnum.duck){
        animState = animEnum.ddsh ;
        _io_.Set_animHold(false)  ; //break ducking animation lock
        _io_.Set_Clip("ddsh")     ;
      }
    }
    if(uXforms){
      //psychic power only available while still, not moving
      forceObj = null;
      pointObj = null;
      if(bStill){  
        forceObj = uXforms[0].GetComponent(mt_OnHit2D_Force);
        if(forceObj){
          if(animState == animEnum.ddsh){       //psychic near object
            forceObj.go_Lift() ;
          }
          else{                                 //psychic far object
            if(Time.time > nextSwap){    
              if(Input.GetKey(KeyCode.X)){ 
                uFirstB = false                 ;  //switch UI highlight to farthest force object
              }
              else if(Input.GetKeyUp(KeyCode.X)){
                forceObj.go_Swap(pXform)        ;
                nextSwap = Time.time + waitDurn ;
                xplodeXforms(uXforms)           ;
                uFirstB = true                  ; //switch UI highlight to closest (default) force object
              }
            }
          }
        }
        if(Input.GetKeyUp(KeyCode.LeftAlt)){
          xplodeXforms(uXforms) ;
        }
      }
      else{  //search for pointobjects (grapple transport)
        if(animState != animEnum.dash){
          pointObj = uXforms[0].GetComponent(mt_OnHit2D_Point) ;
          if(pointObj){
            if(_io_.bJump){             //hold to grapple
              if(Time.time > nextSwng){
                holdBool         = true                                                                         ;
                pXform.position  = Vector3.SmoothDamp(pXform.position, uXforms[0].position, velocity, friction) ;
                pUnit2D.resetGravity()                                                                          ;
              }
            }
          }
        }
      }
    }
    else{
      //holdBool = false ;
    }

    if(_io_.bJumpU){ //grapple
      holdBool = false ;
    }
    if(animLayer){                //only override animation if layer = true
      _io_.Set_Anim(animState)  ;
      _io_.Play_Clip()          ; //HACK : Causing array error
    }
    _io_.Set_uFirstB(uFirstB)   ;
  }

  function xplodeXforms(xforms_IN:Transform[]){
    for(each in xforms_IN){
      var pushObj = each.GetComponent(mt_OnHit2D_Force) ;
      if(pushObj){
        pushObj.go_Push(xform) ;
      }
    }
  }

  function Get_UX():__p_uXforms_User{    
    var return_ux:__p_uXforms_User = xform.root.GetComponentInChildren(__p_uXforms_User) ;
    if(return_ux){
      print(this+"__pForce : Found __p_uXforms_User on xform and are attaching    : " + xform) ;
    }
    else{
      print("ERROR: "+this+"__pForce : Looking __p_uXforms_User on xform and also not found : ERROR IN STRUCTURE !" + xform);
    }
    return return_ux;
  }

}
