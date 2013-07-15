#pragma strict

class Unit2D_IO_AI extends Unit2D_IO{
  private var kSpeed:float = 1.0;
  private var kFlip :float = 1.0;
  
  function Start(){
    super.Start();
  }
  
  function do_IO(){
    do_AI();
  }

  function do_AI(){
    if(Mathf.Abs(_io_.Get_kX())<0.001){
      kFlip = -kFlip;
    }
    if(Input.GetKey(KeyCode.I)){
      do_Idle();
    }
    if(Input.GetKey(KeyCode.W)){
      do_Walk();
    }
    if(Input.GetKey(KeyCode.J)){
      bJump=true;
    }
    else{
      bJump=false;
    }
    hAxis = kFlip * kSpeed;
  }
  
  function do_Walk(){
    kSpeed = 1.0;
  }
  
  function do_Idle(){
    kSpeed = 0.0;
  }

}
