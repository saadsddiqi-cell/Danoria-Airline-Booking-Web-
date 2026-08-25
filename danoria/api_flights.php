<?php
// api_flights.php — Flight price & route lookup
header('Content-Type: application/json');

try {
    require_once 'db_connect.php';
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database unavailable: ' . $e->getMessage()]);
    exit;
}

$action = isset($_GET['action']) ? trim($_GET['action']) : '';

switch ($action) {

    case 'get_price':
        $from  = isset($_GET['from'])  ? strtoupper(trim($_GET['from']))  : '';
        $to    = isset($_GET['to'])    ? strtoupper(trim($_GET['to']))    : '';
        $class = isset($_GET['class']) ? trim($_GET['class'])             : 'economy';

        if ($from === '' || $to === '') {
            echo json_encode(['status' => 'error', 'message' => 'Missing origin or destination code.']);
            exit;
        }

        // Map cabin class string to the correct price column
        $priceCol = 'economy_price';
        if ($class === 'business') $priceCol = 'business_price';
        if ($class === 'first')    $priceCol = 'first_price';

        try {
            $stmt = $pdo->prepare("
                SELECT flight_code, departure_time, duration_hours,
                       economy_price, business_price, first_price
                FROM   flights
                WHERE  from_code = ? AND to_code = ?
                LIMIT  3
            ");
            $stmt->execute([$from, $to]);
            $rows = $stmt->fetchAll();

            if (!$rows) {
                echo json_encode([
                    'status'  => 'error',
                    'message' => "No flights found for $from → $to. Try selecting different countries."
                ]);
                exit;
            }

            $flights = array_map(function ($r) use ($priceCol) {
                return [
                    'flight_code'    => $r['flight_code'],
                    'departure_time' => $r['departure_time'],
                    'duration'       => $r['duration_hours'],
                    'price'          => '$' . number_format($r[$priceCol], 2),
                    'economy_price'  => '$' . number_format($r['economy_price'],  2),
                    'business_price' => '$' . number_format($r['business_price'], 2),
                    'first_price'    => '$' . number_format($r['first_price'],    2),
                ];
            }, $rows);

            echo json_encode(['status' => 'success', 'flights' => $flights]);

        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
        break;
}