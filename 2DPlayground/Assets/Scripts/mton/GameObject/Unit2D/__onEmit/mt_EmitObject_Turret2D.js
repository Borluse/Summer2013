#pragma strict

class mt_EmitObject_Turret2D extends mt_EmitObject{

  public var tPoint : Transform   ; //target point
  public var ePoint : Transform   ; //emission point
  public var lPoint : Transform   ; //landing point
  public var radius : float = 1.0 ;

  public var vCurve    : mt_UI_vCurve = new mt_UI_vCurve() ; //public to allow editor access
  public var materials : Material[]   = new Material[3]    ; //0 = default 1 = hilite 2 = red

  private var cvP     : Transform[]  = new Transform[4]   ;

  private var mRay    : mt_UI_vRay = new mt_UI_vRay() ;
  private var mDir    : Vector3    = Vector3.zero     ;
  private var tDir    : Vector3    = Vector3.zero     ;

  function Awake(){
    super.Awake()         ;
    mRay.SetEntity(xform) ; //HACK? MUST : setting class static variables
  }

  function Start () {
    vCurve.cvV[0] = xform.position  ;
    vCurve.cvV[3] = lPoint.position ;
    vCurve.Init()         ;
    mRay.Init()           ;
  }

  function LateUpdate () {
    super.LateUpdate() ;
    DrawTurret()       ;
    vCurve.Draw()      ;
    doTrajectory()     ;
  }

  function doFire(){
    var angle           = pos_To_Angle(tPoint)  ;
    speed =  Vector3.Distance(xform.position, tPoint.position) * 2                 ;
    var clone:GameObject     = Instantiate(bullet, xform.position, xform.rotation) ;
    //clone.rigidbody.velocity = xform.TransformDirection(Vector3(speed,0,0))        ; //requires @RPC, else use Network.Instantiate
    var vel:Vector3 = BallisticVel(lPoint, angle); // pass the angle and the target transform
    clone.rigidbody.velocity = vel;
    print("Angle: "+angle +" Speed : "+speed + " Velocity: " + vel)                                   ;

  }

  function doTrajectory(){
    speed =  Vector3.Distance(xform.position, tPoint.position) * 2              ;
    var angle = Vector3.Angle(Vector3.up, tPoint.position - xform.position)     ;
    var maxDist:float                                                           ;
    maxDist = ((speed * speed) * ((Mathf.Sin((-angle * Mathf.Deg2Rad) *2))))/10 ; //convert degree angle to radian to use in Sin correctly
    lPoint.position = xform.position                                            ;
    if(xform.rotation.eulerAngles.z<90){
      maxDist *= -1.0;
    }

    lPoint.position.x += maxDist;

    vCurve.cvV[0]     = xform.position  ;
    vCurve.cvV[1]     = vCurve.cvV[0]   ;
    vCurve.cvV[1].x  += maxDist * 0.5   ;
    vCurve.cvV[1].y   = speed * 0.5     ;
    vCurve.cvV[3]     = vCurve.cvV[1]   ;
    vCurve.cvV[2]     = lPoint.position ;
    vCurve.setCurve()                   ;
  }

  function DrawTurret(){
    var angle           = pos_To_Angle(tPoint)  ;
    xform.eulerAngles.z = angle * Mathf.Rad2Deg ; //requires degree : convert from radian to degree

    ePoint.position = angle_To_Pos(angle);  //requires radian

    mRay.Draw(tPoint) ;
  }

  function pos_To_Angle(xform_IN:Transform){
    var dx    = xform_IN.position.x - xform.position.x ;
    var dy    = xform_IN.position.y - xform.position.y ;
    return Mathf.Atan2(dy, dx)                         ; //return angle
  }

  function angle_To_Pos(angle_IN:float){
    var pos   = Vector3.zero                                      ;
    pos.x     = xform.position.x + (Mathf.Cos(angle_IN) * radius) ; //HACK : not sure why negative???
    pos.y     = xform.position.y + (Mathf.Sin(angle_IN) * radius) ;
    return pos                                                    ;
  }

  function BallisticVel(target: Transform, angleRad: float): Vector3 {
	var dir = target.position - transform.position;  // get target direction
	var h = dir.y;  // get height difference
	dir.y = 0;  // retain only the horizontal direction
	var dist = dir.magnitude ;  // get horizontal distance
	//var a = angle * Mathf.Deg2Rad;  // convert angle to radians
	var a = angleRad;  // convert angle to radians
	dir.y = dist * Mathf.Tan(a);  // set dir to the elevation angle
	dist += h / Mathf.Tan(a);  // correct for small height differences
	// calculate the velocity magnitude
	var vel = Mathf.Sqrt(dist * Physics.gravity.magnitude / Mathf.Sin(2 * a));
	return vel * dir.normalized;
  }

}