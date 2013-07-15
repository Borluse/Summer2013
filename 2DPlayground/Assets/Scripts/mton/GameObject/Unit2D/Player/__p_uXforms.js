#pragma strict

class __p_uXforms extends __pUnit2D{   //object filtering componenet, searches for object entities to update

  private   var uXforms  : Transform[]    ; //stores eligible targets
  private   var uFirstB  : boolean = true ; //hightlight closest eligible target ; else farthest

  private var cLayerFrcObject : int         ; //"Force Object" env objects eligible for lift, push, swap
  private var cLayerPntObject : int         ; //"Grab  Object" env objects eligible for grapple/pull
  private var cRadius         : float = 5.0 ; //physics overlap sphere -> check for objects in vicinity

  function Awake(){
    super.Awake()                                          ;
    cLayerFrcObject = LayerMask.NameToLayer("forceObject") ;
    cLayerPntObject = LayerMask.NameToLayer("pointObject") ;
  }

  function Start(){
    super.Start();
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

  function radiusGETxforms(layerMaskID:int):Transform[]{  //get all transforms in radius
    var colliders   : Collider[]  = Physics.OverlapSphere (xform.position, cRadius, layerMaskID) ;
    var returnXform : Transform[] = new Transform[colliders.length]                              ;
    var count       : int         = 0                                                            ;

    for (var hit : Collider in colliders) {
      if (!hit){  //??? is this necessary
        continue;
      }
      if (hit.transform){
        returnXform[count] = hit.transform ;
        count              = count + 1     ;
      }
    }

    if(count>0){
      return returnXform;
    }
    else{
      return null;
    }
  }

  function xformsByDistanceSort(xformColl:Transform[]):Transform[]{  //sort xform by distance : bubble sort
    for (var i=0; i<xformColl.Length-1; i++){
      var distA:float   = Vector3.Distance(xform.position, xformColl[i].collider.bounds.center  ) ; //use center
      var distB:float   = Vector3.Distance(xform.position, xformColl[i+1].collider.bounds.center) ; //not registration point
      var ordrB:boolean = true                                                                    ;
      if(uFirstB){
        ordrB = distB<distA ; //sort by closest
      }
      else{
        ordrB = distB>distA ; //sort by farthest
      }
      if(ordrB){
        var tempXform:Transform = xformColl[i]   ;
        xformColl[i]            = xformColl[i+1] ;
        xformColl[i+1]          = tempXform      ;
        i = 0                                    ;
      }  
    }
    return xformColl ;
  }

  function Get_uXforms():Transform[]{
    return uXforms;
  }

}
