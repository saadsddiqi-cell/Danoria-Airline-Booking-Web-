<?php
// api_bookings.php — Multi-passenger booking management
session_start();
header('Content-Type: application/json');
error_reporting(0);

require_once 'db_connect.php';

if (isset($db_error)) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $db_error]);
    exit;
}

$input  = json_decode(file_get_contents('php://input'), true);
$action = isset($_GET['action']) ? $_GET['action'] : (isset($input['action']) ? $input['action'] : '');

switch ($action) {

    // ── Save a full multi-passenger booking ──────────────────────────────────
    case 'save':
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON payload.']);
        exit;
    }

    // Try session first, then fall back to email lookup
    $userId = $_SESSION['user_id'] ?? $_SESSION['user']['id'] ?? null;

    if (!$userId && !empty($data['userEmail'])) {
        $uStmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $uStmt->execute([$data['userEmail']]);
        $uRow = $uStmt->fetch();
        if ($uRow) $userId = $uRow['id'];
    }

    if (!$userId) {
        echo json_encode(['status' => 'error', 'message' => 'Not authenticated.']);
        exit;
    }

    $pnr           = $data['pnr']           ?? '';
    $flightCode    = $data['flightCode']    ?? '';
    $route         = $data['route']         ?? '';
    $cabinClass    = $data['cabinClass']    ?? 'economy';
    $totalPrice    = $data['totalPrice']    ?? '$0';
    $bookingDate   = $data['bookingDate']   ?? date('Y-m-d');
    $paymentMethod = $data['paymentMethod'] ?? 'card';
    $passengers    = $data['passengers']    ?? [];

    // Legacy single-passenger support (from app.js modal)
    if (empty($passengers) && isset($data['passengerName'])) {
        $passengers = [[
            'type'     => 'adult',
            'name'     => $data['passengerName'] ?? '',
            'passport' => $data['passportId']    ?? '',
            'cnic'     => $data['cnicId']        ?? '',
            'seat'     => $data['seat']          ?? '',
            'photo'    => $data['photoBase64']   ?? '',
        ]];
        $totalPrice    = $data['price']       ?? '$0';
        $bookingDate   = $data['bookingDate'] ?? date('Y-m-d');
        $paymentMethod = 'card';
        $cabinClass    = 'economy';
    }

    if (!$pnr || !$flightCode || empty($passengers)) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required booking fields.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO bookings 
                (user_id, pnr, flight_code, route, cabin_class, total_price, booking_date, payment_method)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$userId, $pnr, $flightCode, $route, $cabinClass, $totalPrice, $bookingDate, $paymentMethod]);
        $bookingId = $pdo->lastInsertId();

        $pstmt = $pdo->prepare("
            INSERT INTO passengers 
                (booking_id, pnr, passenger_type, passenger_name, passport_id, cnic_id, seat, photo_base64)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        foreach ($passengers as $p) {
            $pstmt->execute([
                $bookingId,
                $pnr,
                $p['type']     ?? 'adult',
                $p['name']     ?? '',
                $p['passport'] ?? '',
                $p['cnic']     ?? '',
                $p['seat']     ?? '',
                $p['photo']    ?? '',
            ]);
        }

        echo json_encode(['status' => 'success', 'pnr' => $pnr]);

    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'DB error: ' . $e->getMessage()]);
    }
    break;

    // ── List all bookings for logged-in user ─────────────────────────────────
    case 'list':
        if (!isset($_SESSION['user'])) {
            echo json_encode(['status' => 'error', 'message' => 'Please log in to view bookings.']);
            exit;
        }

        $userId = $_SESSION['user']['id'];

        try {
            // Fetch all bookings for user
            $stmtB = $pdo->prepare("SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC");
            $stmtB->execute([$userId]);
            $bookings = $stmtB->fetchAll();

            $result = [];
            foreach ($bookings as $b) {
                // Fetch passengers for this booking
                $stmtP = $pdo->prepare("SELECT * FROM passengers WHERE booking_id = ?");
                $stmtP->execute([$b['id']]);
                $passengers = $stmtP->fetchAll();

                $result[] = [
                    'pnr'           => $b['pnr'],
                    'flightCode'    => $b['flight_code'],
                    'route'         => $b['route'],
                    'cabinClass'    => $b['cabin_class'],
                    'totalPrice'    => $b['total_price'],
                    'date'          => $b['booking_date'],
                    'paymentMethod' => $b['payment_method'],
                    'status'        => $b['status'] ?? 'confirmed',
                    'passengers'    => array_map(function($p) {
                        return [
                            'type'     => $p['passenger_type'],
                            'name'     => $p['passenger_name'],
                            'passport' => $p['passport_id'],
                            'cnic'     => $p['cnic_id'],
                            'seat'     => $p['seat'],
                            'photo'    => $p['photo_base64'],
                        ];
                    }, $passengers),
                ];
            }

            echo json_encode(['status' => 'success', 'bookings' => $result]);

        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to fetch bookings: ' . $e->getMessage()]);
        }
        break;

    // ── Get booked seats for a flight ────────────────────────────────────────
    case 'booked_seats':
        $flightCode = isset($_GET['flightCode']) ? trim($_GET['flightCode']) : '';

        if (empty($flightCode)) {
            echo json_encode(['status' => 'success', 'seats' => []]);
            exit;
        }

        try {
            $stmt = $pdo->prepare("
                SELECT p.seat FROM passengers p
                JOIN bookings b ON b.id = p.booking_id
                WHERE b.flight_code = ?
            ");
            $stmt->execute([$flightCode]);
            $seats = $stmt->fetchAll(PDO::FETCH_COLUMN);

            echo json_encode(['status' => 'success', 'seats' => $seats]);

        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Failed to fetch seats: ' . $e->getMessage()]);
        }
        break;


    // ── Cancel a booking ─────────────────────────────────────────────────────
    case 'cancel':
        if (!isset($_SESSION['user'])) {
            echo json_encode(['status' => 'error', 'message' => 'Please log in to cancel a booking.']);
            exit;
        }

        $pnr    = trim($input['pnr'] ?? '');
        $userId = $_SESSION['user']['id'];

        if (empty($pnr)) {
            echo json_encode(['status' => 'error', 'message' => 'PNR is required.']);
            exit;
        }

        try {
            // Verify the booking belongs to the logged-in user and is not already cancelled
            $check = $pdo->prepare("SELECT id, status FROM bookings WHERE pnr = ? AND user_id = ?");
            $check->execute([$pnr, $userId]);
            $booking = $check->fetch();

            if (!$booking) {
                echo json_encode(['status' => 'error', 'message' => 'Booking not found or access denied.']);
                exit;
            }

            if ($booking['status'] === 'cancelled') {
                echo json_encode(['status' => 'error', 'message' => 'This booking is already cancelled.']);
                exit;
            }

            $upd = $pdo->prepare("UPDATE bookings SET status = 'cancelled' WHERE pnr = ? AND user_id = ?");
            $upd->execute([$pnr, $userId]);

            echo json_encode(['status' => 'success', 'message' => 'Booking cancelled successfully.']);

        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'DB error: ' . $e->getMessage()]);
        }
        break;

        default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
        break;
}