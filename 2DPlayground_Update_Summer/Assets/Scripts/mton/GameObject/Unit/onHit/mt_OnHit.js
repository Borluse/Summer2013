#pragma strict
@script RequireComponent(Rigidbody)

class mt_OnHit extends __gameObjectMT{

  public    var health      : int     = 5            ;
  protected var iamHit      : boolean = false        ;
  protected var hitBool     : boolean = true         ; //hitBool == eligible for health damage
  private   var hitRateWait : float = 0.05           ; //time (seconds until eligible for next hit)
  private   var nextHit     : float = 0.0            ;
  protected var hitObj      : Transform              ; //protected is accessible by subclasses
  protected var hitDir      : Vector3 = Vector3.zero ;
  protected var rbody       : Rigidbody              ;

  function Awake(){
    super.Awake()       ;
    rbody = rigidbody   ;
    //DefaultCollider() ;
  }

  function Start(){
    super.Start();
  }

  function Update(){}

  function OnCollisionEnter(collision : Collision) {
    if(hitBool){
      if(collision.gameObject.CompareTag ("Bullet")){
        hitObj = collision.transform ;
        if(Time.time > nextHit){
          doHit()       ;
          iamHit = true ;
        }
      }
      else{
        iamHit = false;
      }
    }
  }

  function doHit(){
  	if(hitObj){
    	var attackObject:mt_Attack = hitObj.GetComponent(mt_Attack) ;
    	if(attackObject){
      		health -= attackObject.amount      ; // damage the object
      		hitDir = hitObj.rigidbody.velocity ; // store velocity of collision body
    	}
    	nextHit = Time.time + hitRateWait ;
    	//print("I am hit. Health: " + health + " Damaged by : " + hitObj);
    }
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

/*
//particle effect for ground hit
var hitEffect : Transform;

function OnCollisionEnter(collision : Collision) {
//print("I am hit.");
// Debug-draw all contact points and normals
for (var contact : ContactPoint in collision.contacts) {
Debug.DrawRay(contact.point, contact.normal, Color.white);
hitEffect.position=contact.point;
}

// Play a sound if the coliding objects had a big impact.        
if (collision.relativeVelocity.magnitude > 2){
//audio.Play();
}
}
*/
