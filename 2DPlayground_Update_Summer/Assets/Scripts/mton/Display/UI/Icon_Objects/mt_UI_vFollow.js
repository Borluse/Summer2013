#pragma strict

class mt_UI_vFollow extends mt_UI_vCircleDB{

  function Draw(){
    var dist:float = Mathf.Min(Vector3.Distance(xform.position, entity.position) * 0.25, 1.0) ;
    if(dist<0.95){
      xform.localScale = Vector3(dist, dist*dist * 0.75, dist) ;
    }
    else{
      xform.localScale = Vector3(dist, dist*dist, dist)        ;
    }
    super.Draw();
  }
  
}