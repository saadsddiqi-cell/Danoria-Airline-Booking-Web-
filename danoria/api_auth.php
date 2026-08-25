<?php
// api_auth.php — Secure User Authentication AJAX Controller
session_start();
header('Content-Type: application/json');


require_once 'db_connect.php';

// Retrieve request body (for json fetch posts)
$input = json_decode(file_get_contents('php://input'), true);
$action = isset($_GET['action']) ? $_GET['action'] : (isset($input['action']) ? $input['action'] : '');

switch ($action) {
    case 'register':
        $name = trim(isset($input['name']) ? $input['name'] : '');
        $email = trim(isset($input['email']) ? $input['email'] : '');
        $password = isset($input['password']) ? $input['password'] : '';

        if (empty($name) || empty($email) || empty($password)) {
            echo json_encode(['status' => 'error', 'message' => 'Please fill in all registration fields.']);
            exit;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
            exit;
        }

        try {
            // Check if email already registered
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                echo json_encode(['status' => 'error', 'message' => 'Email address is already registered.']);
                exit;
            }

            // Secure password hash
            $hash = password_hash($password, PASSWORD_DEFAULT);

            // Insert new user
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$name, $email, $hash]);
            $userId = $pdo->lastInsertId();

            // Set active user session
            $_SESSION['user'] = [
                'id' => $userId,
                'name' => $name,
                'email' => $email
            ];
            $_SESSION['user_id'] = $userId;      // ← ADD THIS
            $_SESSION['user_name'] = $name;      // ← ADD THIS
            $_SESSION['user_email'] = $email;    // ← ADD THIS

            echo json_encode([
                'status' => 'success',
                'message' => 'Account created successfully!',
                'user' => $_SESSION['user']
            ]);

        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Registration error: ' . $e->getMessage()]);
        }
        break;

    case 'login':
        $email = trim(isset($input['email']) ? $input['email'] : '');
        $password = isset($input['password']) ? $input['password'] : '';

        if (empty($email) || empty($password)) {
            echo json_encode(['status' => 'error', 'message' => 'Please fill in all login fields.']);
            exit;
        }

        try {
            // Check if email exists
            $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password'])) {
                echo json_encode(['status' => 'error', 'message' => 'Invalid email or password combination.']);
                exit;
            }

            // Set active user session
            $_SESSION['user'] = [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ];
            $_SESSION['user_id'] = $user['id'];       // ← ADD THIS
            $_SESSION['user_name'] = $user['name'];   // ← ADD THIS
            $_SESSION['user_email'] = $user['email']; // ← ADD THIS

            echo json_encode([
                'status' => 'success',
                'message' => 'Logged in successfully!',
                'user' => $_SESSION['user']
            ]);

        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Login error: ' . $e->getMessage()]);
        }
        break;

    case 'session':
        if (isset($_SESSION['user'])) {
            echo json_encode([
                'status' => 'success',
                'loggedIn' => true,
                'user' => $_SESSION['user']
            ]);
        } else {
            echo json_encode([
                'status' => 'success',
                'loggedIn' => false,
                'user' => null
            ]);
        }
        break;

    case 'logout':
        session_unset();
        session_destroy();
        echo json_encode([
            'status' => 'success',
            'message' => 'Logged out successfully!'
        ]);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid auth controller action.']);
        break;
}
?>
