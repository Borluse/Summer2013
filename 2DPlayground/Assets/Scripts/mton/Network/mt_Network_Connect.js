#pragma strict
function Awake() {
	MasterServer.RequestHostList("MadBubbleSmashGame");
}

function Start () {}
function Update () {}

function OnGUI() {
	var data : HostData[] = MasterServer.PollHostList();
	// Go through all the hosts in the host list
	for (var element in data)
	{
		GUILayout.BeginHorizontal();	
		var name = element.gameName + " " + element.connectedPlayers + " / " + element.playerLimit;
		GUILayout.Label(name);	
		GUILayout.Space(5);
		var hostInfo;
		hostInfo = "[";
		for (var host in element.ip)
			hostInfo = hostInfo + host + ":" + element.port + " ";
		hostInfo = hostInfo + "]";
		//GUILayout.Label(hostInfo);	
		GUILayout.Space(5);
		//GUILayout.Label(element.comment);
		GUILayout.Space(5);
		GUILayout.FlexibleSpace();
		if (GUILayout.Button("Connect"))
		{
			// Connect to HostData struct, internally the correct method is used (GUID when using NAT).
			Network.Connect(element);			
		}
		GUILayout.EndHorizontal();	
	}
}