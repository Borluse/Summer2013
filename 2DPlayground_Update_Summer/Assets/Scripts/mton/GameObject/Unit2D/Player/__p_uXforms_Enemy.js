#pragma strict

class __p_uXforms_Enemy extends __p_uXforms{   //object filtering componenet, searches for object entities to update

  private var cLayerUsrObject : int ; //"Player" objects eligible for enemy interaction
  private var cLayerEnmObject : int ; //"Enemy" objects eligible for filtering enemy/self collision 
  private var cLayerFloObject : int ; //"Enemy" objects eligible for filtering floor

  private var wallCheck : Vector3 = Vector3.zero ; // pos for wall  check sphere
  private var florCheck : Vector3 = Vector3.zero ; // pos for floor check sphere

  private var _ai_     : Unit2D_IO_AI                    ;
  private var uText    : mt_UI_vText = new mt_UI_vText() ;

  function Awake(){
    super.Awake()                                     ;
    cLayerUsrObject = LayerMask.NameToLayer("Player") ;
    cLayerEnmObject = LayerMask.NameToLayer("Enemy")  ;
    cLayerFloObject = LayerMask.NameToLayer("Floor")  ;
  }

  function Start(){
    super.Start()          ;
    _ai_ = Get_AI()        ;
    uText.Init()           ;
    uText.SetTarget(xform) ;
  }

  function Update(){
    super.Update()                     ;
    //uText.SetTextMesh(_io_.Get_Clip()) ;
    //uText.Draw()                       ;

    if(Mathf.Abs(_io_.Get_kX())>0.0){ //if moving check for collision/ledges

      wallCheck    = florCheck = pXform.position ;
      wallCheck.x += 0.5*-hFlip                  ;
      florCheck.x += 0.75*-hFlip                 ;
      florCheck.y -= 1.0                         ;

      if(Physics.CheckSphere(wallCheck, 0.25)){ //, ~(1<<cLayerEnmObject))) { //check forward to find wall
        //print("Found Object") ;
        _ai_.do_Edge()          ;
      }
      else if(!Physics.CheckSphere(florCheck, 0.25, 1<<cLayerFloObject)) { //check forward and down to find end of ledge
        //print("Found Floor Edge") ;
        _ai_.do_Edge()              ;
      }

      Debug.DrawLine (pXform.position, wallCheck, Color.red)  ;
      Debug.DrawLine (pXform.position, florCheck, Color.blue) ;
    }
  }

  function Get_AI():Unit2D_IO_AI{    
    var return_ai:Unit2D_IO_AI = xform.root.GetComponentInChildren(Unit2D_IO_AI) ;
    if(return_ai){
      print(this+"__pUnit2D : Found Unit2D_IO on xform and are attaching    : " + xform) ;
    }
    else{
      print("ERROR: "+this+"__pUnit2D : Looking Unit2D_IO on xform and also not found : ERROR IN STRUCTURE !" + xform);
    }
    return return_ai;
  }
}
