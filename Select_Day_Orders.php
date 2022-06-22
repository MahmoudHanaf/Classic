<?php
   include ("db_con.php");

   
   $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $booking_date= $obj['booking_date'];

    $Data =array();
  
    $select =mysqli_query($con,"SELECT * FROM `orders`,`users` WHERE `booking_date` ='$booking_date' AND order_user_id=users.user_id  ORDER BY order_id");

    if(mysqli_num_rows($select) >0){

       while($row =mysqli_fetch_object($select)){
             $Data []=$row;
       }

       echo json_encode($Data);



    }else{
        echo "No Data";
    }



?>