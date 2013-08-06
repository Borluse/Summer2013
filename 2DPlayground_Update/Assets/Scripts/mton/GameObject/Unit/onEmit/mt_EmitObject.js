#pragma strict
@script RequireComponent(NetworkView)

class mt_EmitObject extends __gameObjectMT{
  private   var nextFire  : float   = 0     ;
  private   var boolFire  : boolean = true  ; //eligible to fire
  protected var nowFiring : boolean = false ; //currently firing; useful for recoil
  
  public var eDirection : Vector3 = Vector3(0, 0, 1);
  
  public var bullet              : GameObject      ;
  public var flareObject         : GameObject      ; //spawn on Collision if valid
  public var speed               : float = 75      ;
  public var fireRate            : float = 0.1     ;

  function OnNetworkInstantiate (msg : NetworkMessageInfo) {
    if (!networkView.isMine){    // This is our own player
      SetEnableUserInput(false);
    }
  }

  function Awake(){
    super.Awake();
    eDirection = Vector3(speed, 0, 0);
  }

  function Update(){
    if(queryUserInput){ 
      if(boolFire){
        super.Update();
        if(Input.GetButton("Fire1")){
          Fire();
        }
      }
    }
  }

  function Fire() {
    if(Time.time > nextFire){
      nextFire  = Time.time + fireRate ;
      nowFiring = true                 ;
      doFire()                         ;
      if(flareObject!=null){ // if spawnObject valid/notempty, spawn the object
        Instantiate(flareObject, xform.position, xform.rotation) ;
      }
    }
    else{
      nowFiring = false;
    }
  }
  
  function doFire(){
    RPC_PlayerFire();
  }

  @RPC
  function RPC_PlayerFire () {
    var clone:GameObject     = Instantiate(bullet, xform.position, xform.rotation);
    clone.rigidbody.velocity = xform.TransformDirection(eDirection)               ; //requires @RPC, else use Network.Instantiate
  }
  
  function SetFireable(in_boolFire:boolean){
    boolFire = in_boolFire;
  }

}
