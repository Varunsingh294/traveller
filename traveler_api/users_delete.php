<?php
// users_delete.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
// header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,
// 	Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
// {
//         "id": "1",
// }
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'];

include "config.php";

$sql = "DELETE FROM users WHERE user_id = {$user_id}";

if (mysqli_query($conn, $sql)) {

	echo json_encode(array('message' => 'User Record Deleted.', 'status' => true));

}else{

	echo json_encode(array('message' => 'User Record Not Deleted.', 'status' => false));

}   

?>