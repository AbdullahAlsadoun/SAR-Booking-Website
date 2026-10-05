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

    $email    = trim($_POST['email']);
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        echo "<script>
                alert('Please fill in all fields.');
                window.history.back();
              </script>";
        exit();
    }

    
    $sql = "SELECT * FROM users WHERE email = ?";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        
        $result = $stmt->get_result();
        
        
        if ($result && $result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            
            if (password_verify($password, $user['password'])) {
                
                echo "<script>
                        alert('Welcome back, " . htmlspecialchars($user['full_name']) . "! Login Successful.');
                        window.location.href = 'home.html';
                      </script>";
                exit(); 
            } else {
                
                echo "<script>
                        alert('Incorrect password. Please try again.');
                        window.history.back();
                      </script>";
                exit();
            }
        } else {
            
            echo "<script>
                    alert('You are not registered yet! Please sign up first.');
                    window.location.href = 'create_account.html';
                  </script>";
            exit();
        }
        
        $stmt->close();
    } else {
        echo "Statement preparation error: " . $conn->error;
    }
    
    $conn->close();
}
?>