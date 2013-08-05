#pragma strict
function Start () {}
function Update () {}

function OnGUI() {
	if (GUILayout.Button ("Start Server"))
	{
		// Use NAT punchthrough if no public IP present
		Network.InitializeServer(32, 25002, !Network.HavePublicAddress());
		MasterServer.RegisterHost("Capture the Flag", "CuteTankForce", "cutest tank game for all");
		print("Starting Server Buddy.");
	}
}