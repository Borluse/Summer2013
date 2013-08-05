#pragma strict

class mt_EmitObject_Satellite_Unit2D extends mt_EmitObject_Satellite{
  protected var _io_    : __mt_IO_State_Anim ; //object to share player state and animation...character controller state not accessible directly

  function InitParent(){
    _io_ = Get_IO()    ; //HACK : must do before reparenting below
    super.InitParent() ;
  }
  
  function LateUpdate(){
    bSpeed = _io_.bStill ;
    super.LateUpdate()   ;
  }
  
  function Get_IO(){
    var return_io:__mt_IO_State_Anim = xform.GetComponent(__mt_IO_State_Anim) ;
    if(return_io){
      print(this+"Unit2D : Found Unit2D_IO on xform and are attaching    : " + xform);
    }
    else{
      return_io = xform.parent.GetComponent(__mt_IO_State_Anim) ; //HACK: Search parent if failing on current xform
      if(return_io){
        print(this+"Unit2D : Searching Unit2D_IO on parent xform:Found!  And are attaching     : " + xform);
      }
      else{
        print(this+"Unit2D : Looking Unit2D_IO on xform and also not found : ERROR IN STRUCTURE !" + xform);
      }
    }
    return return_io;
  }
  
}
