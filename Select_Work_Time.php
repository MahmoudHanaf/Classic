
<?php
   include ("db_con.php");

  $select= mysqli_query($con,"SELECT * FROM `information` WHERE 1");

  if(mysqli_num_rows($select) >0){
      
    $row  =mysqli_fetch_object($select);
    $data=$row->work_time;
      echo ($data);

  }else{
      echo "Eroor";
  }



?>