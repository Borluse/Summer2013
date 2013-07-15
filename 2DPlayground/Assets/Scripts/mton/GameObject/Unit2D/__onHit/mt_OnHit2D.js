#pragma strict
@script RequireComponent(Rigidbody)

class mt_OnHit2D extends __onCollideMT{

  public    var health      : int     = 5 ;
  protected var rbody       : Rigidbody   ;

  function Awake(){
    super.Awake()       ;
    rbody = rigidbody   ;
    //DefaultCollider() ;
  }

  function Start(){
    super.Start();
  }

  function Update(){}
  
  function doCollide(){
    super.doCollide() ;
    if(iamHit){  //iamHit resolves time til next eligible hit
      if(hitObj){
        doHit();
      }
    }
  }

  function doHit(){
    var attackObject:mt_Attack = hitObj.GetComponent(mt_Attack) ;
    if(attackObject){
      health -= attackObject.amount      ; // damage the object
      hitDir = hitObj.rigidbody.velocity ; // store velocity of collision body
    }
    //print("I am hit. Health: " + health + " Damaged by : " + hitObj);
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
