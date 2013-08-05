#pragma strict
import Vectrosity;

class mt_UI_Object{

  static    var entity    : Transform                    ; //player/entity transform
  static    var materials : Material[] = new Material[3] ; //0=default 1=hilite 2=red
  protected var xform     : Transform                    ; //UI transform
  
  function Init(){ 
    init_uiMaterials();                  
  }
  function SetEntity(entity_IN:Transform) {        
    entity = entity_IN;         
  }
  function SetXform(xform_IN:Transform){
    xform = xform_IN;
  }
  function GetXform():Transform{
    return xform;
  }
  /*
  function SetMaterials ( materials_IN:Material[] ) {
     materials = materials_IN; 
  }
  */
  function Draw(){
  }
  function Erase(){
  }

  function zOrient(target_IN:Transform):Quaternion{
    var targetDir = entity.position - target_IN.position                  ;
    var angleZ    = Mathf.Atan2(targetDir.y, targetDir.x) * Mathf.Rad2Deg ;
    return Quaternion.Euler (0, 0, angleZ)                                ;
  }        
  
  function init_uiMaterials(){ //Hack: Hardcoded to materials in Resources folder
    materials[0] = GameObject.Instantiate(Resources.Load("UI/Icon_Default")) as Material ;
    materials[1] = GameObject.Instantiate(Resources.Load("UI/Icon_HiLite"))  as Material ;
    materials[2] = GameObject.Instantiate(Resources.Load("UI/Icon_Red"))     as Material ;
  }                                                                                                  
}

//Vectrosity extension for mt_UI_Object
class mt_UI_vObject extends mt_UI_Object{

  protected var vGFX     : VectorLine                         ;
  public    var vColor   : Color = Color(0.8, 0.8, 0.8, 0.07) ;
  public    var vSegment : int   = 32                         ;
  
  function Init(){ 
    super.Init()                                       ;
    xform = new GameObject ( "UI_vObject" ) .transform ; //init xform placeholder to draw VectorLine object at
  }
  function Draw(){
    super.Draw()       ;
    vGFX.active = true ;
  }
  function Erase(){
    super.Erase()       ;
    vGFX.active = false ;
  }
}

//Standard xform extension for mt_UI_Object
class mt_UI_Object_xform extends mt_UI_Object{

  public  var vGFX : GameObject  ;
  
  function Init(){ 
    super.Init()           ;
    xform = vGFX.transform ;
  }
  function Draw(){
    super.Draw()            ;
    vGFX.SetActive(true) ;
  }
  function Erase(){
    super.Erase()            ;
    vGFX.SetActive(false) ;
  }
  function Set_vGFX(IN_vGFX:GameObject){
    vGFX = IN_vGFX;
  }
}

//Extend xform to buildCircle
class mt_UI_Object_bCircle extends mt_UI_Object_xform{
  
  function Init(){ 
    super.Init()                                                       ;
    var scriptGFX:BuildCircleMesh = vGFX.GetComponent(BuildCircleMesh) ;
    if(scriptGFX){
      scriptGFX.outerSinTime   *= 3.0  ;
      scriptGFX.innerRadius    *= 1.25 ;
      print("Found BC");
    }
    else{
      print("mt_UI_Object_bCircle: " +  vGFX + " not valid.  Needs BuildCircleMesh script.");
    }
  }
}