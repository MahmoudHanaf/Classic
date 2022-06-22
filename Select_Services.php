
<?php
   include ("db_con.php");

   
//    $json =file_get_contents('php://input');
//   $obj = json_decode($json ,true);
//   $booking_date= $obj['booking_date'];

    $Data =array();
  
    $select =mysqli_query($con,"SELECT * FROM `services` WHERE 1");

    if(mysqli_num_rows($select) >0){

       while($row =mysqli_fetch_object($select)){
             $Data []=$row;
       }

       echo json_encode($Data);



    }else{
        echo "No Data";
    }



?>