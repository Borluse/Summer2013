#pragma strict
@script RequireComponent(Rigidbody)

class mt_OnHit2D_Rbody extends mt_OnHit2D{

  protected var rbody       : Rigidbody   ;

  function Awake(){
    super.Awake()       ;
    rbody = rigidbody   ;
    //DefaultCollider() ;
  }
  
}

