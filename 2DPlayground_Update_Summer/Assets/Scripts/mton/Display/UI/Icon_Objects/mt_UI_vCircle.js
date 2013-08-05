#pragma strict
import Vectrosity;

class mt_UI_vCircle extends mt_UI_vObject{

  public var vRadius  : float = 1.0  ;
  public var kAngle   : float = 20.0 ; //rotation delta
  public var kPostn   : float = 1.0  ; //position delta

  function Init(){ 
    super.Init()                                                                                       ;
    vGFX   = new VectorLine("vFollower", new Vector3[vSegment+1], vColor, null, 2,LineType.Continuous) ;
    vGFX.MakeCircle(Vector3.zero, vRadius, vSegment, 0)                                                ;
  }

  function Draw(){
    super.Draw();
    // Move our position a step closer to the target.
    var dist:float = Vector3.Distance(xform.position, entity.position)                                    ;
    xform.position = Vector3.MoveTowards(xform.position, entity.position, Time.deltaTime * dist * kPostn) ;
    xform.rotation = Quaternion.Slerp(xform.rotation, zOrient(xform),Time.deltaTime * kAngle)             ;
    vGFX.Draw(xform )                                                                                     ;
  }

}

class mt_UI_vCircleDB extends mt_UI_vCircle{
  private var xformDB : Transform ;
  private var gfxDB   : VectorLine; 

  function Init(){ 
    super.Init()                                                                                        ;
    vSegment *= 2                                                                                       ;
    xformDB = new GameObject ( "UI_ObjectDB" ) .transform                                               ;
    gfxDB   = new VectorLine("vDebugGFX", new Vector3[vSegment+1], vColor, null, 2,LineType.Continuous) ;
    gfxDB.MakeCircle(Vector3.zero, vRadius * 0.25, vSegment, 0)                                         ;
  }

  function Draw(){
    super.Draw()                                         ;
    xformDB.position = xform.position+vGFX.GetPoint3D(0) ;
  }                                                       
}