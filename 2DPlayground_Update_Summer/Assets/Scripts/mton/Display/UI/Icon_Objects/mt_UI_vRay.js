#pragma strict
import Vectrosity;

class mt_UI_vRay extends mt_UI_vObject{
  function Init(){
    super.Init()                                                                   ;
    vGFX          = VectorLine.SetRay3D(vColor, entity.position, Vector3(0, 5, 0)) ;
    vGFX.material = materials[1]                                                   ;
  }
  function Draw(targetXform:Transform){
    super.Draw()                                         ;
    vGFX.points3[0] = entity.position                    ;
    vGFX.points3[1] = targetXform.collider.bounds.center ;
  }
}