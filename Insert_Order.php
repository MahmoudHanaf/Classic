<?php

   include("db_con.php");

   $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $user_id= $obj['user_id'];
  $booking_date= $obj['booking_date'];
  $status= $obj['status'];
  $start_booking= $obj['start_booking'];
  $end_booking = $obj['end_booking'];
  $services =$obj['services'];
 
    // $user_id =1;
    // $booking_date ='2022-02-24';
    // $status='حجز عادى';
    // $start_booking= '7 مساءا';
    // $end_booking ='8 مساءا';

    $select =mysqli_query($con,"SELECT * FROM `orders` 
    WHERE `start_booking` ='$start_booking' AND `end_booking` ='$end_booking' AND `booking_date`='$booking_date'");
    
    $select_order =mysqli_query($con,"SELECT * FROM `orders` WHERE `order_user_id`='$user_id' AND `booking_date` ='$booking_date' ");

if($user_id !=1)// this value will change
  { 
      
    if(mysqli_num_rows($select) >1 || mysqli_num_rows($select_order) !=0  ){ 

        echo json_encode("No Booking agin in the same day");
    
    }else{


        if($user_id && $booking_date && $status && $start_booking && $end_booking ){
    
            $insert =mysqli_query($con,"INSERT INTO `orders`(`status`, `order_user_id`, `booking_date`, `start_booking`, `end_booking`,`booking_time`,`services`) 
            VALUES ('$status','$user_id','$booking_date','$start_booking','$end_booking',DATE_ADD(now(),interval 0 hour),'$services' ) ");
    
            if(mysqli_affected_rows($con) >0){
                
                $order_id =mysqli_insert_id($con);
                echo $order_id;
    
            }else{
                echo json_encode("Erorr");
            }
    
        }
    
    
       
    }
     
 }else{
    if($user_id && $booking_date && $status && $start_booking && $end_booking ){
    
        $insert =mysqli_query($con,"INSERT INTO `orders`(`status`, `order_user_id`, `booking_date`, `start_booking`, `end_booking`,`booking_time`,`services`) 
        VALUES ('$status','$user_id','$booking_date','$start_booking','$end_booking',DATE_ADD(now(),interval 0 hour),'$services' ) ");

        if(mysqli_affected_rows($con) >0){
            
            $order_id =mysqli_insert_id($con);
            echo $order_id;

        }else{
            echo json_encode("Erorr");
        }

    } 
 }    





?>