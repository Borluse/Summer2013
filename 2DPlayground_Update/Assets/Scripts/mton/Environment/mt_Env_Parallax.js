#pragma strict
import Vectrosity;

class mt_Env_Parallax extends __gameObjectMT{

  private var pCamXform : Transform                    ;
  public  var pOffSet   : Vector2 = Vector2(0.5, 0.01) ;

  
  function Awake(){
    super.Awake()                     ;
    pCamXform = Camera.main.transform ; //tk2dCamera.inst.transform ; //Global instance, used by sprite and textmesh class to quickly find the tk2dCamera instance.
  }
  
  function Start(){
    super.Start() ;
  }
  
  function LateUpdate(){
    xform.position.x = pCamXform.position.x * pOffSet.x ;
    xform.position.y = pCamXform.position.y * pOffSet.y ;
  }

}
