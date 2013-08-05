#pragma strict

class mt_UI_LockOn{

  public var energy   : float = 0.0 ;

  public  var tag_GFX  : GameObject  ; //public to allow editor assignment
  private var tag_GFXs : Transform[] ; //ui Tag display/graphics
  private var vGUI_max : int = 5     ;

  function Init(){
    print("Lock on init");
    tag_GFXs   = new Transform[vGUI_max]  ;
    for(var i=0; i<vGUI_max; i++){
      var icon_UI_Object = new mt_UI_Object_bCircle()         ;
      icon_UI_Object.Set_vGFX(GameObject.Instantiate(tag_GFX));
      icon_UI_Object.Init()                                   ;
      tag_GFXs[i] = icon_UI_Object.GetXform(); //assign xform of icon 
    }
    tag_GFXs[0].renderer.material = mt_UI_Object.materials[1]         ; //assign hilite material
  }

  function Draw(pos_IN:Transform[]){  //draw at each eligible xform
    if(pos_IN){
      for(var i=0; i<vGUI_max; i++){
        if(i<pos_IN.Length){
          tag_GFXs[i].position   = pos_IN[i].collider.bounds.center ;
          tag_GFXs[i].position.z = 10                               ;
          //tag_GFXs[i].gameObject.Draw()                           ;
        }
        else{
          tag_GFXs[i].position = Vector3(-1000,0, 10) ;
          //tag_GFXs[i].Erase()                       ;
        }
      }
    }
    else{
      tag_GFXs[0].position = Vector3(-1000,0, 10) ;
      //tag_GFXs[i].Erase()                       ;
    }
  }

  function Erase(){
    for(var i=0; i<tag_GFXs.Length; i++){
      tag_GFXs[i].position = Vector3(-1000,0, 10) ;
    }
  }

  function SetGUIMax(in_Max:int){
    vGUI_max = in_Max;
  }
}
