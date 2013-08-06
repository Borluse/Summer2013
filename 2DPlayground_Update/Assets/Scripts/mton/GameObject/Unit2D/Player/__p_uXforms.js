#pragma strict

class __p_uXforms extends __pUnit2D{   //object filtering componenet, searches for object entities to update

  protected var uXforms  : Transform[]    ; //stores eligible targets
  protected var uFirstB  : boolean = true ; //hightlight closest eligible target ; else farthest
  protected var cRadius  : float = 5.0    ; //physics overlap sphere -> check for objects in vicinity

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
