#pragma strict
import Vectrosity;

protected var xform : Transform ;
public var xformTarget : Transform;
public var radius : float = 5;

private var axisSpeed : float = 0.25;

function Awake(){
  xform = transform    ;             
}

function Start () {}

function Update () {
  xform.position.x = Mathf.Cos(xformTarget.position.x) * radius;
  xform.position.y = Mathf.Sin(xformTarget.position.y) * radius;
  xform.position.z = 0.0;
}