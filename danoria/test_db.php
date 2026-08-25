<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = 'localhost'; $username = 'root'; $password = ''; $dbname = 'danoria';
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables: " . implode(', ', $tables) . "\n\n";

    if (in_array('flights', $tables)) {
        $count = $pdo->query("SELECT COUNT(*) FROM flights")->fetchColumn();
        echo "Flights rows: $count\n";
        foreach ($pdo->query("SELECT flight_code, from_code, to_code FROM flights LIMIT 5")->fetchAll() as $r) {
            echo "  {$r['flight_code']}  {$r['from_code']} → {$r['to_code']}\n";
        }
        $rows = $pdo->prepare("SELECT flight_code FROM flights WHERE from_code=? AND to_code=?");
        $rows->execute(['ISB','DXB']);
        echo "\nISB→DXB test: " . count($rows->fetchAll()) . " row(s)\n";
    } else {
        echo "ERROR: flights table missing\n";
    }
} catch (PDOException $e) {
    echo "DB ERROR: " . $e->getMessage() . "\n";
}