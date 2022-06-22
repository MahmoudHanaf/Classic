<?php
  include("db_con.php");
  
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $photo_uri= $obj['photo_uri'];
  $name= $obj['name'];
  $phone= $obj['phone'];

// $photo_uri= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSufOKKnOlUtMAaD1JNvT56vVKFN6zNhAHZbf5T1bxLh1CDPnjOpRlXyroHTPOh9vwczXs&usqp=CAU';
// $email= 'Ahmed@gmail.com';
// $password= '123789';

  if($photo_uri && $name && $phone ){

    $sql =mysqli_query($con,"UPDATE `users` SET `user_photo`='$photo_uri'WHERE `user_name`='$name'AND `user_phone`='$phone'");
 
        if(mysqli_affected_rows($con) >0){
            
            echo "Sucess";


        }else{
            echo "Eror";
        }


  }else{
      echo "Eroor";
  }

?>  