<?php

include ("db_con.php");
     
   
      $json =file_get_contents('php://input');
      $obj = json_decode($json ,true);
      $name= $obj['name'];
      $phone= $obj['phone'];
      //   $name= 'محمود حنفي';
      // $phone= '01012748258';
    
   
        $select =mysqli_query($con,"SELECT * FROM `users` WHERE `user_name` ='$name' AND `user_phone`='$phone'");
    
        if(mysqli_num_rows($select) >0){
         
         $row =mysqli_fetch_object($select);
           echo json_encode($row);

        }else{
            echo json_encode("No Data");
        }



?>