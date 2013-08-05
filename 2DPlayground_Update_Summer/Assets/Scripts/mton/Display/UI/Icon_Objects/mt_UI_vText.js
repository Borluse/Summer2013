#pragma strict
//@script RequireComponent(tk2dTextMesh) ;

class mt_UI_vText extends mt_UI_Object{

  private var textMesh : tk2dTextMesh ;
  private var tXform   : Transform    ; //target transform
  private var txtScale : float = 0.02 ;
  
  function Init(){
    super.Init() ;
    var iconText:tk2dTextMesh = GameObject.Instantiate(Resources.Load("UI/Icon_Text", tk2dTextMesh)) ;
    textMesh                  = iconText.GetComponent(tk2dTextMesh)                                  ;
    textMesh.text             = ("mt_UI_vText : " + this)                                            ;
    textMesh.Commit()                                                                                ;
    
    xform    = iconText.transform ;
    txtScale = textMesh.scale.x   ;
  }
  
  function Draw(){
    super.Draw()      ;
    if(tXform!=null){  //null==world ; if target is specified move it to there
      xform.position = tXform.position;
    }
    textMesh.Commit() ;
  }
  
  function GetTextMesh(){
    return textMesh ;
  }
  
  function SetTextMesh(IN_message:String){
    textMesh.text = IN_message ;
  }
  
  function hFlip(IN_hFlip:float){
    textMesh.scale.x = txtScale * IN_hFlip ;
  }
  
  function GetTarget(){
    return tXform      ;
  }
  
  function SetTarget(IN_target:Transform){
    tXform = IN_target ;
  }
  
}