
<?php
  include("db_con.php");

 
 
  $json =file_get_contents('php://input');
  $obj = json_decode($json ,true);
  $user_id= $obj['user_id'];
     
    //  $user_id=1;
$sql =mysqli_query($con,"SELECT * FROM `orders` WHERE `order_user_id` ='$user_id'");
 
if(mysqli_num_rows($sql) >0){
 
    while($row =mysqli_fetch_object($sql)){
       $Data =$row;
    }
     
    echo json_encode($Data);

}else{
  echo "Eroor";
}



?>