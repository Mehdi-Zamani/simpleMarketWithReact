<?php 

include "connect.php";

$query1="SELECT * FROM tbl_cat";
$category=$connect->prepare($query1);
$category->execute();

$result1=$category->fetchAll();

$out=[];

foreach($result1  as $key=>$value){
	$id=$value['id'];
	$title=$value['title'];
	
	$out[$key]['title']=$title;
	
	$query2="SELECT * FROM product WHERE id_cat='$id'";
	$product=$connect->prepare($query2);
	$product->execute();

$result2=$product->fetchAll(PDO::FETCH_ASSOC);

$out[$key]['items']=$result2;
	

}
echo json_encode($out)


?>