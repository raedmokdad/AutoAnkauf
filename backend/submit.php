<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Konfiguration laden
if (file_exists('config.php')) {
    require_once 'config.php';
} else {
    // Fallback falls config fehlt
    define('SMTP_RECEIVER', 'info@arz-automobile.de');
}

// Prüfen ob PHPMailer vorhanden ist
$usePHPMailer = false;
if (file_exists('PHPMailer/PHPMailer.php')) {
    require 'PHPMailer/Exception.php';
    require 'PHPMailer/PHPMailer.php';
    require 'PHPMailer/SMTP.php';
    $usePHPMailer = true;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// === DATEN VERARBEITEN ===
$formType = $_POST['formType'] ?? 'general';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$makeId = $_POST['makeId'] ?? '';
$modelId = $_POST['modelId'] ?? '';
$price = $_POST['price'] ?? '';

// Betreff generieren
$subjectPrefix = ($formType === 'purchase') ? 'ANKAUF-ANFRAGE' : 'BEWERTUNG';
$subject = "Neue $subjectPrefix: $makeId $modelId";

// E-Mail Inhalt bauen (Text)
$message = "Neue Anfrage über das Web-Formular\n";
$message .= "====================================\n\n";
$message .= "Typ: " . ($formType === 'purchase' ? 'Direkter Ankauf' : 'Fahrzeugbewertung') . "\n\n";

$message .= "=== FAHRZEUG ===\n";
$message .= "Marke: " . ($_POST['makeId'] ?? '-') . "\n";
$message .= "Modell: " . ($_POST['modelId'] ?? '-') . "\n";
$message .= "Generation: " . ($_POST['generationId'] ?? '-') . "\n";
$message .= "Serie: " . ($_POST['serieId'] ?? '-') . "\n";
$message .= "Baujahr: " . ($_POST['year'] ?? '-') . "\n";
$message .= "KM-Stand: " . ($_POST['mileage'] ?? '-') . "\n";
$message .= "Kraftstoff: " . ($_POST['fuelId'] ?? '-') . "\n";
$message .= "Getriebe: " . ($_POST['transmissionId'] ?? '-') . "\n";
$message .= "Zustand: " . ($_POST['condition'] ?? '-') . "\n";
$message .= "Unfallschaden: " . ($_POST['accidentDamage'] ?? '-') . "\n";
$message .= "Standort: " . ($_POST['location'] ?? '-') . "\n";
$message .= "Preisvorstellung: " . ($_POST['price'] ?? '-') . " EUR\n\n";

$message .= "=== AUSSTATTUNG ===\n";
$featuresJson = $_POST['features'] ?? '[]';
$features = json_decode($featuresJson, true);
if (is_array($features) && count($features) > 0) {
    $message .= implode(', ', $features) . "\n\n";
} else {
    $message .= "Keine besonderen Merkmale angegeben.\n\n";
}

$message .= "=== KONTAKT ===\n";
$message .= "E-Mail: $email\n";
$message .= "Telefon: $phone\n";

// === VERSAND ===

if ($usePHPMailer) {
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = defined('SMTP_HOST') ? SMTP_HOST : 'smtp.ionos.de';
        $mail->SMTPAuth   = true;
        $mail->Username   = defined('SMTP_USER') ? SMTP_USER : 'info@arz-automobile.de';
        $mail->Password   = defined('SMTP_PASS') ? SMTP_PASS : ''; // Passwort aus Config
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = defined('SMTP_PORT') ? SMTP_PORT : 587;
        $mail->CharSet    = 'UTF-8';

        // 1. E-Mail an HÄNDLER
        $mail->setFrom(defined('SMTP_USER') ? SMTP_USER : 'info@arz-automobile.de', 'Webformular');
        $mail->addAddress(defined('SMTP_RECEIVER') ? SMTP_RECEIVER : 'info@arz-automobile.de'); 
        $mail->addReplyTo($email); // Damit man direkt dem Kunden antworten kann

        $mail->Subject = $subject;
        $mail->Body    = $message;

        // Anhänge
        for ($i = 1; $i <= 5; $i++) {
            if (isset($_FILES["image$i"]) && $_FILES["image$i"]['error'] === UPLOAD_ERR_OK) {
                $mail->addAttachment($_FILES["image$i"]['tmp_name'], $_FILES["image$i"]['name']);
            }
        }

        $mail->send();

        // 2. Bestätigung an KUNDEN (Auto-Responder)
        $mail->clearAddresses();
        $mail->clearAttachments();
        $mail->addAddress($email); // An den Kunden
        $mail->Subject = "Eingangsbestätigung: Ihre Anfrage bei ARZ Automobile";
        
        $customerMsg = "Hallo,\n\n";
        $customerMsg .= "vielen Dank für Ihre Anfrage. Wir haben Ihre Fahrzeugdaten erhalten und werden diese schnellstmöglich prüfen.\n\n";
        $customerMsg .= "Hier ist eine Zusammenfassung Ihrer Angaben:\n";
        $customerMsg .= "--------------------------------------------------\n";
        $customerMsg .= $message;
        $customerMsg .= "\n--------------------------------------------------\n\n";
        $customerMsg .= "Ihr Team von ARZ Automobile\n";
        $customerMsg .= "Tel: 0176 30339020\n";
        $customerMsg .= "Web: www.arz-automobile.de";

        $mail->Body = $customerMsg;
        $mail->send();

        echo json_encode(['success' => true, 'message' => 'Anfrage erfolgreich gesendet']);

    } catch (Exception $e) {
        // Fallback oder Fehler
        echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    // Fallback: Standard mail() (Nicht empfohlen, keine Anhänge, oft Spam)
    // Nur nutzen, wenn PHPMailer fehlt
    $headers = "From: no-reply@arz-automobile.de\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $success = mail(defined('SMTP_RECEIVER') ? SMTP_RECEIVER : 'info@arz-automobile.de', $subject, $message, $headers);
    
    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Gesendet (Standard-Mode)']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Fehler beim Senden']);
    }
}
?>