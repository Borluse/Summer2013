#pragma strict
@script RequireComponent(Collider)

class __onCollideMT extends __gameObjectMT{

  protected var iamHit      : boolean = false        ; //iamHit resolves time til next eligible hit
  protected var hitBool     : boolean = true         ; //hitBool == eligible for health damage
  private   var hitRateWait : float = 0.05           ; //time (seconds until eligible for next hit)
  private   var nextHit     : float = 0.0            ;
  private   var collObj     : Collision              ;
  protected var hitObj      : Transform              ; //protected is accessible by subclasses
  protected var hitDir      : Vector3 = Vector3.zero ;
  protected var cbody       : Collider               ;

  function Awake(){
    super.Awake()       ;
    cbody = collider    ; //check for collider
    if(!cbody){
      DefaultCollider() ;
    }
  }

  function Start(){
    super.Start();
  }

  function Update(){}

  function OnCollisionEnter(collision : Collision) {
    collObj = collision;
    if(collObj){
      doCollide();
    }
  }
  
  function doCollide(){
    if(hitBool){
      //if(collObj.gameObject.CompareTag ("Bullet")){
        hitObj = collObj.transform ;
        if(Time.time > nextHit){
          iamHit = true ;
          nextHit = Time.time + hitRateWait;
        }
      }
      else{
        iamHit = false;
      }
    //}
  }

  function DefaultCollider(){
    var existingCollider:Collider = this.GetComponent(Collider);
    if(existingCollider == null){ //if no collider exists
      print(this + ": WARNING ASSIGNING DEFAULT COLLIDER : " + transform);
      this.gameObject.AddComponent(BoxCollider);  //assign a box collider
    }
  }

  function delayColliderEnable(delaySeconds){
    yield WaitForSeconds(delaySeconds) ;
    collider.enabled = true            ;
  }
  
  function setHitWait(waitDuration:float){
  	hitRateWait = waitDuration;
  }
}

