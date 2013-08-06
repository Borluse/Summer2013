#pragma strict
//GLOBAL singleton --> Attach me to the maincamera
public class mton_GLOBAL extends MonoBehaviour{

  private static var instance: mton_GLOBAL;

  public static function Instance():mton_GLOBAL{
    return instance ; //use instance to return nonstatic variable such as textField
  }

  function Awake():void{
    instance = this    ;
  }

  //global/static var and functions here
  static var uiTimeBool:boolean = false       ;
  static var playerCollection   = new Array() ;
  static var xformCollection    = new Array() ;
  
  function Start():void{
    playerCollection = findObjectsWithScript(Unit2D);
  }

  public var textField   : TextMesh;

  static function DisplayText( text:String ){
    if( mton_GLOBAL.Instance().textField )
      mton_GLOBAL.Instance().textField.text = text;
    else
      Debug.Log( text );
  }

  static function PickObject( screenPos : Vector2 ) : GameObject{
    var ray : Ray = Camera.main.ScreenPointToRay( screenPos ) ;
    var hit : RaycastHit                                      ;

    if( Physics.Raycast( ray, hit ) ){
      return hit.collider.gameObject;
    }
    else{
      return null;
    }
  }

  static function xformCollectionPrint(){
    for(xform in xformCollection){
      print(" boogers: "+ xform);
    }
  }
  
  static function findObjectsWithScript(scriptName):Array{
    var mt_ObjColl:Array = FindObjectsOfType(scriptName);
    for(each in mt_ObjColl){
      print("mton_GLOBAL.findObjectsWithScript() : " + each);
    }
    return mt_ObjColl;
  }
}
