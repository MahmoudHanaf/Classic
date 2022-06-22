
<?php

 
          ///////////////////////////////////////////////////////////////////

   include ("db_con.php");
     
   
      $json =file_get_contents('php://input');
      $obj = json_decode($json ,true);
      $booking_date= $obj['booking_date'];
    
   
    //    $booking_date = 'Wed Mar 02 2022';
        $data  =array();
        $Data = array();
        $select =mysqli_query($con,"SELECT start_booking, end_booking,status  FROM `orders` WHERE booking_date ='$booking_date' ORDER BY order_id");
    
        if(mysqli_num_rows($select) >0){
         
           while($row =mysqli_fetch_object($select)){
            $data [] =$row;

              }
           
           echo json_encode($data);

        }else{
            echo json_encode("No Data");
        }



?>