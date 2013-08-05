#pragma strict

class mt_OnHit2D_Unit2D extends mt_OnHit2D{
  public var _u2_ : Unit2D ; //cache to get Unit2D to message on damage
  
  private var uText    : mt_UI_vText = new mt_UI_vText() ;

  function Awake(){
    super.Awake();
  }

  function Start(){
    super.Start()       ;
    _u2_ = Get_Unit2D() ;
    
    uText.Init()           ;
    uText.SetTarget(xform) ;
  }

  function Update(){
    super.Update();
    if(Input.GetKeyDown(KeyCode.H)){
      _u2_.Set_hitB(true);
    }
    
    uText.SetTextMesh(health.ToString()) ;
    uText.Draw()              ;
  }

  function applyForce(){                 
    _u2_.Set_hitB(true) ; //apply hit
  }

  function Get_Unit2D():Unit2D{    
    var return_u2:Unit2D = xform.root.GetComponentInChildren(Unit2D) ;
    if(return_u2){
      print(this+"mt_OnHit2D_Unit2D : Found Unit2D on xform and are attaching    : " + xform) ;
    }
    else{
      print("ERROR: "+this+"mt_OnHit2D_Unit2D : Looking Unit2D on xform and also not found : ERROR IN STRUCTURE !" + xform);
    }
    return return_u2;
  }

}

