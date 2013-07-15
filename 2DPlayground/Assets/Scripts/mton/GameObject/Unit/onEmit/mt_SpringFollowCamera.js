#pragma strict
class mt_SpringFollowCamera extends mt_EmitObject_Turret_UI{
  //@script AddComponentMenu ("Third Person Camera/Spring Follow Camera")

  var turretToggle : boolean = false ;  //Does this also function as an Emitter? False = Camera only.

  // This camera is similar to the one used in Jak & Dexter
  var target : Transform                                    ;
  var distance                     = 8.0                    ;
  var height                       = 2.0                    ;
  var smoothLag                    = 0.2                    ;
  var maxSpeed                     = 25.0                   ;
  var snapLag                      = 0.3                    ;
  var clampHeadPositionScreenSpace = 0.75                   ;
  var lineOfSightMask : LayerMask  = 0                      ;
  var headOffset                   = Vector3.zero           ;
  var centerOffset                 = Vector3(0.0, 2.0, 0.0) ;

  private var mask         : LayerMask    ;
  private var mainCam      : Camera       ;
  private var mainCamXform : Transform    ;
  private var isSnapping   = false        ;
  private var velocity     = Vector3.zero ;
  private var targetHeight = 100000.0     ;
  private var aimCurr      = Vector3.zero ;

  function Awake(){
    if(queryUserInput){
      super.Awake();
    }
  }   

  function OnEnable(){
    if(queryUserInput){
      if(turretToggle){
        target = xform.root ;
      }
      else{
        target = xform ;
      }
    }
  }

  function Start(){	
    if(queryUserInput){
      if(turretToggle){
        super.Start() ;
      }
      mainCam      = Camera.main       ;
      mainCamXform = mainCam.transform ;
/*
// Add player's own layer to mask
mask = 1 << xform.gameObject.layer;
// Add Igbore Raycast layer to mask
mask |= 1 << LayerMask.NameToLayer("Ignore Raycast");
// Invert mask
mask = ~mask;
*/
    }
  }

  function Update(){
    if(turretToggle){
      super.Update();
    }
  }

  function LateUpdate (){
    if(queryUserInput){
      //if (target){ //Why check for target?
        Apply (null, Vector3.zero);	
      //}
    }
  }

  function Apply (dummyTarget : Transform, dummyCenter : Vector3){	
    var targetCenter = target.position + centerOffset ;
    var targetHead   = target.position + headOffset   ;
    /*	
    // When jumping don't move camera upwards but only down!
    if (controller.IsJumping ())
    {
    // We'd be moving the camera upwards, do that only if it's really high
    var newTargetHeight = targetCenter.y + height;
    if (newTargetHeight < targetHeight || newTargetHeight - targetHeight > 5)
    targetHeight = targetCenter.y + height;
    }
    // When walking always update the target height
    else
    {
    targetHeight = targetCenter.y + height;
    }
*/
    targetHeight = targetCenter.y + height;

    // We start snapping when user pressed Fire2!
    if (Input.GetButton("Jump") && !isSnapping){
      velocity   = Vector3.zero ;
      isSnapping = true         ;
    }

    if (isSnapping){
      ApplySnapping (targetCenter);
    }
    else{
      ApplyPositionDamping (Vector3(targetCenter.x, targetHeight, targetCenter.z));
    }
    
    SetUpRotation(targetCenter, targetHead);
    //var aimLag:Vector3 = Vector3.Slerp(aimCurr, getAimXform().position, Time.time * 0.05);
    //SetUpRotation(aimLag, targetHead);
    
  }

  function ApplySnapping (targetCenter : Vector3){
    var position        = mainCamXform.position   ;
    var offset          = position - targetCenter ;
    offset.y            = 0                       ;
    var currentDistance = offset.magnitude        ;

    var targetAngle  = target.eulerAngles.y       ;
    var currentAngle = mainCamXform.eulerAngles.y ;

    currentAngle    = Mathf.SmoothDampAngle(currentAngle, targetAngle, velocity.x, snapLag) ;
    currentDistance = Mathf.SmoothDamp(currentDistance, distance, velocity.z, snapLag)      ;

    var newPosition   = targetCenter                                                                            ;
    newPosition      += Quaternion.Euler(0, currentAngle, 0) * Vector3.back * currentDistance                   ;
    newPosition.y     = Mathf.SmoothDamp (position.y, targetCenter.y + height, velocity.y, smoothLag, maxSpeed) ;
    newPosition       = AdjustLineOfSight(newPosition, targetCenter)                                            ;

    mainCamXform.position = newPosition;

    // We are close to the target, so we can stop snapping now!
    if (AngleDistance (currentAngle, targetAngle) < 3.0){
      isSnapping = false        ;
      velocity   = Vector3.zero ;
    }
  }

