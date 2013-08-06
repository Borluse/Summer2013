#pragma strict
@script RequireComponent(Rigidbody)

class mt_Debris_Dir extends mt_Debris{

	var dColor:Color = Color(0.75, 0.75, 0.75);;
	var forceXform     : Transform;
	//var forceMagnitude : float = 1000;

	function Awake(){
		super.Awake();
		//print("Debris Awake");
		//var debrisMarker:GameObject = new GameObject ("DebrisMarker");
		//var debrisMarker:GameObject = PrefabUtility.InstantiatePrefab(Resources.Load("XformMarker")); 
		//forceXform = debrisMarker.transform;
	}

	function Start () {
		super.Start();
		forceDir = -(xform.position - forceXform.position).normalized;
		rigidbody.AddForce (forceDir * forceMagnitude);
		var randomVec = Vector3(Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0));
		rigidbody.AddTorque (randomVec * forceMagnitude * Random.Range(-1.0, 1.0));
		//print("xformDir : " + forceDir);
	}

function OnDrawGizmos () {
    if(forceXform != null) {
        // Draws a blue line from this transform to the target
        Gizmos.color = dColor;
        Gizmos.DrawLine (transform.position, forceXform.position);
        Gizmos.DrawWireSphere (forceXform.position, forceMagnitude/2500);
    }
}

}