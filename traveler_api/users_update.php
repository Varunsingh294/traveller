<?php
// users_update.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,
// 	Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$data = json_decode(file_get_contents("php://input"), true);

// $adminid = $data['adminid'];
$user_id = $data['user_id'];
$fname = $data['fname'];
$lname = $data['lname'];
$email = $data['email'];
$phone = $data['phone'];
// $password = $data['password'];
// $user_type = $data['user_type'];
// $user_status = $data['user_status'];
// $user_created = $data['user_created'];

include "config.php";

$sql = "UPDATE users SET fname = '{$fname}', lname = '{$lname}', email = '{$email}', phone = '{$phone}' WHERE user_id = '{$user_id}'";


if (mysqli_query($conn, $sql)) {
	echo json_encode(array('message' => 'User Record Updated.', 'status' => true), JSON_PRETTY_PRINT);
}else{
	echo json_encode(array('message' => 'User Record Not Updated.', 'status' => false), JSON_PRETTY_PRINT);
}   

?>