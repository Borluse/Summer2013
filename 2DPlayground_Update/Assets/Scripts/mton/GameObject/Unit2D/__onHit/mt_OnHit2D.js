#pragma strict

class mt_OnHit2D extends __onCollideMT{

  public  var health       : int     = 5 ;
  private var attackObject : mt_Attack   ;

  function Awake(){
    super.Awake()       ;
    //DefaultCollider() ;
  }

  function Start(){
    super.Start();
  }

  function Update(){
    super.Update();
  }
  
  function doCollide(){
    super.doCollide() ;
    if(iamHit){  //iamHit resolves time til next eligible hit
      if(hitObj){
        doHit();
      }
    }
  }

  function doHit(){
    attackObject = hitObj.GetComponent(mt_Attack) ;
    if(attackObject){
      applyDamage() ; //update state      : health and color
      applyForce()  ; //update hit visual : transform/animate/spawn particle
    }
    //print("I am hit. Health: " + health + " Damaged by : " + hitObj);
  }
  
  function applyDamage(){                
    health -= attackObject.amount      ; // damage the object
  }
  
  function applyForce(){                 
    hitDir = hitObj.rigidbody.velocity ; // store velocity of collision body
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
