#pragma strict
class mt_EmitObject_Turret extends mt_EmitObject{

  private var aimPointXform  : Transform              ;
  private var aimPoint       : GameObject             ;
  private var aimPointColor  : Material               ;
  private var aimToggleNow   : float = 0.0            ;
  private var aimToggleDelay : float = 1.0            ;
  private var aimPointTarget : Vector3 = Vector3.zero ;
  private var turretPosition : Vector3 = Vector3.zero ;

  var turretHeading      : Transform   ;
  var turretPitch        : Transform   ;
  var turretHeadingSpeed : float = 5.0 ;

  var aimSpeedX          = 180  ;
  var aimSpeedY          = 90   ;
  var aimDistance        = 15   ;
  var aimVertMin : float = -2.5 ;
  var aimVertMax : float = 6.5  ;

  var recoilTime :float = 1.0 ;
  var recoilMagn :float = 0.35;

  function Awake(){
    super.Awake() ;
  }

  function Start(){
    //super.Start()                                                         ;
    aimPoint             = GameObject.CreatePrimitive(PrimitiveType.Sphere) ;
    aimPointColor        = aimPoint.renderer.material                       ;
    aimPointColor.shader = Shader.Find("Self-Illumin/Diffuse")              ;
    aimPointColor.color  = Color.magenta                                    ;
    //remove collider from sphere, don't react to physics
    Destroy(aimPoint.collider);

    aimPointXform          = aimPoint.transform          ;
    aimPointXform.position = xform.position              ;
    turretPosition         = turretHeading.localPosition ; //store initial turret position for recoil reset
  }

  function Update(){
    if(queryUserInput){
      super.Update();
      if(aimPoint){
        aimDo();    
      }
    }
  }

  function aimDo() {      
    if(Input.GetButton ("Fire1")){
      aimToggleDelay = 2.0                        ;
      aimToggleNow   = Time.time + aimToggleDelay ;
      aim_ON()                                    ;
    }
    else{    
      aim_Cursor_OFF();
      if(Time.time > aimToggleNow){  //rest aim point to center
        aimToggleDelay = 0.01                       ;
        aim_OFF()                                   ;
      }
    }

    var direction          = aimPointXform.position-xform.position                                                                             ;
    turretHeading.rotation = Quaternion.Slerp(turretHeading.rotation, Quaternion.LookRotation(direction), Time.deltaTime * turretHeadingSpeed) ;

  }

  function aim_ON() {  //rotate to aim pointer
    var mainCam      = Camera.main       ;
    var mainCamXform = mainCam.transform ;
    var hit : RaycastHit                 ;
    var hitdistance:float = 0            ;

    //create line from mouse position into screen
    var ray = mainCam.ScreenPointToRay(Input.mousePosition) ; //Returns a ray going from camera through a screen point in world space                                       ;
    //determine where it hits something
    if(Physics.Raycast(ray, hit, 100)){ //Raycast(origin, direction, distance, layerMask) overload to use ray.origin and ray.direction instead of origin and direction.
      aim_Cursor_ON()            ;
      hitdistance = hit.distance ; //put aiming object at that position
    }
    else{
      hitdistance = aimDistance ;
    }

    aimPointTarget=ray.GetPoint (hitdistance)                                                                                  ;
    aimPointTarget.y = Mathf.Clamp(aimPointTarget.y, turretHeading.position.y+aimVertMin, turretHeading.position.y+aimVertMax) ;
    //Debug.DrawRay (turretHeading.position, (aimPointTarget-turretHeading.position) * 10, Color.yellow)                         ;
    aimPointXform.position = Vector3.Slerp(aimPointXform.position, aimPointTarget, Time.time * 0.037)                          ;
  }

  function aim_OFF(){  //rotate to rest
    var nray       = new Ray (turretHeading.position, xform.root.forward) ;
    aimPointTarget = nray.GetPoint (aimDistance)                          ;

    aimPointXform.position = Vector3.Slerp(aimPointXform.position, aimPointTarget, Time.time * 0.0062);  
  }

  function Fire() {
    super.Fire();
    // Firing recoil
    if(nowFiring){
      var recoilPosition          = turretHeading.localPosition + (-turretHeading.forward * recoilMagn)               ;
      turretHeading.localPosition = Vector3.Lerp(turretHeading.localPosition, recoilPosition, Time.time * recoilTime) ;
    }
    else{
      turretHeading.localPosition = Vector3.Lerp(turretHeading.localPosition, turretPosition, Time.time * recoilTime * 2.0); //turretPosition; // resetting local turret position
    }
  }

  function OnDestroy (){
    Destroy(aimPoint);
  }

  function getAimXform() : Transform{
    return aimPointXform;
  }

  function aim_Cursor_ON(){
    aimPointColor.color      = Color.white             ;
    aimPointXform.localScale = Vector3(0.75,0.75,0.75) ;
  }

  function aim_Cursor_OFF(){
    //cross hair default
    aimPointColor.color      = Color(0.3, 0.3, 1.0)    ;
    aimPointXform.localScale = Vector3(0.25,0.25,0.25) ;
  }

}

