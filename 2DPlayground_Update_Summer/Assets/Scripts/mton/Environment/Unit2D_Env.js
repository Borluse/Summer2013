#pragma strict
import Vectrosity;

class Unit2D_Env extends __gameObjectMT{
  public var vRail     : mt_UI_vCrvRAIL = new mt_UI_vCrvRAIL() ; //public to allow editor access
  public var materials : Material[]     = new Material[3]      ; //0 = default 1 = hilite 2 = red
  
  function Awake(){
    super.Awake()       ;
    vRail.setObj(xform) ;
  }
  
  function Start(){
    super.Start() ;
    vRail.Init()  ;
  }
  
  function LateUpdate(){
    vRail.Update() ;
    vRail.Draw()   ;
  }

}
