#pragma strict
class mt_SpringFollowCamera_Aim extends mt_SpringFollowCamera{
  public  var ironSight : Transform ;
  private var aimCam    : Camera    ;
  private var angleH  = 0           ;
  private var angleV  = 0           ;

  private var aimToggle : boolean = false ;  //False = Camera follows vehicle True = Camera follows aim cursor

  function Awake(){
    super.Awake();
  }   

  function Start(){
    super.Start()         ;
    aimCam = GetMainCam() ;
  }

  function Update (){
    super.Update();
    if(Input.GetKeyUp (KeyCode.Tab)){ //Turret aiming
      aimToggle            = !aimToggle ;
      Screen.lockCursor    = aimToggle  ;
      // Screen.showCursor = aimToggle  ;
    }
  }

  function LateUpdate(){
    if(!aimToggle){
      super.LateUpdate();
    }
    else{
      // rotation
      // angleH += wiiXform() * aimSpeedX * Time.deltaTime                                      ;
      angleH += Mathf.Clamp(Input.GetAxis("Mouse X"), -1, 1) * aimSpeedX * Time.deltaTime * 5.0 ;
      angleV += Mathf.Clamp(Input.GetAxis("Mouse Y"), -1, 1) * aimSpeedY * Time.deltaTime * 3.0 ;
      angleV  = Mathf.Clamp(angleV, aimVertMin, aimVertMax)                                     ; // limit vertical angle

      // var aimRotation: Quaternion = Quaternion.Euler(-angleV, angleH, 0) ;
      //var aimRotation: Quaternion  = Quaternion.Euler(0, angleH, 0)       ;
      var aimRotation: Quaternion    = Quaternion.Euler(-angleV, angleH, 0) ;
      aimCam.transform.rotation      = aimRotation                          ;

      //ApplyPositionDamping (xform.position)                                                   ;
      var position = Vector3(xform.position.x, xform.position.y + 0.5, xform.position.z - 2.0)  ;
      //aimCam.transform.position = position                                                    ;
      //aimCam.transform.position = xform.position + (xform.up * -1.5) + (xform.forward * -0.5) ;
      aimCam.transform.position = ironSight.position                                            ;

    }
  }

}
