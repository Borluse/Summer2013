#pragma strict
private var lineRenderer : LineRenderer           ;
private var velocity     : Vector3 = Vector3.zero ;
private var uiFriction   : float   = 0.035        ;
public  var parentObj    : Transform              ;
public  var iconOffSet   : Vector3 = Vector3.zero ;

function Start () { //can't be on script Awake(), Unit_icon_Spawner is generating the icon Nodes
  transform.position = parentObj.position;

  lineRenderer=transform.gameObject.GetComponent(LineRenderer);
  if(!lineRenderer){
    attachLineRenderer();
  }
  iconToggle(false); //hide icon nodes
}

function Update () {
  doUpdate();	    
}

function doUpdate () {
  if (Input.GetKeyDown ("down")){
    transform.position = parentObj.position ; //WTF : can't be inside if uiTimeBool===false?
    iconToggle(true)                        ;
    if(mton_GLOBAL.uiTimeBool===false){
      mton_GLOBAL.uiTimeBool=true;
    }
  }
  if(mton_GLOBAL.uiTimeBool===true){
    // A sphere that fully encloses the bounding box
    var center = parentObj.renderer.bounds.center            ;
    var radius = parentObj.renderer.bounds.extents.magnitude ;

    var UI_target = parentObj.position                                                           ;
    UI_target += iconOffSet                                                                      ;
    transform.position = Vector3.SmoothDamp(transform.position, UI_target, velocity, uiFriction) ;
  }
  else{
    iconToggle(false);
  }

  //linerender ray
  lineRenderer.SetPosition(0, transform.position);
  lineRenderer.SetPosition(1, parentObj.position);
}

function attachLineRenderer(){
  var c1 : Color        = Color.white                                      ;
  var c2 : Color        = Color.yellow                                     ;
  lineRenderer          = gameObject.AddComponent(LineRenderer)            ;
  lineRenderer.material = new Material (Shader.Find("Particles/Additive")) ;
  lineRenderer.SetColors(c1, c2)                                           ;
  lineRenderer.SetWidth(0.1,0.1)                                           ;
  lineRenderer.SetVertexCount(2)                                           ;
}

function iconParent(transform:Transform, offSet:Vector3){
  parentObj  = transform ;
  iconOffSet = offSet    ;
}

function iconToggle(bool:boolean){
  //transform.gameObject.SetActive(bool);  //WTF : if setActive toggled off, gameObject no longer part of update loop?
  transform.renderer.enabled                          = bool;
  lineRenderer.enabled                                = bool;
  transform.gameObject.GetComponent(Collider).enabled = bool; //turn on/off collision
}
