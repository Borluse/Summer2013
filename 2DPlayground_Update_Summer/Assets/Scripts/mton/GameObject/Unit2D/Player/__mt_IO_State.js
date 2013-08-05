#pragma strict

class __mt_IO_State extends __mt_IO{

  //HACK:reconstructing hFlip and bStill information because character controller doesn't update predictably?
  public var hFlip     : float   = 1.0  ; //which side is character facing; -1=facing right
  public var bStill    : boolean = false ; //Is obj not moving?
  public var onGround  : boolean = false ; //Is obj not moving?

  private var pPos : Vector3 = Vector3.zero ; //previous position
  private var vMag : float   = 0.0          ; //velocity magnitude; check for bStill movement
  private var kX   : float   = 0.0          ; //check for forward movement
  private var kY   : float   = 0.0          ; //check for on ground
  private var kThreshold:float = 0.0001     ;

  function Update(){
    super.Update() ;

    hFlip = Mathf.Round(xform.rotation.y)*2.0-1.0 ; //get into -1.0 to 1.0 range

    kX   = (xform.position.x - pPos.x)            ;
    kY   = (xform.position.y - pPos.y)            ;
    vMag = Vector3.Distance(pPos, xform.position) ; //magnitude of velocity between current and previous position
    pPos = xform.position                         ; //store current position as previous position

    bStill   = boolThreshold(vMag)            ;
    onGround = boolThreshold(Mathf.Abs(kY))   ;  //HACK : checking only y delta; possible false negative at jump apex

  }

  function boolThreshold(IN_value:float):boolean{
    if (IN_value < kThreshold){  //velocity threshold maps to bStill state
      return true ;
    }
    else{
      return false;
    }
  }
  
  function Get_kY(){
    return kY;
  }
  
  function Get_kX(){
    return kX;
  }

}
