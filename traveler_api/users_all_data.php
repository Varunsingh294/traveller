<?php
// users_all_data.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "config.php";

$sql = "SELECT * FROM users";
$result = mysqli_query($conn, $sql) or die("Query Unsuccessful.");

if (mysqli_num_rows($result) > 0) {
	$output = mysqli_fetch_all($result, MYSQLI_ASSOC);
	echo json_encode($output, JSON_PRETTY_PRINT);
}else{
	echo json_encode(array('message' => 'No Record Found.', 'status' => false));
}

?>