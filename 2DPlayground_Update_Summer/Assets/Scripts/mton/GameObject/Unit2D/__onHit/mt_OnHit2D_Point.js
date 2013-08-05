#pragma strict

class mt_OnHit2D_Point extends __onCollideMT{ //HACK ; rigidbody makes grapple wierd, extending collision only

  public var holdBool : boolean = false ;

  function Start () {
    super.Start();
  }

  function Update () {
    super.Update();
  }
}