<?php

include("db_con.php");


$json =file_get_contents('php://input');
$obj = json_decode($json ,true);
$order_id= $obj['order_id'];


//  $cart_id =5;

 if($order_id){

    $sql =mysqli_query($con ,"DELETE FROM `orders` WHERE `order_id` ='$order_id'");
 
    if(mysqli_affected_rows($con) >0){
   
        echo "Success";
    }else{
        echo "Eroor";
    }

 }else{
     echo "Eroor";
 }


?>