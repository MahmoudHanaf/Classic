<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $name= $obj['name'];
  $phone= $obj['phone'];
   
 

  if($name && $phone ){

    $sql =mysqli_query($con,"SELECT * FROM `users` WHERE `user_name` ='$name' AND `user_phone` ='$phone'");
 
      $Data= mysqli_fetch_object($sql);
      echo json_encode($Data);

  }else{
      echo "Eroor";
  }

?>  