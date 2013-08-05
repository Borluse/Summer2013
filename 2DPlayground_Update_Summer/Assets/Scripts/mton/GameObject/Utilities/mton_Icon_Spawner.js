#pragma strict
public var icon_SpawnObj : GameObject  ;
public var iconCount     : int   = 1   ;
public var iconRadius    : float = 2.0 ;

function Awake(){
  var icons = new GameObject[iconCount];
  for(var i=0; i<iconCount; i++){

    var angleIcon = Mathf.PI*i*2/iconCount                  ; //1/(1+i)   ; //offset radial spawn
    //icons[i]    = Instantiate(Resources.Load("icon_obj")) ;
    icons[i]      = Instantiate(icon_SpawnObj)              ; //user load

    var iconObj:mton_Icon = icons[i].GetComponent(mton_Icon) ;
    var offSet:Vector3    = Vector3.zero                     ;

    offSet.x = Mathf.Cos(angleIcon) * iconRadius;
    offSet.y = Mathf.Sin(angleIcon) * iconRadius;
    offSet.z = 0.0;
    iconObj.iconParent(transform, offSet);
    
  }
}
