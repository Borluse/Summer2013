#pragma strict

class mt_ParticleEmit extends mt_AudioOnWake{
  private var pSystem: ParticleSystem;

  function Awake(){
    super.Awake()                          ;
    pSystem = GetComponent(ParticleSystem) ; //caching component lookup: transform == GetComponent(transform)
    pSystem.Play()                         ;
    var particleParent = transform.parent  ;
    if(particleParent){  //destroy parent if exist
      Destroy (particleParent.gameObject, pSystem.duration);
    }
    else{
      Destroy (gameObject, pSystem.duration);
    }
  }
}

/* WHY DOESN'T PARTICLE NOT HAVE UPDATE???  ALSO Start() DOESN'T GET CALLED???
function Update(){
print("I am updating.");
if (!pSystem.IsAlive()){
//print("Particle Done");
Destroy (gameObject);
}
}
*/
