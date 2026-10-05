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
    $user_name = trim($_POST['user_name']);
    $email     = trim($_POST['email']);
    $message   = trim($_POST['message']);

    if (empty($user_name) || empty($email) || empty($message)) {
        echo "<script>
                alert('All fields are mandatory!');
                window.history.back();
              </script>";
        exit();
    }

    $sql = "INSERT INTO feedback (user_name, email, message) VALUES (?, ?, ?)";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("sss", $user_name, $email, $message);
        
        if ($stmt->execute()) {
            echo "<script>
                    alert('Thank you! Your feedback has been saved.');
                    window.location.href = 'view_feedback.php';
                  </script>";
        } else {
            echo "Error saving data: " . $stmt->error;
        }
        $stmt->close();
    }
    $conn->close();
}
?>