  function ApplyPositionDamping (targetCenter : Vector3){
    // We try to maintain a constant distance on the x-z plane with a spring.
    // Y position is handled with a seperate spring
    var position     = mainCamXform.position                       ;
    var offset       = position - targetCenter                     ;
        offset.y     = 0                                           ;
    var newTargetPos = offset.normalized * distance + targetCenter ;

    var newPosition : Vector3                                                                      ;
    newPosition.x = Mathf.SmoothDamp (position.x, newTargetPos.x, velocity.x, smoothLag, maxSpeed) ;
    newPosition.z = Mathf.SmoothDamp (position.z, newTargetPos.z, velocity.z, smoothLag, maxSpeed) ;
    newPosition.y = Mathf.SmoothDamp (position.y, targetCenter.y, velocity.y, smoothLag, maxSpeed) ;

    newPosition           = AdjustLineOfSight(newPosition, targetCenter) ;
    mainCamXform.position = newPosition                                  ;
  }

  function SetUpRotation (centerPos : Vector3, headPos : Vector3){
    // Now it's getting hairy. The devil is in the details here, the big issue is jumping of course.
    // * When jumping up and down don't center the guy in screen space. This is important to give a feel for how high you jump.
    //   When keeping him centered, it is hard to see the jump.
    // * At the same time we dont want him to ever go out of screen and we want all rotations to be totally smooth
    //
    // So here is what we will do:
    //
    // 1. We first find the rotation around the y axis. Thus he is always centered on the y-axis
    // 2. When grounded we make him be cented
    // 3. When jumping we keep the camera rotation but rotate the camera to get him back into view if his head is above some threshold
    // 4. When landing we must smoothly interpolate towards centering him on screen
    var cameraPos      = mainCamXform.position ;
    var offsetToCenter = centerPos - cameraPos ;

    // Generate base rotation only around y-axis
    var yRotation = Quaternion.LookRotation(Vector3(offsetToCenter.x, 0, offsetToCenter.z));

    var relativeOffset    = Vector3.forward * distance + Vector3.down * height  ;
    mainCamXform.rotation = yRotation * Quaternion.LookRotation(relativeOffset) ;

    // Calculate the projected center position and top position in world space
    var centerRay = mainCam.ViewportPointToRay(Vector3(.5, 0.5, 1))                          ;
    var topRay    = mainCam.ViewportPointToRay(Vector3(.5, clampHeadPositionScreenSpace, 1)) ;

    var centerRayPos = centerRay.GetPoint(distance) ;
    var topRayPos    = topRay.GetPoint(distance)    ;

    var centerToTopAngle = Vector3.Angle(centerRay.direction, topRay.direction);

    var heightToAngle = centerToTopAngle / (centerRayPos.y - topRayPos.y);

    var extraLookAngle = heightToAngle * (centerRayPos.y - centerPos.y);
    if (extraLookAngle < centerToTopAngle){
      extraLookAngle = 0;
    }
    else{
      extraLookAngle          = extraLookAngle - centerToTopAngle       ;
      mainCamXform.rotation  *= Quaternion.Euler(-extraLookAngle, 0, 0) ;
    }
  }

  function AdjustLineOfSight (newPosition : Vector3, target : Vector3){
    var hit : RaycastHit;
    if (Physics.Linecast (target, newPosition, hit, lineOfSightMask.value)){
      velocity = Vector3.zero ;
      return hit.point        ;
    }
    return newPosition;
  }

  function AngleDistance (a : float, b : float){
    a = Mathf.Repeat(a, 360);
    b = Mathf.Repeat(b, 360);

    return Mathf.Abs(b - a);
  }

  function GetCenterOffset (){
    return centerOffset;
  }
  
  function GetMainCam (){
    return mainCam;
  }

  function SetTarget (t : Transform){
    target = t;
  }

  function OnDestroy (){
    super.OnDestroy();
  }

}
