#pragma strict
import Vectrosity;

class mt_UI_vCurve extends mt_UI_vObject{

  public var cvV : Vector3[]  = new Vector3[4]   ;  //bezier curve Vector3(positions)

  function Init(){
    super.Init()                                                                                                     ;
    vGFX = new VectorLine("vCurve", new Vector3[vSegment+1], Color(0.8, 0.8, 0.8, 0.5), null, 2,LineType.Continuous) ;
    vGFX.material = materials[0]                                                                                     ;
    setCurve();
  }
  
  function Draw(){
    //super.Draw() ;
    vGFX.Draw()  ;
  }
  
  function setCurve(){
    vGFX.MakeCurve(cvV, vSegment, 0) ;
  }
}

class mt_UI_vCrvRAIL extends mt_UI_vCurve{
  public var cvP    : Transform[] = new Transform[4]; //bezier curve Points
  
  private var rObj  : Transform      ; //rail Object
  
  public  var rSpd  : float   = 1.0  ; //rail speed
  private var rLen  : float   = 0.0  ; //rail Length
  private var rDir  : boolean = true ; //rail Direction
  private var rOri  : boolean = true ; //rail Orientation
  
  function Update(){
    if(rDir){
      rLen = Mathf.Lerp(0, vGFX.GetLength(), Time.time%(1.0/rSpd) * rSpd);
    }
    else{ 
      rLen = Mathf.Lerp(vGFX.GetLength(), 0, Time.time%(1.0/rSpd) * rSpd);
    }
    
    rObj.position = vGFX.GetPoint3D(rLen)      ;
    if(rOri){
      rObj.LookAt(vGFX.GetPoint3D(rLen*0.999)) ;
    }
  }
  
  function setCurve(){  //regen curve
    for(var i:int=0; i<cvV.Length; i++){
      cvV[i] = cvP[i].position;
    }
    super.setCurve();
  }
  
  //Setters
  function setObj(xform_IN:Transform){  rObj = xform_IN ;  }
  function setDir(bool_IN:boolean)   {  rDir = bool_IN  ;  }
  function setOri(bool_IN:boolean)   {  rOri = bool_IN  ;  }
  
}
