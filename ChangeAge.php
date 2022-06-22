
<?php

include("db_con.php");


$json =file_get_contents('php://input');
$obj = json_decode($json ,true);
$age= $obj['age'];
$name= $obj['name'];
$phone= $obj['phone'];


// $email ='Mahmoud@gmail.com';
// $password ='789123';


 if($age){

    $sql =mysqli_query($con ,"UPDATE `users` SET `user_age`='$age' WHERE `user_name`='$name' AND `user_phone` ='$phone'");
 
    if(mysqli_affected_rows($con) >0){
   
        echo "Success";
    }else{
        echo "Eroor";
    }

 }else{
     echo "Eroor";
 }


?>