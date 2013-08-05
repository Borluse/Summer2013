#pragma strict
@script RequireComponent(NetworkView)

class mt_OnHitDeath extends mt_OnHit{

  private   var spawnPos    : Vector3 = Vector3.zero ;
  private   var spawnRot    : Quaternion             ;
  protected var respawnWait : float = 2.0            ; 
  protected var healthMax   : float = 1.0            ; 
  protected var healthInc   : float = 1.0            ; //make available to onHitRed
  protected var renderMesh  : Renderer               ;

  public var lifeCount      : int = 0    ;
  public var onDeathSpawn   : GameObject ;
  public var impactParticle : GameObject ;

  function Awake(){
    super.Awake();
    doBirth()    ;
/*
var myNetworkView = networkView;
myNetworkView.observed = null;
myNetworkView.stateSynchronization = NetworkStateSynchronization.Off;
*/
  }

  function Start () {
    super.Start();
  }

  function Update () {
    super.Update();
  }

  function doHit(){
    super.doHit();
    if(health<=0.0){	
      networkView.RPC ("RPC_onHitDeath", RPCMode.All);
    }
    else{
      applyDamage();
    }
  }

  function applyDamage(){				//apply damage->ex:turning material color red
    healthInc = health/healthMax;
    if(hitObj){
      if(impactParticle){
        Instantiate(impactParticle, hitObj.position, xform.rotation) ;
      }
    }
  }

  @RPC
  function RPC_onHitDeath () {
    doDeath();
  }
  
  function doBirth(){ //init GameObject here
  	healthMax = health    ; //not in start, else will reset to 1.0???
    renderMesh = renderer ;
    SetSpawnXform()       ;
  }

  function doDeath(){  //clean up GameObject removal here
    //rigidbody.AddForce (Vector3.up * hitDir.magnitude * 5000) ;
    hitBool          = false                                  ;

    if(onDeathSpawn!=null){					//NOTE: spawn particle before StartCoroutine call
      Instantiate(onDeathSpawn, xform.position, xform.rotation) ;
    }			
    if(lifeCount<=0){
      Destroy (gameObject);
    }
    else{
      yield StartCoroutine("objRespawn") ; //halt ops until done //NOTE: can't be called directly from update loop...
    }
    
  }	

  function objRespawn(){
    health             = healthMax     ; //Health must be reset first, else can be destroyed prematurely by bullet barrage
    print("objRespawn : Resetting Health : " + health + " max -> " + healthMax);
    renderMesh.enabled = false         ;
    lifeCount          = lifeCount-1   ; //reset object state
    yield WaitForSeconds (respawnWait) ; //NOTE: yield complicates function subclassing/extension, better to separate
    doYieldRestoreStateAfterRespawn()  ;
  }

  function doYieldRestoreStateAfterRespawn(){
    ApplySpawnXform()         ;
    renderMesh.enabled = true ;
    hitBool            = true ; //can now take damage
  }

  function SetSpawnXform(){
    spawnPos = xform.position ;
    spawnRot = xform.rotation ;
  }

  function ApplySpawnXform(){//xform:Transform){
    xform.position           = spawnPos     ;
    xform.rotation           = spawnRot     ;
    xform.rigidbody.velocity = Vector3.zero ;
  }
  

  
}
