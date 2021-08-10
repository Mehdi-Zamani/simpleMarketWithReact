<?php 

include "connect.php";

if(empty($_REQUEST['displayName'])||empty($_REQUEST['email'])||empty($_REQUEST['password'])){return;}

$name=htmlentities($_POST['displayName']);
$email=htmlentities($_POST['email']);
$password=htmlentities($_POST['password']);



$query1="SELECT * FROM tbl_users WHERE email='$email'";
$result1=$connect->prepare($query1);
$result1->execute();
$row1=$result1->fetch(PDO::FETCH_ASSOC);

if($row1==false){
	$query2="INSERT INTO tbl_users (displayName,email,password) VALUES ('$name','$email','$password')";
	$result2=$connect->prepare($query2);
	$result2->execute();
	
	$lastId=$connect->lastInsertId();
	$query3="SELECT * FROM tbl_users WHERE id='$lastId'";
	$result3=$connect->prepare($query3);
	$result3->execute();
	$row3=$result3->fetch(PDO::FETCH_ASSOC);
	
	
	$rec=array();
	$rec['displayName']=$row3['displayName'];
	$rec['email']=$row3['email'];
	$rec['id']=$row3['id'];
	
	echo json_encode($rec);
	
}else{
	echo "This email has already been registered ";
}



?>