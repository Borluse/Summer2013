#pragma strict

class __mt_IO extends __gameObjectMT{

  //class GamePad_IO{ 
  public var hAxis : float   = 0.0   ; //controller horizontal axis
  public var vAxis : float   = 0.0   ; //controller vertical axis

  public var bJump  : boolean = false ;
  public var bJumpD : boolean = false ; //jump button press
  public var bJumpU : boolean = false ; //jump button release
  public var bDash  : boolean = false ;
  public var bFire  : boolean = false ;

  public var bDuck  : boolean = false ;
  public var bStnd  : boolean = false ;
  //}

  private var boolControl : boolean = true  ; //Will obj accept controller input?
  private var uFirstB     : boolean = true  ; //highlight closest object for GUI
  private var nextFire    : float   = 0     ;

  function Update(){
    if(boolControl){
      doGamePad();
    }
  }

  function doGamePad(){  //read control input
    hAxis = Input.GetAxis("Horizontal") ;
    bJump = Input.GetButton("Jump")     ;
    bJumpD = Input.GetButtonDown("Jump");
    bJumpU = Input.GetButtonUp("Jump")  ;
    bFire = Input.GetButton("Fire1")    ;
    bDash = Input.GetButton("Fire2")    ;
    bDuck = Input.GetKey("down")        ;
    bStnd = Input.GetKey("up")          ;
  }

  function Set_boolControl(IN_boolControl:boolean){
    boolControl = IN_boolControl;
  }

  function Get_uFirstB():boolean{
    return uFirstB;
  }

  function Set_uFirstB(IN_uFirstB:boolean){
    uFirstB = IN_uFirstB;
  }

}
