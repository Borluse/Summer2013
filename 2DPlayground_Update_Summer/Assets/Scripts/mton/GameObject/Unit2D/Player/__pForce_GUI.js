#pragma strict

class __pForce_GUI extends __pForce{                          //UI visualize detection of eligible xforms

  public var uUI        : mt_UI_LockOn = new mt_UI_LockOn() ; //must be public to feed tag_GFX from editor
  public var vSegment   : int          = 32                 ;

  private var uFollowE : GameObject                              ;
  private var uCollDB  : mt_UI_vCircleDB = new mt_UI_vCircleDB() ;
  private var uRay     : mt_UI_vRay      = new mt_UI_vRay()      ;

  function Awake(){
    super.Awake()             ;
    uCollDB.SetEntity(xform)  ;
  }

  function Start(){
    super.Start()          ;
    uCollDB.vRadius  = 5   ;
    uCollDB.kPostn   = 7.5 ;
    uCollDB.Init()         ;
    uRay.Init()            ;
    uUI.Init()             ;
  }

  function LateUpdate(){
    super.LateUpdate() ;
    doUI()             ;
  }

  function doUI(){
    if(uXforms){                                                //if there are eligible objects 
      //uXforms = unit2DParent.xformsByDistanceSort(uXforms) ; //sort by distance when standing still
      uRay.Draw(uXforms[0])                                  ;
      uUI.Draw(uXforms)                                      ;
    }
    else{
      uRay.Erase() ;
      uUI.Erase()  ;
    }
    uCollDB.Draw() ; //draw debug collision radius
  }
}
