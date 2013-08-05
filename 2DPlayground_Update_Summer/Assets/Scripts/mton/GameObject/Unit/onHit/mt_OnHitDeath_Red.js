#pragma strict
class mt_OnHitDeath_Red extends mt_OnHitDeath{

  private var origColor : Color ; //before damage

  function Awake(){
    super.Awake();
    if(renderMesh){
      origColor = renderMesh.material.color;
    }
  }

  function applyDamage(){
    super.applyDamage()                                               ;
    renderMesh.material.color = Color(1.0, healthInc, healthInc, 1.0) ;
  }
  
  function doYieldRestoreStateAfterRespawn(){
  	super.doYieldRestoreStateAfterRespawn() ;
  	renderMesh.material.color = origColor   ; //NOTE: must call after renderMesh enabled //how come I couldn't do this in mt_OnHitDeathRed subclass?
  }
}
