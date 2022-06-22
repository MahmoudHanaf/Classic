

<?php
   include ("db_con.php");

   
   $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
 

    $Data =array();
  
    $select =mysqli_query($con,"SELECT * FROM `orders`,`users` WHERE  order_user_id=users.user_id  ORDER BY booking_date");

    if(mysqli_num_rows($select) >0){

       while($row =mysqli_fetch_object($select)){
             $Data []=$row;
       }

       echo json_encode($Data);



    }else{
        echo "No Data";
    }



?>