<?php
// users_single_data.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// {
//         "id": "1",
// }
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];

include "config.php";

$sql = "SELECT * FROM users WHERE user_id = {$user_id}";
$result = mysqli_query($conn, $sql) or die("Query Unsuccessful.");

if (mysqli_num_rows($result) > 0) {
	$output = mysqli_fetch_all($result, MYSQLI_ASSOC);
	echo json_encode($output, JSON_PRETTY_PRINT);
}else{
	echo json_encode(array('message' => 'No Record Found.', 'status' => false));
}   

?>