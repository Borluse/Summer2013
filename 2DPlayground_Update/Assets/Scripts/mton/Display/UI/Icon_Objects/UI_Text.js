#pragma strict

protected var textMesh : tk2dTextMesh ;
private   var score    : int = 0      ;

function Start () {
  textMesh = GetComponent(tk2dTextMesh);
}

function Update () {
  textMesh.text = "Time: " + Time.time.ToString("F2");  //Rounding to 2 decimal places

  // This is important, your changes will not be updated until you call Commit()
  // This is so you can change multiple parameters without reconstructing
  // the mesh repeatedly
  textMesh.Commit();
}
