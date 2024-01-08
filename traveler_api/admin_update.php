<?php
// admin_update.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,
// 	Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$data = json_decode(file_get_contents("php://input"), true);

$admin_id = $data['admin_id'];
$fname = $data['fname'];
$lname = $data['lname'];
$email = $data['email'];
$phone = $data['phone'];
// $password = $data['password'];
// $admin_type = $data['admin_type'];
// $admin_status = $data['admin_status'];
// $created_by = $data['created_by'];

include "config.php";

$sql = "UPDATE admin SET fname = '{$fname}', lname = '{$lname}', email = '{$email}', phone = '{$phone}' WHERE admin_id = '{$admin_id}'";

if (mysqli_query($conn, $sql)) {
	echo json_encode(array('message' => 'Admin Record Updated.', 'status' => true), JSON_PRETTY_PRINT);
}else{
	echo json_encode(array('message' => 'Admin Record Not Updated.', 'status' => false), JSON_PRETTY_PRINT);
}   

?>