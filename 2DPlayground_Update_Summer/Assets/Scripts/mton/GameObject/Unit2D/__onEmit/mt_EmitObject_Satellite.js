#pragma strict

class mt_EmitObject_Satellite extends mt_EmitObject{
  private   var uFollow      : mt_UI_vFollow = new mt_UI_vFollow() ; //must initialize with new...WHY???
  protected var bSpeed       : boolean    = false                  ; //Is obj not moving?

  function Awake(){
    super.Awake()                   ;
    uFollow.SetEntity(xform)        ; //HACK? MUST : setting class static variables
  }

  function Start(){
    super.Start()                   ;
    uFollow.vColor   = Color.yellow ; //config then init
    uFollow.vSegment = 3            ; //config then init
    uFollow.Init()                  ;    
    
    InitParent();
  }

  function LateUpdate(){
    super.LateUpdate() ;
    if(bSpeed){  //fast follow
      uFollow.kPostn = 20.0 ;
      SetFireable(false)    ; //can't no fire while fast follow
    }
    else{        //slow follow
      uFollow.kPostn = 0.5  ;
      SetFireable(true)     ;
    }
    uFollow.Draw() ;
  }
  
  function InitParent(){
    if(xform.parent){ //just incase xform not parented to anything
      uFollow.SetEntity(xform.parent)        ; //set satellite target
      xform.parent      = uFollow.GetXform() ; //get satellite transform and parent to
      xform.position    = Vector3.zero       ; //zero out after parenting
      xform.position.x += 1.0                ; //offset emission point to front
    }
  }
  
  function SetFast(in_Speed:boolean){
    bSpeed = in_Speed;
  }
}
