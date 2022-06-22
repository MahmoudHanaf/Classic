<?php
  
  include("db_con.php");

  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $user_name= $obj['user_name'];
  $user_phone= $obj['user_phone'];

  $user_age= $obj['user_age'];
  

//    $user_name ="Mohammed";
//    $user_phone ="01150086423";
//    $user_photo ="Alex";
//    $user_age ='25';


   if($user_name && $user_phone  && $user_age ){

    $select = mysqli_query($con,"SELECT * FROM `users` WHERE user_name ='$user_name' AND user_phone ='$user_phone'");

    if(mysqli_num_rows($select) == 0){

        $sql =mysqli_query($con ,"INSERT INTO `users`( `user_name`, `user_phone`, `user_age`) 
        VALUES ('$user_name','$user_phone','$user_age')");

            if(mysqli_affected_rows($con) >0){

                $user_id = mysqli_insert_id($con);
                echo json_encode($user_id);

            }else {
                echo "Eroor";
            }


    }else{
        echo "This phone is found";
    }


   
     
      

    }


   else{
       echo "Eroor";
   }

  




?>