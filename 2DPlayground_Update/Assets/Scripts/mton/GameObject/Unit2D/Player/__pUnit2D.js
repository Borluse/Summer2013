#pragma strict

class __pUnit2D extends __gameObjectMT{ //paths to Unit2D

  public    var _io_   : __mt_IO_State_Anim ; //cache to get player state
  protected var pXform : Transform          ; //cache transform that contains player state

  protected var bStill    : boolean = false ; //Is obj not moving?
  protected var bDash     : boolean = false ; //Is obj not moving?
  protected var hFlip     : float   = 1.0   ; //which side is character facing
  protected var onGround  : boolean = false ; //Is obj not moving?

  function Start(){
    super.Start();
    if(!_io_){
      _io_ = Get_IO();
    }
    if(_io_){  //get parent transform
      pXform = _io_.transform;
    }
    //print(" Root :"+ this + xform.root + " : " + xform.root.GetComponentInChildren(Unit2D) +" : "+xform.root.GetComponentInChildren(Unit2D).transform);
  }

  function Update(){
    super.Update()           ;
    hFlip    = _io_.hFlip    ;
    bStill   = _io_.bStill   ;
    bDash    = _io_.bDash    ;
    onGround = _io_.onGround ;
  }

  function LateUpdate(){  
    super.LateUpdate() ;
  }

  function Get_IO():__mt_IO_State_Anim{    
    var return_io:__mt_IO_State_Anim = xform.root.GetComponentInChildren(__mt_IO_State_Anim) ;
    if(return_io){
      print(this+"__pUnit2D : Found Unit2D_IO on xform and are attaching    : " + xform) ;
    }
    else{
      print("ERROR: "+this+"__pUnit2D : Looking Unit2D_IO on xform and also not found : ERROR IN STRUCTURE !" + xform);
    }
    return return_io;
  }
/*
  //HACK : Wow, generalized version doesn't work
  function pathToComponent(IN_component:String, IN_TransformTarget:Transform):Component{
    var return_Component = IN_TransformTarget.GetComponent(IN_component) ;
    if(return_Component){
      print("DefaultPathToComponent : Found "+IN_component+" on "+IN_TransformTarget+" and are attaching.");
      return return_Component;
    }
    else{
      print("DefaultPathToComponent : Failed to find "+IN_component+" on "+IN_TransformTarget+" : ERROR IN STRUCTURE !");
    }
  }
*/
}
