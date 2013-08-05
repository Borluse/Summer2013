#pragma strict
import Vectrosity;

protected var xform : Transform ;
private var hAxis : float;
private var vAxis : float;
private var axisSpeed : float = 0.25;

function Awake(){
  xform = transform    ;             
}

function Start () {}

function Update () {
  hAxis = Input.GetAxis("Horizontal") ;
  vAxis = Input.GetAxis("Vertical") ;
  xform.position.x = xform.position.x + (1.0*hAxis * axisSpeed);
  xform.position.y = xform.position.y + (1.0*vAxis * axisSpeed);
}