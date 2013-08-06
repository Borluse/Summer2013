#pragma strict
@script RequireComponent(CharacterController) ;
@script RequireComponent(__mt_IO_State_Anim)  ; //shares all player state and anim info for add-ons to use ..character controller state not accessible directly

class Unit2D extends __gameObjectMT{
  protected var _io_    : __mt_IO_State_Anim     ; //object to share player state and animation...character controller state not accessible directly

  protected var control : CharacterController    ;
  protected var move    : Vector3 = Vector3.zero ;
  protected var sleepB  : boolean = false        ; //for AI

  protected var bStill : boolean = false ; //Is obj not moving?
  protected var dash   : boolean = false ;
  protected var hFlip  : float   = 1.0   ; //which side is character facing

  protected var gravity : Vector3 = Vector3.zero ;
  protected var jump    : boolean = false        ;
  protected var vy      : float   = 0.0          ;

  protected var hitB    : boolean = false                  ; //hitback == jump variant
  public    var hitDir  : Vector3 = Vector3(0.3, 1.0, 0.0) ;
  public    var hitMag  : float   = 2.5                    ;

  private var moveSpeed : float = 1.0            ; //HACK:Must be set to one else fall through ground. IO will normalize to zero per frame.
  private var termVeloc : float = 54.0           ; //Terminal velocity : 54 = a skydiver free-fall to earth according to wikipedia

  var dashSpeed : float = 3.0    ;
  var jumpSpeed : float = 4.25   ;
  var weightMul : float = 1.0    ;
  var accelY    : float = 0.015  ;

  function Awake(){  //WTF : Unity crashes if subclass tries to access Awake function and it doesn't exist.
    super.Awake();
  }

  function Start(){
    control = GetComponent(CharacterController);
    if(!control){
      Debug.LogError("Unit.Start() "+name+" has no CharacterController.") ;
      enabled=false                                                       ;
    }
    _io_ = Get_IO()                                                       ;
  }

  function Update(){
    if(queryUserInput){
      doMove()               ;
      xform.position.z = 0.0 ; //ensures character is at 0.0 2D plane
    }
  }

  function LateUpdate(){
    super.LateUpdate()   ;
    hFlip  = _io_.hFlip  ; 
    bStill = _io_.bStill ; 
  }

  function doMove(){

    if(!control.isGrounded){  // Very Clippy : Was the CharacterController touching the ground during the last move? 
      gravity   += Physics.gravity * weightMul * Time.deltaTime ;
      gravity.y -= vy                                           ; //apply gravity when in air
      if(control.velocity.y < 0.0){ //apply velocity after apex
        vy += accelY;
      }
    }
    else{
      sleepB = false     ; //wake up                           
      resetGravity()     ;  //reset gravity when on ground
      if(dash){
        move *=dashSpeed ;
      }
    }

    if(jump){
      gravity.y = jumpSpeed ;
      vy        = 0         ;
      jump      = false     ;
    }

    if(hitB){
      doHit(hitDir, hitMag);
    }

    gravity.y = Mathf.Clamp(gravity.y, -termVeloc, termVeloc); //clamp to terminal velocity

    move  += gravity   ;
    move  *= moveSpeed ;

    control.Move(move * Time.deltaTime);

  }

  function doHit(IN_vec:Vector3, IN_mag:float){
    //print("I am hit: "+ this.name)                                ;
    resetGravity()                                                ;
    var hitDir : Vector3 = Vector3(IN_vec.x*hFlip, IN_vec.y, 0.0) ; //format hitDir to character space ; assumes facing right
    gravity += hitDir.normalized * IN_mag                         ;
    hitB     = false                                              ; //set back to false when done
    sleepB   = true                                               ; //sets AI to sleep
  }

  function resetGravity(){
    gravity.y = 0          ;
    vy        = 0          ; //also reset y velocity
    gravity = Vector3.zero ;
  }

  function deltaToZero(value:float, k:float){
    if(value>0.0 && (value - k)<0.0){return 0.0;};
    if(value<0.0 && (value + k)>0.0){return 0.0;};
    return value                                 ;
  }
  
  function Set_hitB(IN_bool:boolean){
    hitB = IN_bool;
  }

  function Set_MoveSpeed(IN_moveSpeed:float):float{
    moveSpeed = IN_moveSpeed ;
    return moveSpeed         ;
  }

  function Get_IO():__mt_IO_State_Anim{    
    var return_io:__mt_IO_State_Anim = xform.root.GetComponentInChildren(__mt_IO_State_Anim) ;
    if(return_io){
      print(this+"__pUnit2D : Found Unit2D_IO on xform and are attaching    : " + xform) ;
    }
    else{
      print("ERROR: "+this+"__pUnit2D : Looking Unit2D_IO on xform and also not found : ERROR IN STRUCTURE !" + xform);
    }
    return return_io;
  }

/*
//get still and hFlip state for special attacks and camera --> 
//HACK : WTF doesn't return expected result outside of class
//Character Controller Complication...worthless?
function Get_bStill():boolean{  return bStill ; }
function Get_hFlip():float   {  return hFlip  ; }
*/

}

