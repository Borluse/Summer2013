#pragma strict
private var xform   : Transform    ;
public var seeRange : float = 10.0 ;
public  var player  : Transform    ;

function Awake(){
  xform = transform ; //caching component lookup: transform =  = GetComponent(transform)
}

function Update () {
  //var direction=xform.position-player.position;
  //if(Input.GetButton("Fire1")){
  //  xform.rigidbody.AddForce(direction * 5);	
  //}
  //print("Visibility : " + CanSeeTarget());
  if(Input.GetKey(KeyCode.O)){
    xform.rigidbody.AddForce(Vector3.up * seeRange) ;
    print("I see you.")                             ;
  }
}

function CanSeeTarget():boolean{
  if(Vector3.Distance(xform.position, player.position)>seeRange){
    return false;
  }
  else{
    return true;
  }
}
