#pragma strict

public class mt_Attack extends MonoBehaviour{

  enum enType{ //enumerates the possible attack
    idle,
    mlee, //melee
    dist, //distance, range
    uppr,
    dwnr,
    powr, //power
    spcl, //special
    time  //time freeze
  }
  
  enum enStnd{ //stance during attack
    idle,
    uppr,
    dwnr,
    dash,
    jump,
    duck,
    spcl
  }
  
  enum enElem{ //attack element
    idle,
    fire,
    watr,
    erth,
    wind,
    frez,
    psyc,
    spcl
  }

  public var amount : int = 1 ;
  public var type   : enType  ; 
  public var stnd   : enStnd  ;
  public var elem   : enElem  ;
  
  function Start  () {}
  function Update () {
  }

}