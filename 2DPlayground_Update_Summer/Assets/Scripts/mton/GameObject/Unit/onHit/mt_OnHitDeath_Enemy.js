#pragma strict
class mt_OnHitDeath_Enemy extends mt_OnHitDeath_Red{
  private var playerOne : GameObject[]; //the player

  function Awake(){
    super.Awake();
  }

  function doBirth(){ //init GameObject here
	super.doBirth();
  	print("Enemy lives : " + xform);
  }

  function applyDamage(){
    super.applyDamage();
    for (var player : GameObject in playerOne)  { 
      print("Shot by : " + player);
    }
  }

  function doYieldRestoreStateAfterRespawn(){
    super.doYieldRestoreStateAfterRespawn() ;
  }

  function mton_PlayerSpawned () {
    playerOne = GameObject.FindGameObjectsWithTag("Player");
    for (var player : GameObject in playerOne)  { 
      print("Found : " + player);
    }
  }

  // Find the name of the closest enemy
  function FindClosestPlayer () : GameObject {
    var closest : GameObject; 
    var distance = Mathf.Infinity; 
    var position = transform.position; 
    // Iterate through them and find the closest one
    for (var player : GameObject in playerOne)  { 
      var diff = (player.transform.position - position);
      var curDistance = diff.sqrMagnitude; 
      if (curDistance < distance) { 
        closest = player; 
        distance = curDistance; 
      } 
    } 
    return closest;    
  }
}
