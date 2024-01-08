<?php
// user_login_api.php

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
        $token = generateToken(); // Call a function to generate a token
        session_start(); // Start the session
        $_SESSION['user_email'] = $email; // Store user email in the session

        // Send the token and session data as part of the response
        echo json_encode(array('message' => 'Login successful', 'success' => true, 'token' => $token, 'sessionData' => $_SESSION));
    } else {
        // User not found or invalid credentials
        echo json_encode(array('message' => 'Invalid email or password', 'success' => false));
    }
} else {
    // Database query error
    echo json_encode(array('message' => 'Error in database query', 'success' => false));
}

// Function to generate a simple token (you might want to use a more secure method in production)
function generateToken() {
    return bin2hex(random_bytes(16)); // Generates a 32-character hexadecimal token
}
?>
