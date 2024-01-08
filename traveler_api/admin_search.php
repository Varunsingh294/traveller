<?php
// admin_search.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// {
//         "id": "1",
// }
// $data = json_decode(file_get_contents("php://input"), true);

// $search_value = $data['search'];

$email = isset($_GET['email']) ? $_GET['email'] : die();

include "config.php";

$sql = "SELECT * FROM admin WHERE email LIKE '%{$email}%'";
$result = mysqli_query($conn, $sql) or die("Query Unsuccessful.");

if (mysqli_num_rows($result) > 0) {
	$output = mysqli_fetch_all($result, MYSQLI_ASSOC);
	echo json_encode($output, JSON_PRETTY_PRINT);
}else{
	echo json_encode(array('message' => 'No Search Found.', 'status' => false));
}   

?>