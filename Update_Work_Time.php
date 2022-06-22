
<?php
   include ("db_con.php");

   $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $work_time= $obj['work_time'];

  $update= mysqli_query($con,"UPDATE `information` SET `work_time`='$work_time' WHERE 1");
  $select= mysqli_query($con,"SELECT * FROM `information` WHERE 1");
  
  if(mysqli_affected_rows($con) >0){
      
    $row  =mysqli_fetch_object($select);
    $data=$row->work_time;
      echo (trim($data));


  }else{
      echo "Eroor";
  }



?>