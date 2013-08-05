#pragma strict

class mt_OnHit2D_Force extends mt_OnHit2D_Rbody{
  public var mgPower :float = 25;
  public var upForce :float =  3;
  public var dRadius :float =  5;
  
  public var pPush : boolean = true ;
  public var pPull : boolean = true ;
  public var pSwap : boolean = true ;

  function Awake(){
    super.Awake();
  }

  function Start(){
    super.Start();
  }

  function Update(){}
  
  function doCollide(){
    super.doCollide() ;
  }
  
  function go_Lift(){
    if(pPush){
      rbody.AddExplosionForce(mgPower, rbody.transform.position, dRadius, upForce); //(power, explosionPos, radius, upwardsModifier) 
    }
  }
  
  function go_Push(xform_IN:Transform){
    if(pPush){
      rbody.AddExplosionForce(mgPower*17.5, xform_IN.position, dRadius, upForce)  ; //(power, explosionPos, radius, upwardsModifier) 
    }
  }
  
  function go_Pull(xform_IN:Transform){
    if(pPull){
      xform_IN.Translate(Vector3.up * Time.deltaTime * 1000, Space.World);
    }
  }
  
  function go_Swap(xform_IN:Transform){
    if(pSwap){
      var posTemp : Vector3;
            
      //temp store initial position
      posTemp = collider.bounds.center               ; //using center of rbody...else xform can be bottom corner
      posTemp.y = posTemp.y + collider.bounds.size.y ;
      
      //deactivate both objects to prevent wierd collision  
      xform.gameObject.SetActive(false)    ;  //NOTE : Can't get collider information when object inactive
      xform_IN.gameObject.SetActive(false) ;  //HACK : must do after getting bounds above
      
      //do swap
      xform.position    = xform_IN.position ;
      xform_IN.position = posTemp           ;
      
      //activate objects
      xform.gameObject.SetActive(true)    ;
      xform_IN.gameObject.SetActive(true) ;
    }
  }
}