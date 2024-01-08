<?php
// user_registration_api.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


$data = json_decode(file_get_contents("php://input"), true);

if(!$data) return;

$adminid = $data['adminid'];
$fname = $data['fname'];
$lname = $data['lname'];
$email = $data['email'];
$phone = $data['phone'];
$password = $data['password'];
$user_type = $data['user_type'];
$user_status = $data['user_status'];
$user_created = $data['user_created'];


include "config.php";

$sql = "INSERT INTO users(adminid, fname, lname, email, phone, password, user_type, user_status, user_created) VALUES('{$adminid}', '{$fname}', '{$lname}', '{$email}', '{$phone}', '{$password}', '{$user_type}', '{$user_status}', '{$user_created}')";


if (mysqli_query($conn, $sql)) {
	echo json_encode(array('message' => 'User Record Inserted.', 'status' => true));
}else{
	echo json_encode(array('message' => 'User Record Not Inserted.', 'status' => false));
}   

?>