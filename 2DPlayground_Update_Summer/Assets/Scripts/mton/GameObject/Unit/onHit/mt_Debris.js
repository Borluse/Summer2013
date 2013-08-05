#pragma strict
@script RequireComponent(Rigidbody)

class mt_Debris extends __gameObjectMT{

	var forceMagnitude : float = 1000;
	protected var rbody    : Rigidbody;
	protected var forceDir : Vector3 = Vector3.zero;

	function Start () {
		super.Start();
		rbody = rigidbody;
				
		forceDir.x = Random.Range(-1.0, 1.0) * forceMagnitude   ;
        forceDir.y = Random.Range(-1.0, 1.0) * forceMagnitude   ;
	}

}