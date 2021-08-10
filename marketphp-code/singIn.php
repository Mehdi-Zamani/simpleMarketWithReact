<?php
include "connect.php";

if(empty($_REQUEST["email"])||empty($_REQUEST["password"])){return;}


$email=htmlentities($_POST["email"]);
$password=htmlentities($_POST["password"]);


$query1="SELECT * FROM tbl_users WHERE email='$email'";
$result1=$connect->prepare($query1);
$result1->execute();
$row1=$result1->fetch(PDO::FETCH_ASSOC);


if($row1==TRUE){
	$query2="SELECT * FROM tbl_users WHERE email='$email' AND password='$password'";
	$result2=$connect->prepare($query2);
	$result2->execute();
	$row2=$result2->fetch(PDO::FETCH_ASSOC);
	
	if($row2){
		$rec=array();
		$rec['displayName']=$row2['displayName'];
		$rec['email']=$row2['email'];
		$rec['id']=$row2['id'];
		
		echo json_encode($rec);
	}
	else{echo"password is wrong";}
}
else{echo "this user in not exsist" ;}




?>