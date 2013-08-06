#pragma strict

class Unit2D_IO_AI extends Unit2D_IO{

  private var kSpeed:float = 1.0;
  private var kFlip :float = 1.0;
  private var kWalk :float = 5.3;

  function Start(){
    animMod = Random.Range(1.0, 10.0) ;
    super.Start()                     ;
  }

  function do_IO(){
    do_AI();
  }

  function do_AI(){
    dash  = false ;
    bDuck = false ;
    bJump = false ;
    if(!sleepB){
      if(Input.GetKey(KeyCode.I)){
        do_Idle();
      }
      if(Input.GetKey(KeyCode.UpArrow)){
        do_Walk();
      }
      if(Input.GetKeyUp(KeyCode.X)||Input.GetKeyUp(KeyCode.J)){
        do_Jump();
      }
      if(Input.GetKeyUp(KeyCode.F)){
        kFlip = -kFlip;
      }
      if(Input.GetKey(KeyCode.P)){
        do_Dash();
      }  
      if(Input.GetKey(KeyCode.DownArrow)){
        do_Duck();
      }

      hAxis = kFlip * kSpeed;
    }
    else{
      hAxis = 0.0; //zero out moving so ai is still; good for hit animation
    }
  }

  function do_Walk(){
    kSpeed = 1.0;
    //kSpeed=Mathf.SmoothStep(kSpeed, 1.0, kWalk);
  }

  function do_Idle(){
    kSpeed = 0.0;
    //kSpeed=Mathf.SmoothStep(1.0, 0.0, kWalk);
  }

  function do_Jump(){
    bJump = true;
  }

  function do_Dash(){
    dash = true;
  }

  function do_Duck(){
    bDuck = true;
  }

  function do_TurnWalk(){
    kFlip = -kFlip ;
    do_Walk()      ;
  }

  function do_Think(idle_Dur:float, callback:Function){
    if(!sleepB){
      do_Idle()                          ;
      //print("do_Yield: for 2 seconds") ;
      yield WaitForSeconds (idle_Dur)    ;
      //print("do_Yield: done")          ;
      callback()                         ;
    }
  }

  function do_Edge(){
    do_Think(0.25, do_TurnWalk);
  }

}
