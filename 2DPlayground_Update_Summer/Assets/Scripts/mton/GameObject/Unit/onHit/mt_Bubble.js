#pragma strict

class mt_Bubble extends mt_OnHit{

  private var pSystem: ParticleSystem;
  private var vFallOff   : float = 0.7; 
  public  var magHeight  : float = 6.0; //float height
  public  var vForce     : float = 1.2; //float speed
  public  var magForce   : float = 1.0; //float speed
  public  var bubbleObj  : GameObject ; //spawn on Collision on emmission
  public  var bubbleFx   : GameObject ; //spawn on Collision on emmission

  var soundTrack  : AudioClip       ;
  var randomPitch : boolean = true  ;
  var randomRange : float   = 0.25  ;

  function Awake() {
    super.Awake()                                                                                   ;
    health            = 1                                                                           ; //bubble is fragile
    vForce           *= rbody.mass * 10.0                                                           ; //10.0 magic number to float?
    rbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ ; //ensures rotation around Y only
    pSystem           = bubbleObj.GetComponent(ParticleSystem)                                      ;
  }

  function Update () {
    //query input axes if necessary
    if(queryUserInput){
      var hit : RaycastHit;
      var distanceToGround:float = 0.0;
      if (Physics.Raycast (xform.position, -Vector3.up, hit)) {
        distanceToGround = hit.distance;
      }
      else{
      	distanceToGround = magHeight*0.5;
      }
		
	  //vertical height	
      var vPos:float = 0.0;
      if(distanceToGround < magHeight){
        vPos = vForce ;
      }
      else{
        vPos = vForce * vFallOff;
      }
      constantForce.force = Vector3(0.0, vPos, 0.0);

      //rotation
      var	angleH = Mathf.Clamp(Input.GetAxis("Horizontal"), -1, 1);  
      rbody.AddTorque(Vector3.up * angleH);

      if(Input.GetButton("Fire1")){
        rbody.AddRelativeForce (Vector3.forward * 10) ;
        pSystem.emissionRate = 1.0                    ;
        if(!audio.isPlaying){
          if(randomPitch){
            audio.pitch  = Random.Range(1.0-randomRange, 1.0+randomRange) ;
          }
          audio.clip = soundTrack ;
          audio.Play()            ;
        }
        Instantiate(bubbleFx, xform.position, xform.rotation) ;
      }
      else{
        pSystem.emissionRate = 0.1;
      }
    }
  }
}
