@script RequireComponent (NetworkView)
class mt_Network_InitPlayer extends __gameObjectMT{
	
	public var controlScript : String = "ENTER OBJECT TO DISABLE USER INPUT HERE"; //???Pipe to Script?
	
	function OnNetworkInstantiate (msg : NetworkMessageInfo) {
		//initPlayer(mt_Car);
	}
	
	function Start(){ 	//NOTE:Awake() Doesn't complete SendingMessage to MainCamera to Set Target??? Using Start instead
		initPlayer(controlScript);
	}
	
	function initPlayer(controlScript){
		// This is our own player
		if (networkView.isMine){
			//Camera.main.SendMessage("SetTarget", xform)      ;
			GetComponent("NetworkRigidbody").enabled = false ;
		}
		// This is just some remote controlled player, don't execute direct user input on this
		else{
			name += "Remote";
			if(controlScript!="ENTER OBJECT TO DISABLE USER INPUT HERE"){
				var remoteControlDisabled = GetComponent(controlScript);
				if(remoteControlDisabled!=null){
					remoteControlDisabled.SetEnableUserInput(false);
				}
				else{
					Debug.LogWarning(xform + "NETWORK: Couldn't disable remoteControlled Object");
				}
			}
			else{
				Debug.LogWarning(xform + "NETWORK: RemoteControlled Object should be disabled : ENTER OBJECT TO DISABLE USER INPUT HERE");
			}
			GetComponent("NetworkRigidbody").enabled = true        ;
		}
	}
	
}
