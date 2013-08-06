#pragma strict

class Unit2D_IO extends Unit2D_GFX{

  public var runSpeed   : float = 4.0  ;
  public var flipSpeed  : float = 50.0 ;
  public var doubleJump : int   = 2    ;

  protected var boolControl : boolean = true  ; //Will obj accept controller input?
  protected var hAxis       : float   = 0.0   ; //controller horizontal axis
  protected var nextFire    : float   = 0     ;
  
  protected var bDuck : boolean = false;
  protected var bFire : boolean = false;
  protected var bJump : boolean = false;
  
  private var jumpCnt    : int   = 0    ;
  private var kTime      : float = 0.5  ; //Time to hold before eligible for instance swap out.Prevent jutter.

  function Start(){
    super.Start()           ;
    Set_MoveSpeed(runSpeed) ; //To prevent Unit2D class character controller from falling through
  }

  function Update(){
    if(boolControl){
      do_IO()        ;
      doUpdate()     ;
      super.Update() ;
    }
  }

  function Get_hAxis(){
    return hAxis;
  }
  
  function do_IO(){
    hAxis = _io_.hAxis ;
    bDuck = _io_.bDuck ;
    bFire = _io_.bFire ;
    bJump = _io_.bJump ;
    dash  = _io_.bDash ; //check dash state
    
    if(Input.GetKeyDown(KeyCode.H)){
      hitB = true  ;  //will set back to false at end of doHit() handler
    }
  }

  function doUpdate(){

    move  = Vector3(hAxis, 0, 0)  ;
    if(move.sqrMagnitude > 0.01){
      move.Normalize()                                                                                                           ; //So diagonal xforms are not faster, uses hypotneous
      xform.rotation = Quaternion.Slerp(xform.rotation, Quaternion.LookRotation(Vector3(0,0,hAxis)), Time.deltaTime * flipSpeed) ;
    }

    if(control.isGrounded){          //handle on ground state HACK : However isGrounded is clippy and unreliable
      jumpCnt = 0 ;
      if(move.sqrMagnitude > 0.1){   //is character moving->walk
        animState = animEnum.walk   ;
        if(dash){
          animState = animEnum.dash ;
        }
      }
      else{                         //else still, idle
        if(bDuck){
          animState = animEnum.duck ;
        }
        else{
          animState = animEnum.idle ;
        }
      }
    }
    else{                          
      if(control.velocity.y < -vy*30){
        animState = animEnum.fall ;
      }
    }

    if(bJump){               //handle jump
      if(jumpCnt < doubleJump){   // && vy>-0.01){
        animState = animEnum.jump ;
        jump      = true          ;
        jumpCnt   = jumpCnt +1    ;
      }   
    }
/*
if(bFire && Time.time > nextFire){  //handle attack
//nextFire                    = Time.time + fireRate                                ;
//var clone:GameObject        = Instantiate(bullet, xform.position, xform.rotation) ;
//clone.transform.localScale *= (Random.value + 0.3)*0.75                           ;
//clone.rigidbody.velocity    = xform.TransformDirection(Vector3(0,0,20))           ;
} 
*/
    _io_.Set_Anim(animState); 
  }

}
