<?php
     include("db_con.php");

     $json =file_get_contents('php://input');
    $obj = json_decode($json ,true);
    $name= $obj['name'];
    $phone= $obj['phone'];
   
    
    //  $user_email="Mahmoud@gmail.com";
    //  $user_password="789123";
   
     if($name && $phone){

         
        $sql =mysqli_query($con,"SELECT * FROM `users` WHERE `user_name` ='$name' AND `user_phone`='$phone'");
          

        if(mysqli_num_rows($sql) >0){
          
          
            $Data= mysqli_fetch_object($sql);
            echo json_encode($Data);
      
        }else{
            echo "Eroor";
        }
        

     }else{
         echo "Eroor";
     }
  
    
      

    
?>

