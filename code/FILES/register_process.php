<?php

$host     = "localhost";
$db_user  = "root";     
$db_pass  = "";         
$db_name  = "sar_db";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die("Database Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name        = trim($_POST['name']);
    $id          = trim($_POST['id']);
    $dob         = trim($_POST['dob']);
    $nationality = trim($_POST['nationality']);
    $number      = trim($_POST['mobile']);
    $email       = trim($_POST['email']);
    $password    = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if (empty($name) || empty($id) || empty($dob) || empty($nationality) || empty($number) || empty($email) || empty($password)) {
        echo "<script>
                alert('Submission Error: All mandatory fields must be filled out before submitting!');
                window.history.back();
              </script>";
        exit();
    }

    if ($password !== $confirm_password) {
        echo "<script>
                alert('Submission Error: Passwords do not match!');
                window.history.back();
              </script>";
        exit();
    }

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
     
    
    $sql = "INSERT INTO users (full_name, id, dob, nationality, number, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    
    if ($stmt === false) {
        die("Database Structure Error: " . $conn->error . " <br><br><b>Hint:</b> Check if your column names inside the 'users' table exactly match full_name, id, dob, nationality, number, email, password.");
    }
    
    
    $stmt->bind_param("sssssss", $name, $id, $dob, $nationality, $number, $email, $hashed_password);
    
    if ($stmt->execute()) {
        echo "<script>
                alert('Registration Successful! Your profile has been securely saved.');
                window.location.href = 'sign.html';
              </script>";
    } else {
        if ($conn->errno == 1062) {
            echo "<script>
                    alert('Submission Error: Email address or National ID is already registered!');
                    window.history.back();
                  </script>";
        } else {
            echo "Execution Failure: " . $stmt->error;
        }
    }
    $stmt->close();
    
    $conn->close();
}
?>