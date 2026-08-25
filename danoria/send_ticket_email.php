<?php
// send_ticket_email.php — Send HTML e-ticket email via Gmail SMTP
session_start();
header('Content-Type: application/json');
error_reporting(0);

require_once __DIR__ . '/phpmailer/src/Exception.php';
require_once __DIR__ . '/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$input = json_decode(file_get_contents('php://input'), true);

// ── Required fields ──────────────────────────────────────────────────────────
$toEmail       = trim($input['toEmail']       ?? '');
$passengerName = trim($input['passengerName'] ?? '');
$pnr           = trim($input['pnr']           ?? '');
$flightCode    = trim($input['flightCode']    ?? '');
$route         = trim($input['route']         ?? '');
$seat          = trim($input['seat']          ?? '');
$fare          = trim($input['fare']          ?? '');
$bookingDate   = trim($input['bookingDate']   ?? '');
$cabinClass    = trim($input['cabinClass']    ?? 'Economy');
$duration      = trim($input['duration']      ?? '');
$departureTime = trim($input['departureTime'] ?? '');
$passengers    = $input['passengers']         ?? [];
$paymentMethod = trim($input['paymentMethod'] ?? 'Card');
$emailType     = trim($input['type']          ?? 'confirmation');

if (!$toEmail || !$pnr) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields.']);
    exit;
}

