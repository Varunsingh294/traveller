<?php
// user_login_api_old.php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"), true);

if(!$data) return;

$email = $data['email'];
$password = $data['password'];

include "config.php";

$sql = "SELECT * FROM users WHERE email = '{$email}' AND password = '{$password}'";

$result = mysqli_query($conn, $sql);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        // User found, login successful
        echo json_encode(array('message' => 'Login successful', 'success' => true));
    } else {
        // User not found or invalid credentials
        echo json_encode(array('message' => 'Invalid email or password', 'success' => false));
    }
} else {
    // Database query error
    echo json_encode(array('message' => 'Error in database query', 'success' => false));
}
?>