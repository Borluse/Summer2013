@script RequireComponent (NetworkView)
class mt_NetworkSpawnPoint extends mt_OnHitDeath{

  public  var playerPrefab : Transform      ;
  public  var bubblePrefab : Transform      ;
  public  var corpsePrefab : Transform      ;
  public  var bubbleFx     : GameObject     ; //spawn on Collision on emmission
  public  var bubbleVForce : float = 350.0  ;

  private var instActive   : Transform      ;
  private var instPlayer   : Transform      ;
  private var instBubble   : Transform      ;
  private var instCorpse   : Transform      ;
  private var tankToggle   : boolean = true ;

  function OnNetworkLoadedLevel (){
    instPlayer = SpawnPlayer() ;
    instActive = instPlayer    ;
    // Notify our objects that the level and the network is ready
    print("PlayerSpawned");
    for (var go in FindObjectsOfType(GameObject)){
      go.SendMessage("mton_PlayerSpawned", SendMessageOptions.DontRequireReceiver);	
    }
  }

  function OnPlayerDisconnected (player : NetworkPlayer){
    Debug.Log("Server destroying player") ;
    Network.RemoveRPCs(player, 0)         ;
    Network.DestroyPlayerObjects(player)  ;
  }

  function Update(){
    if(Input.GetKeyUp (KeyCode.Minus)){ //Respawn
      PlayerReset();
    }
    else if(Input.GetKeyUp (KeyCode.B) && timeToggle==true){ //Respawn;
      PlayerBubbleToggle(tankToggle) ;
      tankToggle = !tankToggle       ;
      timeBufferDelay(1.5)           ;
    }
  }

  function PlayerReset(){
    // clear other objects
    tankToggle = true                                           ;
    if(instPlayer) { Network.Destroy(instPlayer.gameObject) ; } ;
    if(instBubble) { Network.Destroy(instBubble.gameObject) ; } ;
    if(instCorpse) { Network.Destroy(instCorpse.gameObject) ; } ;

    instPlayer                    = SpawnPlayer()         ;
    instPlayer.position           = xform.position        ;
    instPlayer.rigidbody.velocity = Vector3.zero          ;
    Instantiate(bubbleFx, xform.position, xform.rotation) ;
  }

  function PlayerBubbleToggle(tankToggle:boolean){
    if(instPlayer){
      if(tankToggle){  //switch to bubble
        instBubble = ObjectSwap(instPlayer, bubblePrefab)               ;
        //Camera.main.SendMessage("SetTarget", instBubble)              ;
        Instantiate(bubbleFx, instBubble.position, instBubble.rotation) ;
        instBubble.rigidbody.AddForce(Vector3.up * bubbleVForce)        ;
        instActive = instBubble                                         ;
      }
      else{            //switch to tank
        instPlayer = ObjectSwap(instBubble, playerPrefab)               ;
        //Camera.main.SendMessage("SetTarget", instPlayer)              ;
        Instantiate(bubbleFx, instPlayer.position, instPlayer.rotation) ;
        instActive = instPlayer                                         ;
      }
    }
    else{
      if(!instCorpse){
        instCorpse = ObjectSwap(instBubble, corpsePrefab) ;
        instActive = instCorpse                           ;
      }
    }
  }

  private function ObjectSwap(source:Transform, target:Transform){ //depends on private class var
    var sourcePos: Vector3    = source.position                 ;
    var sourceRot: Quaternion = source.rotation                 ;
    sourceRot.x               = 0.0                             ;
    sourceRot.z               = 0.0                             ;
    Network.Destroy(source.gameObject)                          ;
    Network.RemoveRPCs(networkView.viewID)                      ;
    return Network.Instantiate(target, sourcePos, sourceRot, 0) ;
  }

  function SpawnBubble(){
    var bubbleInstance = Network.Instantiate(bubblePrefab, Vector3.zero, xform.rotation, 0) ;
    bubbleInstance.gameObject.SetActive (false)                                             ;
    return bubbleInstance                                                                   ;
  }

  function SpawnPlayer(){
    // Randomize starting location
    var spawnPos                   = xform.position                  ;
    Camera.main.transform.position = spawnPos                        ;
    var pos : Vector3                                                ;
    pos.x = 10 * Random.value + spawnPos.x                           ;
    pos.y = 4 + spawnPos.y                                           ;
    pos.z = 10 * Random.value + spawnPos.z                           ;
    return Network.Instantiate(playerPrefab, pos, xform.rotation, 0) ;
  }

  function doOnGUI(){
    if(Input.GetKey (KeyCode.L)){ //Death Debug.  Remove me.
      //print("Label Pressed")                   ;
      var timeCountDown = ("Time: " + Time.time) ;
      labelAtXform(timeCountDown, instPlayer)    ;
    }
  }

/*
function DestroyPlayer(){
//Network.RemoveRPCs(instObject.networkView.viewID);
//Network.RemoveRPCs(instObject.GetComponent(NetworkView).viewID);
//Network.Destroy(instObject.GetComponent(NetworkView).viewID);
Network.Destroy(instPlayer.gameObject);
//Network.DestroyPlayerObjects(instObject.gameObject);
}
*/

}