// ── Cancellation email ───────────────────────────────────────────────────────
if ($emailType === 'cancellation') {
    $htmlBody = "
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Danoria Airways – Booking Cancelled</title>
</head>
<body style='margin:0;padding:0;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;'>
  <table width='100%' cellpadding='0' cellspacing='0' style='background:#f3f4f6;padding:32px 0;'>
    <tr><td align='center'>
      <table width='600' cellpadding='0' cellspacing='0' style='max-width:600px;width:100%;'>

        <!-- Header -->
        <tr>
          <td style='background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;'>
            <div style='font-size:28px;font-weight:800;color:#ffffff;letter-spacing:2px;'>✈ DANORIA</div>
            <div style='font-size:13px;color:#94a3b8;margin-top:4px;letter-spacing:4px;text-transform:uppercase;'>Airways</div>
            <div style='margin-top:20px;font-size:13px;color:#64748b;'>Booking Cancellation</div>
          </td>
        </tr>

        <!-- Red cancellation bar -->
        <tr>
          <td style='background:#ef4444;padding:14px 40px;text-align:center;'>
            <span style='color:#ffffff;font-size:14px;font-weight:700;letter-spacing:1px;'>✕ &nbsp; YOUR BOOKING HAS BEEN CANCELLED</span>
          </td>
        </tr>

        <!-- PNR -->
        <tr>
          <td style='background:#ffffff;padding:32px 40px 24px;text-align:center;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='font-size:12px;color:#9ca3af;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;'>Cancelled PNR</div>
            <div style='font-size:36px;font-weight:800;color:#ef4444;letter-spacing:6px;font-family:monospace;text-decoration:line-through;opacity:.7;'>" . htmlspecialchars($pnr) . "</div>
            <div style='margin-top:12px;font-size:13px;color:#6b7280;'>This booking has been successfully cancelled</div>
          </td>
        </tr>

        <!-- Tear line -->
        <tr>
          <td style='background:#ffffff;padding:0 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='border-top:2px dashed #e5e7eb;'></div>
          </td>
        </tr>

        <!-- Flight details -->
        <tr>
          <td style='background:#ffffff;padding:28px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='font-size:12px;color:#9ca3af;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;'>Cancelled Flight Details</div>
            <table width='100%' cellpadding='0' cellspacing='0' style='opacity:.7;'>
              <tr>
                <td style='width:50%;padding-bottom:16px;'>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Passenger</div>
                  <div style='font-size:15px;font-weight:600;color:#374151;'>" . htmlspecialchars($passengerName ?: '—') . "</div>
                </td>
                <td style='width:50%;padding-bottom:16px;'>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Flight</div>
                  <div style='font-size:15px;font-weight:600;color:#374151;'>" . htmlspecialchars($flightCode) . "</div>
                </td>
              </tr>
              <tr>
                <td style='padding-bottom:16px;'>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Route</div>
                  <div style='font-size:15px;font-weight:600;color:#374151;'>" . htmlspecialchars($route) . "</div>
                </td>
                <td style='padding-bottom:16px;'>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Date</div>
                  <div style='font-size:15px;font-weight:600;color:#374151;'>" . htmlspecialchars($bookingDate) . "</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Fare Paid</div>
                  <div style='font-size:22px;font-weight:800;color:#ef4444;'>" . htmlspecialchars($fare) . "</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Refund notice -->
        <tr>
          <td style='background:#fef2f2;padding:18px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='font-size:13px;color:#991b1b;line-height:1.7;'>
              <strong>Refund Information:</strong><br>
              If you paid via card, your refund will be processed within <strong>7–10 business days</strong> depending on your bank. 
              For any queries, please contact us at 
              <a href='mailto:danoriatravels@gmail.com' style='color:#ef4444;'>danoriatravels@gmail.com</a>.
            </div>
          </td>
        </tr>

        <!-- Book again CTA -->
        <tr>
          <td style='background:#ffffff;padding:28px 40px;text-align:center;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='font-size:14px;color:#6b7280;margin-bottom:16px;'>We hope to see you fly with us again soon!</div>
            <a href='http://localhost/danoria/index.html' style='display:inline-block;background:linear-gradient(135deg,#1e3a5f,#0f172a);color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px;'>✈ Book a New Flight</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style='background:#0f172a;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;'>
            <div style='font-size:18px;font-weight:800;color:#ffffff;letter-spacing:2px;margin-bottom:6px;'>✈ DANORIA AIRWAYS</div>
            <div style='font-size:12px;color:#64748b;margin-bottom:12px;'>Fly Smarter. Fly Better.</div>
            <div style='font-size:11px;color:#475569;'>This is an automated cancellation email. Please do not reply.</div>
            <div style='font-size:11px;color:#475569;margin-top:4px;'>© " . date('Y') . " Danoria Airways. All rights reserved.</div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
";

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'danoriatravels@gmail.com';
        $mail->Password   = 'rdltwvpsghpuiork';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('danoriatravels@gmail.com', 'Danoria Airways');
        $mail->addAddress($toEmail, $passengerName ?: 'Valued Passenger');
        $mail->addReplyTo('danoriatravels@gmail.com', 'Danoria Airways');

        $mail->isHTML(true);
        $mail->Subject = "✕ Booking Cancelled – PNR: $pnr | Danoria Airways";
        $mail->Body    = $htmlBody;
        $mail->AltBody = "Your booking $pnr has been cancelled.\n\nFlight: $flightCode\nRoute: $route\nDate: $bookingDate\nFare: $fare\n\nRefund will be processed in 7-10 business days.\n\nDanoria Airways";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Cancellation email sent to ' . $toEmail]);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Email failed: ' . $mail->ErrorInfo]);
    }
    exit;
}

// ── Build passenger rows ─────────────────────────────────────────────────────
$passengerRows = '';
if (!empty($passengers)) {
    foreach ($passengers as $i => $p) {
        $num  = $i + 1;
        $name = htmlspecialchars($p['name'] ?? '—');
        $seat = htmlspecialchars($p['seat'] ?? '—');
        $type = ucfirst($p['type'] ?? 'adult');
        $passengerRows .= "
        <tr>
            <td style='padding:10px 16px;border-bottom:1px solid #f0f0f0;color:#374151;font-weight:600;'>Passenger $num ($type)</td>
            <td style='padding:10px 16px;border-bottom:1px solid #f0f0f0;color:#374151;'>$name</td>
            <td style='padding:10px 16px;border-bottom:1px solid #f0f0f0;color:#10b981;font-weight:700;font-size:16px;'>$seat</td>
        </tr>";
    }
} else {
    $name = htmlspecialchars($passengerName ?: '—');
    $seatVal = htmlspecialchars($seat ?: '—');
    $passengerRows = "
        <tr>
            <td style='padding:10px 16px;border-bottom:1px solid #f0f0f0;color:#374151;font-weight:600;'>Passenger 1 (Adult)</td>
            <td style='padding:10px 16px;border-bottom:1px solid #f0f0f0;color:#374151;'>$name</td>
            <td style='padding:10px 16px;border-bottom:1px solid #f0f0f0;color:#10b981;font-weight:700;font-size:16px;'>$seatVal</td>
        </tr>";
}

