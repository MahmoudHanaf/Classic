<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $name= $obj['name'];
  $phone= $obj['phone'];

  // $name= 'Mahmoud Hanafy';
  // $phone= '01012748258';
   
   $Data =array();

  if($name && $phone ){

    $sql =mysqli_query($con,"SELECT * FROM `users` WHERE user_name='$name' AND user_phone ='$phone'");
 
     if(mysqli_num_rows($sql) >0){

        while($row = mysqli_fetch_object($sql)){
            $Data [] = $row ;
         }
   
         echo json_encode($Data);


     }else{
         echo "Eroor";
     }

     
  }else{
      echo "Eroor";
  }

?>  

