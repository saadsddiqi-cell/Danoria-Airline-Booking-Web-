<?php
// db_connect.php
error_reporting(0);

$host     = 'localhost';
$username = 'root';
$password = '';
$dbname   = 'danoria';

try {
    $init = new PDO("mysql:host=$host;charset=utf8mb4", $username, $password);
    $init->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $init->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    unset($init);

    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // ── Users ────────────────────────────────────────────────────────────────
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `users` (
            `id`         INT AUTO_INCREMENT PRIMARY KEY,
            `name`       VARCHAR(255) NOT NULL,
            `email`      VARCHAR(255) NOT NULL UNIQUE,
            `password`   VARCHAR(255) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    // ── Bookings ─────────────────────────────────────────────────────────────
    // One row per booking group (PNR covers all passengers in that booking)
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `bookings` (
            `id`             INT AUTO_INCREMENT PRIMARY KEY,
            `user_id`        INT NOT NULL,
            `pnr`            VARCHAR(12)  NOT NULL UNIQUE,
            `flight_code`    VARCHAR(50)  NOT NULL,
            `route`          VARCHAR(255) NOT NULL,
            `cabin_class`    VARCHAR(20)  NOT NULL DEFAULT 'economy',
            `total_price`    VARCHAR(30)  NOT NULL,
            `booking_date`   VARCHAR(50)  NOT NULL,
            `payment_method` VARCHAR(50)  NOT NULL DEFAULT 'card',
            `status`         VARCHAR(20)  NOT NULL DEFAULT 'confirmed',
            `created_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    // ── Migrate: add status column if not present (for existing installs) ────
    try {
        $pdo->exec("ALTER TABLE `bookings` ADD COLUMN `status` VARCHAR(20) NOT NULL DEFAULT 'confirmed'");
    } catch (PDOException $e) {
        // Column already exists — safe to ignore
    }

    // ── Passengers ───────────────────────────────────────────────────────────
    // One row per passenger, linked to a booking PNR
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `passengers` (
            `id`             INT AUTO_INCREMENT PRIMARY KEY,
            `booking_id`     INT NOT NULL,
            `pnr`            VARCHAR(12)  NOT NULL,
            `passenger_type` VARCHAR(20)  NOT NULL DEFAULT 'adult',
            `passenger_name` VARCHAR(255) NOT NULL,
            `passport_id`    VARCHAR(50)  NOT NULL,
            `cnic_id`        VARCHAR(50)  NOT NULL,
            `seat`           VARCHAR(10)  NOT NULL,
            `photo_base64`   LONGTEXT     NOT NULL,
            `created_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    // ── Flights ───────────────────────────────────────────────────────────────
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `flights` (
            `id`             INT AUTO_INCREMENT PRIMARY KEY,
            `flight_code`    VARCHAR(20)  NOT NULL UNIQUE,
            `from_code`      VARCHAR(10)  NOT NULL,
            `to_code`        VARCHAR(10)  NOT NULL,
            `departure_time` VARCHAR(10)  NOT NULL,
            `duration_hours` VARCHAR(10)  NOT NULL,
            `economy_price`  DECIMAL(8,2) NOT NULL,
            `business_price` DECIMAL(8,2) NOT NULL,
            `first_price`    DECIMAL(8,2) NOT NULL,
            INDEX `idx_route` (`from_code`, `to_code`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    // ── Seed flights once ────────────────────────────────────────────────────
    $seeded = (int) $pdo->query("SELECT COUNT(*) FROM `flights`")->fetchColumn();
    if ($seeded === 0) {
        $ins = $pdo->prepare("
            INSERT INTO `flights`
                (flight_code, from_code, to_code, departure_time, duration_hours,
                 economy_price, business_price, first_price)
            VALUES (?,?,?,?,?,?,?,?)
        ");
        foreach ([
            ['DN101','ISB','DXB','09:30','3h',  499, 1198, 2046],
            ['DN102','ISB','LHR','14:00','8h',  499, 1198, 2046],
            ['DN103','ISB','JFK','22:15','14h', 499, 1198, 2046],
            ['DN201','JFK','LHR','08:30','7h',  299,  718, 1226],
            ['DN202','JFK','IST','12:45','10h', 299,  718, 1226],
            ['DN203','JFK','NRT','21:00','14h', 299,  718, 1226],
            ['DN301','YYZ','FRA','10:00','8h',  350,  840, 1435],
            ['DN302','YYZ','DXB','20:30','13h', 350,  840, 1435],
            ['DN401','BER','DXB','11:15','6h',  420, 1008, 1722],
            ['DN402','BER','CMB','19:45','10h', 420, 1008, 1722],
            ['DN501','IST','ISB','08:30','4h',  450, 1080, 1845],
            ['DN502','IST','MLE','16:00','7h',  450, 1080, 1845],
            ['DN503','IST','JFK','23:30','11h', 450, 1080, 1845],
            ['DN601','BKK','KUL','10:45','2h',  390,  936, 1599],
            ['DN602','BKK','HND','18:30','6h',  390,  936, 1599],
            ['DN701','KUL','SIN','09:00','1h',  380,  912, 1558],
            ['DN702','KUL','CMB','15:45','4h',  380,  912, 1558],
            ['DN801','CMB','MLE','08:30','2h',  370,  888, 1517],
            ['DN802','CMB','ISB','17:00','4h',  370,  888, 1517],
            ['DN901','DXB','JFK','07:30','14h', 460, 1104, 1886],
            ['DN902','DXB','ISB','13:45','3h',  460, 1104, 1886],
            ['DN903','DXB','MLE','22:00','4h',  460, 1104, 1886],
            ['DN111','DPS','SIN','09:30','3h',  410,  984, 1681],
            ['DN112','DPS','HND','21:00','7h',  410,  984, 1681],
            ['DN121','TBS','IST','10:15','2h',  480, 1152, 1968],
            ['DN122','TBS','BER','17:30','4h',  480, 1152, 1968],
            ['DN131','KTM','DEL','08:00','1h',  440, 1056, 1804],
            ['DN132','KTM','DXB','16:30','5h',  440, 1056, 1804],
            ['DN141','MLE','CMB','09:30','2h',  590, 1416, 2419],
            ['DN142','MLE','DXB','18:00','4h',  590, 1416, 2419],
            ['DN151','HND','JFK','11:30','13h', 550, 1320, 2255],
            ['DN152','HND','BKK','19:00','6h',  550, 1320, 2255],
            ['DN161','CAI','IST','10:30','3h',  470, 1128, 1927],
            ['DN162','CAI','DXB','22:00','4h',  470, 1128, 1927],
        ] as $r) {
            $ins->execute($r);
        }
    }

} catch (PDOException $e) {
    $db_error = $e->getMessage();
}