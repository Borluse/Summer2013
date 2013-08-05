#pragma strict

class mt_UI_dHexagon extends __gameObjectMT{   //object filtering componenet, searches for object entities to update

  var size   : float   = 1.0          ;
  var posCur : Vector3 = Vector3.zero ; //current position
  var posPre : Vector3 = Vector3.zero ; //previous position

  private var iconTexts : Transform[]   = new Transform[7]   ;
  private var uTexts    : mt_UI_vText[] = new mt_UI_vText[7] ;

  function Start(){
    super.Start();
    
    for(var i = 0; i <iconTexts.Length; i++){
      var iXform:Transform = new GameObject().transform ;
      iconTexts[i]         = iXform                     ;
      
      var uText = new mt_UI_vText()   ;
      uText.Init()                    ;
      uText.SetTarget(iconTexts[i])   ;
      uText.SetTextMesh(i.ToString()) ;
      uTexts[i] = uText               ;   
    }
    
  }

  function Update(){
    Draw_Debug_Hexagon();
  }

  function Draw_Debug_Hexagon(){
/*
     2- -1
    3- * -0 //Hexagon position index
     4- -5
*/
    var x_i      = 0.0              ;
    var y_i      = 0.0              ;
    var center_x = xform.position.x ;
    var center_y = xform.position.y ;

    for (var i = 0; i <= 6; i++) {
      var angle = 2 * Mathf.PI / 6 * i               ;
      x_i       = center_x + size * Mathf.Cos(angle) ;
      y_i       = center_y + size * Mathf.Sin(angle) ;

      if (i == 0) {
        posPre = Vector3(x_i, y_i, 0.0);
      } 
      else {
        posCur = Vector3(x_i, y_i, 0.0)               ;
        Debug.DrawLine (posPre, posCur, Color.yellow) ;
        posPre        = posCur                        ;
      }
      iconTexts[i].position = posCur ;
      uTexts[i].Draw()               ;
    }
  }

}
