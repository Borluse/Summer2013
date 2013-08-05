#pragma strict

class __p_uXforms_User extends __p_uXforms{   //object filtering componenet, searches for object entities to update

  private var cLayerFrcObject : int            ; //"Force Object" env objects eligible for lift, push, swap
  private var cLayerPntObject : int            ; //"Grab  Object" env objects eligible for grapple/pull

  function Awake(){
    super.Awake()                                          ;
    cLayerFrcObject = LayerMask.NameToLayer("forceObject") ;
    cLayerPntObject = LayerMask.NameToLayer("pointObject") ;
  }

  function LateUpdate(){
    super.LateUpdate() ;
    uXforms = null     ;
    if(_io_.bStill){  //seek force objects
      uXforms = radiusGETxforms(1<<cLayerFrcObject) ; //WTF is << ? Need that to specify inclusive vs. exclusive
    }
    else{             //seek point objects
      uXforms = radiusGETxforms(1<<cLayerPntObject) ;
    }
    if(uXforms){
      uXforms = xformsByDistanceSort(uXforms);
    }
    uFirstB = _io_.Get_uFirstB();
  }
  
}
