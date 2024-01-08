<?php
// admin_registration_api.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,
	// Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$data = json_decode(file_get_contents("php://input"), true);

$fname = $data['fname'];
$lname = $data['lname'];
$email = $data['email'];
$phone = $data['phone'];
$password = $data['password'];
$admin_type = $data['admin_type'];
$admin_status = $data['admin_status'];
$created_by = $data['created_by'];

include "config.php";

$sql = "INSERT INTO admin(fname, lname, email, phone, password, admin_type, admin_status, created_by) VALUES('{$fname}', '{$lname}', '{$email}', '{$phone}', '{$password}', '{$admin_type}', '{$admin_status}', '{$created_by}')";

if (mysqli_query($conn, $sql)) {
	echo json_encode(array('message' => 'Admin Record Inserted.', 'status' => true));
}else{
	echo json_encode(array('message' => 'Admin Record Not Inserted.', 'status' => false));
}   

?>