// ── Duration display ─────────────────────────────────────────────────────────
$durationDisplay = $duration ? $duration . ' hrs' : '—';

// ── HTML Email Template ──────────────────────────────────────────────────────
$htmlBody = "
<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<title>Danoria Airways – E-Ticket</title>
</head>
<body style='margin:0;padding:0;background:#f3f4f6;font-family:Segoe UI,Arial,sans-serif;'>

  <!-- Wrapper -->
  <table width='100%' cellpadding='0' cellspacing='0' style='background:#f3f4f6;padding:32px 0;'>
    <tr><td align='center'>
      <table width='600' cellpadding='0' cellspacing='0' style='max-width:600px;width:100%;'>

        <!-- Header -->
        <tr>
          <td style='background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;'>
            <div style='font-size:28px;font-weight:800;color:#ffffff;letter-spacing:2px;'>✈ DANORIA</div>
            <div style='font-size:13px;color:#94a3b8;margin-top:4px;letter-spacing:4px;text-transform:uppercase;'>Airways</div>
            <div style='margin-top:20px;font-size:13px;color:#64748b;'>Booking Confirmation</div>
          </td>
        </tr>

        <!-- Green success bar -->
        <tr>
          <td style='background:#10b981;padding:14px 40px;text-align:center;'>
            <span style='color:#ffffff;font-size:14px;font-weight:700;letter-spacing:1px;'>✓ &nbsp; YOUR BOOKING IS CONFIRMED</span>
          </td>
        </tr>

        <!-- PNR Hero -->
        <tr>
          <td style='background:#ffffff;padding:32px 40px 24px;text-align:center;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='font-size:12px;color:#9ca3af;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;'>PNR Reference</div>
            <div style='font-size:36px;font-weight:800;color:#0f172a;letter-spacing:6px;font-family:monospace;'>" . htmlspecialchars($pnr) . "</div>
            <div style='margin-top:12px;font-size:13px;color:#6b7280;'>Please present this code at the airport check-in counter</div>
          </td>
        </tr>

        <!-- Dashed divider (ticket tear line) -->
        <tr>
          <td style='background:#ffffff;padding:0 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='border-top:2px dashed #e5e7eb;position:relative;'>
              <span style='position:absolute;left:-20px;top:-10px;width:20px;height:20px;background:#f3f4f6;border-radius:50%;display:inline-block;'></span>
              <span style='position:absolute;right:-20px;top:-10px;width:20px;height:20px;background:#f3f4f6;border-radius:50%;display:inline-block;'></span>
            </div>
          </td>
        </tr>

        <!-- Route banner -->
        <tr>
          <td style='background:#ffffff;padding:28px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <table width='100%' cellpadding='0' cellspacing='0'>
              <tr>
                <td style='text-align:center;'>
                  <div style='font-size:13px;color:#9ca3af;text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;'>Route</div>
                  <div style='font-size:18px;font-weight:700;color:#0f172a;'>" . htmlspecialchars($route) . "</div>
                </td>
              </tr>
              <tr>
                <td style='text-align:center;padding-top:18px;'>
                  <table width='100%' cellpadding='0' cellspacing='0'>
                    <tr>
                      <td style='text-align:center;width:33%;'>
                        <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;'>Flight</div>
                        <div style='font-size:20px;font-weight:800;color:#1e3a5f;margin-top:4px;'>" . htmlspecialchars($flightCode) . "</div>
                      </td>
                      <td style='text-align:center;width:33%;'>
                        <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;'>Duration</div>
                        <div style='font-size:20px;font-weight:800;color:#1e3a5f;margin-top:4px;'>" . $durationDisplay . "</div>
                      </td>
                      <td style='text-align:center;width:33%;'>
                        <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;'>Departure</div>
                        <div style='font-size:20px;font-weight:800;color:#1e3a5f;margin-top:4px;'>" . htmlspecialchars($departureTime ?: '—') . "</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Flight details grid -->
        <tr>
          <td style='background:#f8fafc;padding:24px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <table width='100%' cellpadding='0' cellspacing='0'>
              <tr>
                <td style='width:50%;padding-bottom:16px;'>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Date</div>
                  <div style='font-size:15px;font-weight:600;color:#374151;'>" . htmlspecialchars($bookingDate) . "</div>
                </td>
                <td style='width:50%;padding-bottom:16px;'>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Cabin Class</div>
                  <div style='font-size:15px;font-weight:600;color:#374151;'>" . htmlspecialchars(ucfirst($cabinClass)) . "</div>
                </td>
              </tr>
              <tr>
                <td>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Total Fare</div>
                  <div style='font-size:22px;font-weight:800;color:#10b981;'>" . htmlspecialchars($fare) . "</div>
                </td>
                <td>
                  <div style='font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;'>Payment</div>
                  <div style='font-size:15px;font-weight:600;color:#374151;'>" . htmlspecialchars(ucfirst($paymentMethod)) . "</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Passengers table -->
        <tr>
          <td style='background:#ffffff;padding:24px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='font-size:12px;color:#9ca3af;letter-spacing:3px;text-transform:uppercase;margin-bottom:14px;'>Passengers & Seats</div>
            <table width='100%' cellpadding='0' cellspacing='0' style='border:1px solid #f0f0f0;border-radius:8px;overflow:hidden;'>
              <tr style='background:#f8fafc;'>
                <th style='padding:10px 16px;text-align:left;font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;font-weight:600;'>#</th>
                <th style='padding:10px 16px;text-align:left;font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;font-weight:600;'>Name</th>
                <th style='padding:10px 16px;text-align:left;font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;font-weight:600;'>Seat</th>
              </tr>
              $passengerRows
            </table>
          </td>
        </tr>

        <!-- Important notice -->
        <tr>
          <td style='background:#fffbeb;padding:18px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;'>
            <div style='font-size:12px;color:#92400e;line-height:1.6;'>
              ⚠️ &nbsp;<strong>Important:</strong> Please arrive at the airport at least <strong>2 hours</strong> before departure. 
              Carry a valid passport and a printed or digital copy of this e-ticket. 
              Web check-in opens 24 hours before departure.
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style='background:#0f172a;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;'>
            <div style='font-size:18px;font-weight:800;color:#ffffff;letter-spacing:2px;margin-bottom:6px;'>✈ DANORIA AIRWAYS</div>
            <div style='font-size:12px;color:#64748b;margin-bottom:12px;'>Fly Smarter. Fly Better.</div>
            <div style='font-size:11px;color:#475569;'>This is an automated confirmation email. Please do not reply.</div>
            <div style='font-size:11px;color:#475569;margin-top:4px;'>© " . date('Y') . " Danoria Airways. All rights reserved.</div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>
";

// ── Send via PHPMailer ───────────────────────────────────────────────────────
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'danoriatravels@gmail.com';
    $mail->Password   = 'rdltwvpsghpuiork';   // App password (spaces removed)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('danoriatravels@gmail.com', 'Danoria Airways');
    $mail->addAddress($toEmail, $passengerName ?: 'Valued Passenger');
    $mail->addReplyTo('danoriatravels@gmail.com', 'Danoria Airways');

    $mail->isHTML(true);
    $mail->Subject = "✈ Danoria Airways – Your E-Ticket | PNR: $pnr";
    $mail->Body    = $htmlBody;
    $mail->AltBody = "Danoria Airways Booking Confirmation\n\nPNR: $pnr\nFlight: $flightCode\nRoute: $route\nDate: $bookingDate\nDuration: $durationDisplay\nDeparture: $departureTime\nFare: $fare\nCabin: $cabinClass\n\nThank you for choosing Danoria Airways!";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'E-ticket sent to ' . $toEmail]);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Email failed: ' . $mail->ErrorInfo]);
}
