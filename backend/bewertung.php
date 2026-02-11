<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Konfiguration
$toEmail = 'info@autohd.de';
$subject = 'Neue Fahrzeugbewertungsanfrage - AutoHD Autoankauf Rheinberg';

// Sammle Formular-Daten
$makeId = $_POST['makeId'] ?? '';
$makeName = $_POST['makeName'] ?? '';
$modelId = $_POST['modelId'] ?? '';
$modelName = $_POST['modelName'] ?? '';
$year = $_POST['year'] ?? '';
$mileage = $_POST['mileage'] ?? '';
$condition = $_POST['condition'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';

// Validiere E-Mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Zustand übersetzen
$conditionLabels = [
    'excellent' => 'Sehr gut (neuwertig)',
    'good' => 'Gut (gepflegt)',
    'fair' => 'Befriedigend (Gebrauchsspuren)',
    'poor' => 'Ausreichend (Reparaturbedarf)'
];
$conditionLabel = $conditionLabels[$condition] ?? $condition;

// Kilometerstand formatieren
$mileageLabel = str_replace('-', ' - ', $mileage);
$mileageLabel = str_replace('plus', '+', $mileageLabel);
$mileageLabel = str_replace('150001+', 'über 150.000', $mileageLabel);

// Erstelle E-Mail-Nachricht für Mitarbeiter
$message = "═══════════════════════════════════════════════════════════\n";
$message .= "NEUE FAHRZEUGBEWERTUNGSANFRAGE\n";
$message .= "═══════════════════════════════════════════════════════════\n\n";
$message .= "Ein Kunde hat eine Fahrzeugbewertung angefragt.\n";
$message .= "Bitte bewerten Sie das Fahrzeug manuell und senden Sie\n";
$message .= "die Bewertung per E-Mail an den Kunden.\n\n";
$message .= "═══════════════════════════════════════════════════════════\n";
$message .= "FAHRZEUGDETAILS\n";
$message .= "═══════════════════════════════════════════════════════════\n";
$message .= "Marke:        $makeName (ID: $makeId)\n";
$message .= "Modell:       $modelName (ID: $modelId)\n";
$message .= "Erstzulassung: $year\n";
$message .= "Kilometerstand: $mileageLabel km\n";
$message .= "Zustand:      $conditionLabel\n\n";
$message .= "═══════════════════════════════════════════════════════════\n";
$message .= "KONTAKTDATEN DES KUNDEN\n";
$message .= "═══════════════════════════════════════════════════════════\n";
$message .= "E-Mail:      $email\n";
$message .= "Telefon:     $phone\n\n";
$message .= "═══════════════════════════════════════════════════════════\n";
$message .= "NÄCHSTE SCHRITTE\n";
$message .= "═══════════════════════════════════════════════════════════\n";
$message .= "1. Fahrzeug professionell bewerten\n";
$message .= "2. Preisvorschlag erstellen\n";
$message .= "3. E-Mail an Kunden senden: $email\n";
$message .= "4. Optional: Angebotslink generieren und mitsenden\n";
$message .= "   Format: https://www.autoankauf-deutschland.de/angebot?\n";
$message .= "   make=$makeName&model=$modelName&year=$year&price=XXXXX\n\n";

// E-Mail-Header
$headers = "From: info@autohd.de\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Sende E-Mail an Mitarbeiter
$mailSent = mail($toEmail, $subject, $message, $headers);

// Bestätigungs-E-Mail an Kunden
$customerSubject = 'Ihre Fahrzeugbewertungsanfrage wurde erhalten - AutoHD Autoankauf Rheinberg';
$customerMessage = "Sehr geehrte/r Kunde/in,\n\n";
$customerMessage .= "vielen Dank für Ihre Fahrzeugbewertungsanfrage!\n\n";
$customerMessage .= "=== Ihre Angaben ===\n";
$customerMessage .= "Marke: $makeName\n";
$customerMessage .= "Modell: $modelName\n";
$customerMessage .= "Erstzulassung: $year\n";
$customerMessage .= "Kilometerstand: $mileageLabel km\n";
$customerMessage .= "Fahrzeugzustand: $conditionLabel\n\n";
$customerMessage .= "Unser Team wird Ihr Fahrzeug professionell bewerten und Ihnen die Bewertung meist noch am selben Tag per E-Mail zusenden.\n\n";
$customerMessage .= "Bei Fragen erreichen Sie uns unter:\n";
$customerMessage .= "Telefon: 0176 30339020\n";
$customerMessage .= "E-Mail: info@autohd.de\n\n";
$customerMessage .= "Mit freundlichen Grüßen\n";
$customerMessage .= "Ihr Team von AutoHD Autoankauf Rheinberg";

$customerHeaders = "From: info@autohd.de\r\n";
$customerHeaders .= "Reply-To: info@autohd.de\r\n";
$customerHeaders .= "MIME-Version: 1.0\r\n";
$customerHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

$customerMailSent = mail($email, $customerSubject, $customerMessage, $customerHeaders);

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Anfrage erfolgreich übermittelt'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Fehler beim Senden der E-Mail'
    ]);
}
?>

