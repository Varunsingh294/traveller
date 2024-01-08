<?php
// admin_delete.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
// header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,
// 	Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
// {
//         "id": "1",
// }
$data = json_decode(file_get_contents("php://input"), true);

$admin_id = $data['admin_id'];

include "config.php";

$sql = "DELETE FROM admin WHERE admin_id = {$admin_id}";

if (mysqli_query($conn, $sql)) {

	echo json_encode(array('message' => 'Admin Record Deleted.', 'status' => true));

}else{

	echo json_encode(array('message' => 'Admin Record Not Deleted.', 'status' => false));

}   

?>