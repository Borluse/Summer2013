#pragma strict
class mt_EmitObject_Turret_UI extends mt_EmitObject_Turret{

  var lightPoint              : Light ;
  protected var lightInstance : Light ;

  function Awake(){
    super.Awake()                                                                            ;                                                ;
  }
  
  function Start(){
    super.Start()                                                                            ;
    lightInstance                  = Instantiate(lightPoint, xform.position, xform.rotation) ;
    lightInstance.transform.parent = xform                                                   ;
    lightInstance.enabled          = false                                                   ;
  }

  function Fire() {
  	super.Fire()                      ;
    lightInstance.enabled = nowFiring ;
  }
  
  function OnDestroy (){
  	super.OnDestroy();
  }
  
}
