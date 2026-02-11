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
    define('SMTP_RECEIVER', 'info@autohd.de');
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

// === reCAPTCHA VERIFIZIERUNG ===
$recaptchaToken = $_POST['recaptchaToken'] ?? '';

if (empty($recaptchaToken)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA-Token fehlt']);
    exit;
}

// reCAPTCHA bei Google überprüfen
$recaptchaSecret = defined('RECAPTCHA_SECRET_KEY') ? RECAPTCHA_SECRET_KEY : '';

if (empty($recaptchaSecret) || $recaptchaSecret === 'DEIN_SECRET_KEY_HIER_EINFUEGEN') {
    // Entwicklungsmodus: Warnung loggen aber weiter verarbeiten
    error_log('WARNUNG: reCAPTCHA Secret Key nicht konfiguriert!');
} else {
    // Produktionsmodus: reCAPTCHA verifizieren
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptchaData = [
        'secret' => $recaptchaSecret,
        'response' => $recaptchaToken,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptchaData)
        ]
    ];

    $context = stream_context_create($options);
    $response = @file_get_contents($recaptchaUrl, false, $context);
    
    if ($response === false) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'reCAPTCHA-Verifizierung fehlgeschlagen']);
        exit;
    }

    $responseData = json_decode($response, true);
    
    if (!isset($responseData['success']) || $responseData['success'] !== true) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'reCAPTCHA-Verifizierung ungültig. Bitte versuchen Sie es erneut.']);
        exit;
    }
}

// === DATEN VERARBEITEN ===
$formType = $_POST['formType'] ?? 'general';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$makeName = $_POST['makeName'] ?? '';
$modelName = $_POST['modelName'] ?? '';
$price = $_POST['price'] ?? '';

// Betreff generieren
$subjectPrefix = ($formType === 'purchase') ? 'ANKAUF-ANFRAGE' : 'BEWERTUNG';
$subject = "Neue $subjectPrefix: $makeName $modelName";

// E-Mail Inhalt bauen (Text)
$message = "Neue Anfrage über das Web-Formular\n";
$message .= "====================================\n\n";
$message .= "Typ: " . ($formType === 'purchase' ? 'Direkter Ankauf' : 'Fahrzeugbewertung') . "\n\n";

$message .= "=== FAHRZEUG ===\n";
$message .= "Marke: " . ($_POST['makeName'] ?? '-') . "\n";
$message .= "Modell: " . ($_POST['modelName'] ?? '-') . "\n";
$message .= "Generation: " . ($_POST['generationName'] ?? '-') . "\n";
$message .= "Serie: " . ($_POST['serieName'] ?? '-') . "\n";
$message .= "Baujahr: " . ($_POST['year'] ?? '-') . "\n";
$message .= "KM-Stand: " . ($_POST['mileage'] ?? '-') . "\n";
$message .= "Kraftstoff: " . ($_POST['fuelName'] ?? $_POST['fuelId'] ?? '-') . "\n";
$message .= "Getriebe: " . ($_POST['transmissionName'] ?? $_POST['transmissionId'] ?? '-') . "\n";
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

// === BILDER AUF SERVER SPEICHERN ===
$uploadDir = __DIR__ . '/../uploads/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Eindeutigen Ordner für diese Anfrage erstellen
$timestamp = date('Ymd_His');
$emailSafe = preg_replace('/[^a-zA-Z0-9]/', '_', $email);
$requestFolder = $uploadDir . $timestamp . '_' . $emailSafe . '/';
mkdir($requestFolder, 0755, true);

// Bilder speichern
$savedImages = [];
error_log("[BILD-UPLOAD] Prüfe $_FILES Array: " . print_r(array_keys($_FILES), true));
for ($i = 1; $i <= 5; $i++) {
    $fieldName = "image$i";
    if (isset($_FILES[$fieldName])) {
        error_log("[BILD-UPLOAD] Bild $i - Error Code: " . $_FILES[$fieldName]['error'] . ", Name: " . $_FILES[$fieldName]['name']);
        if ($_FILES[$fieldName]['error'] === UPLOAD_ERR_OK) {
            $fileName = 'image' . $i . '_' . basename($_FILES[$fieldName]['name']);
            $targetPath = $requestFolder . $fileName;
            if (move_uploaded_file($_FILES[$fieldName]['tmp_name'], $targetPath)) {
                $savedImages[] = $targetPath;
                error_log("[BILD-UPLOAD] ✓ Bild $i erfolgreich gespeichert: $targetPath (" . filesize($targetPath) . " bytes)");
            } else {
                error_log("[BILD-UPLOAD] ✗ Bild $i konnte nicht verschoben werden");
            }
        } else {
            error_log("[BILD-UPLOAD] Bild $i hat Upload-Fehler: " . $_FILES[$fieldName]['error']);
        }
    }
}
error_log("[BILD-UPLOAD] Gesamt " . count($savedImages) . " Bilder gespeichert in: $requestFolder");

// Formulardaten auch als JSON speichern
$formData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'formType' => $formType,
    'fahrzeug' => [
        'marke' => $_POST['makeName'] ?? '-',
        'modell' => $_POST['modelName'] ?? '-',
        'generation' => $_POST['generationName'] ?? '-',
        'serie' => $_POST['serieName'] ?? '-',
        'baujahr' => $_POST['year'] ?? '-',
        'kmStand' => $_POST['mileage'] ?? '-',
        'kraftstoff' => $_POST['fuelName'] ?? $_POST['fuelId'] ?? '-',
        'getriebe' => $_POST['transmissionName'] ?? $_POST['transmissionId'] ?? '-',
        'zustand' => $_POST['condition'] ?? '-',
        'unfallschaden' => $_POST['accidentDamage'] ?? '-',
        'standort' => $_POST['location'] ?? '-',
        'preisvorstellung' => $_POST['price'] ?? '-'
    ],
    'ausstattung' => $features,
    'kontakt' => [
        'email' => $email,
        'telefon' => $phone
    ],
    'bilder' => array_map('basename', $savedImages)
];
file_put_contents($requestFolder . 'anfrage.json', json_encode($formData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// PDF-Version der E-Mail erstellen (mit TCPDF falls vorhanden, sonst HTML)
if (file_exists(__DIR__ . '/tcpdf/tcpdf.php')) {
    require_once(__DIR__ . '/tcpdf/tcpdf.php');
    
    $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
    $pdf->SetCreator('AutoHD');
    $pdf->SetAuthor('AutoHD - ARZ Automobile');
    $pdf->SetTitle('Fahrzeuganfrage ' . $makeName . ' ' . $modelName);
    $pdf->SetSubject('Bewertung');
    
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->SetMargins(15, 15, 15);
    $pdf->SetAutoPageBreak(TRUE, 15);
    
    $pdf->AddPage();
    $pdf->SetFont('helvetica', '', 10);
    
    // Text-Version für PDF
    $pdfContent = '<h1 style="color: #4CAF50;">🚗 Neue Fahrzeuganfrage</h1>';
    $pdfContent .= '<p><strong>Datum:</strong> ' . date('d.m.Y H:i:s') . '</p>';
    $pdfContent .= '<hr>';
    $pdfContent .= '<h2 style="color: #4CAF50;">Fahrzeugdaten</h2>';
    $pdfContent .= '<table cellpadding="5" style="width:100%; border: 1px solid #ddd;">';
    $pdfContent .= '<tr><td style="width:40%; font-weight:bold;">Marke:</td><td>' . htmlspecialchars($_POST['makeName'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Modell:</td><td>' . htmlspecialchars($_POST['modelName'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Generation:</td><td>' . htmlspecialchars($_POST['generationName'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Serie:</td><td>' . htmlspecialchars($_POST['serieName'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Baujahr:</td><td>' . htmlspecialchars($_POST['year'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">KM-Stand:</td><td>' . htmlspecialchars($_POST['mileage'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Kraftstoff:</td><td>' . htmlspecialchars($_POST['fuelName'] ?? $_POST['fuelId'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Getriebe:</td><td>' . htmlspecialchars($_POST['transmissionName'] ?? $_POST['transmissionId'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Zustand:</td><td>' . htmlspecialchars($_POST['condition'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Unfallschaden:</td><td>' . htmlspecialchars($_POST['accidentDamage'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Standort:</td><td>' . htmlspecialchars($_POST['location'] ?? '-') . '</td></tr>';
    $pdfContent .= '<tr><td style="font-weight:bold;">Preisvorstellung:</td><td style="font-weight:bold;">' . htmlspecialchars($_POST['price'] ?? '-') . ' EUR</td></tr>';
    $pdfContent .= '</table>';
    
    $pdfContent .= '<h2 style="color: #4CAF50; margin-top:20px;">Ausstattung</h2>';
    $pdfContent .= '<p>' . (is_array($features) && count($features) > 0 ? implode(', ', array_map('htmlspecialchars', $features)) : 'Keine Ausstattungsmerkmale angegeben') . '</p>';
    
    $pdfContent .= '<h2 style="color: #4CAF50;">Kontaktdaten</h2>';
    $pdfContent .= '<p><strong>E-Mail:</strong> ' . htmlspecialchars($email) . '<br>';
    $pdfContent .= '<strong>Telefon:</strong> ' . htmlspecialchars($phone) . '</p>';
    
    if (count($savedImages) > 0) {
        $pdfContent .= '<h2 style="color: #4CAF50;">Bilder (' . count($savedImages) . ')</h2>';
        $pdfContent .= '<p>';
        foreach ($savedImages as $imgPath) {
            $pdfContent .= '• ' . basename($imgPath) . '<br>';
        }
        $pdfContent .= '</p>';
    }
    
    $pdf->writeHTML($pdfContent, true, false, true, false, '');
    $pdf->Output($requestFolder . 'anfrage.pdf', 'F');
    error_log('[PDF] TCPDF-Datei erstellt: ' . $requestFolder . 'anfrage.pdf');
    
} else {
    // Fallback: HTML-Datei speichern (kann später mit wkhtmltopdf zu PDF konvertiert werden)
    $htmlForPdf = '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fahrzeuganfrage ' . htmlspecialchars($makeName . ' ' . $modelName) . '</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 20px auto; padding: 20px; }
        h1 { color: #4CAF50; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
        h2 { color: #4CAF50; margin-top: 30px; border-bottom: 2px solid #4CAF50; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        table td { padding: 10px; border-bottom: 1px solid #eee; }
        table td:first-child { font-weight: bold; width: 40%; color: #555; }
        .header-info { background: #e8f5e9; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #4CAF50; text-align: center; color: #777; }
        .image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin: 20px 0; }
        .image-box { border: 2px solid #4CAF50; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .image-box img { width: 100%; height: auto; display: block; }
        .image-caption { padding: 8px; margin: 0; background: #e8f5e9; font-size: 12px; text-align: center; }
        @media print { 
            body { margin: 0; }
            .image-grid { grid-template-columns: repeat(2, 1fr); page-break-inside: avoid; }
            .image-box { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <h1>🚗 Neue Fahrzeuganfrage</h1>
    <div class="header-info">
        <strong>Eingangsdatum:</strong> ' . date('d.m.Y H:i:s') . '<br>
        <strong>Anfragetyp:</strong> ' . ($formType === 'purchase' ? 'Direkter Ankauf' : 'Fahrzeugbewertung') . '
    </div>
    
    <h2>📋 Fahrzeugdaten</h2>
    <table>
        <tr><td>Marke:</td><td>' . htmlspecialchars($_POST['makeName'] ?? '-') . '</td></tr>
        <tr><td>Modell:</td><td>' . htmlspecialchars($_POST['modelName'] ?? '-') . '</td></tr>
        <tr><td>Generation:</td><td>' . htmlspecialchars($_POST['generationName'] ?? '-') . '</td></tr>
        <tr><td>Serie:</td><td>' . htmlspecialchars($_POST['serieName'] ?? '-') . '</td></tr>
        <tr><td>Baujahr:</td><td>' . htmlspecialchars($_POST['year'] ?? '-') . '</td></tr>
        <tr><td>KM-Stand:</td><td>' . htmlspecialchars($_POST['mileage'] ?? '-') . '</td></tr>
        <tr><td>Kraftstoff:</td><td>' . htmlspecialchars($_POST['fuelName'] ?? $_POST['fuelId'] ?? '-') . '</td></tr>
        <tr><td>Getriebe:</td><td>' . htmlspecialchars($_POST['transmissionName'] ?? $_POST['transmissionId'] ?? '-') . '</td></tr>
        <tr><td>Zustand:</td><td>' . htmlspecialchars($_POST['condition'] ?? '-') . '</td></tr>
        <tr><td>Unfallschaden:</td><td>' . htmlspecialchars($_POST['accidentDamage'] ?? '-') . '</td></tr>
        <tr><td>Standort:</td><td>' . htmlspecialchars($_POST['location'] ?? '-') . '</td></tr>
        <tr><td>Preisvorstellung:</td><td><strong>' . htmlspecialchars($_POST['price'] ?? '-') . ' EUR</strong></td></tr>
    </table>
    
    <h2>🔧 Ausstattung</h2>
    <p>' . (is_array($features) && count($features) > 0 ? implode(', ', array_map('htmlspecialchars', $features)) : 'Keine Ausstattungsmerkmale angegeben') . '</p>
    
    <h2>📞 Kontaktdaten</h2>
    <table>
        <tr><td>E-Mail:</td><td>' . htmlspecialchars($email) . '</td></tr>
        <tr><td>Telefon:</td><td>' . htmlspecialchars($phone) . '</td></tr>
    </table>';
    
    if (count($savedImages) > 0) {
        $htmlForPdf .= '
    <h2>📷 Fahrzeugbilder (' . count($savedImages) . ')</h2>
    <div class="image-grid">';
        foreach ($savedImages as $imgPath) {
            $imgUrl = 'https://autohd.de/uploads/' . basename($requestFolder) . '/' . basename($imgPath);
            $htmlForPdf .= '
        <div class="image-box">
            <a href="' . htmlspecialchars($imgUrl) . '" target="_blank">
                <img src="' . htmlspecialchars($imgUrl) . '" alt="' . htmlspecialchars(basename($imgPath)) . '">
            </a>
            <p class="image-caption">' . htmlspecialchars(basename($imgPath)) . '</p>
        </div>';
        }
        $htmlForPdf .= '
    </div>';
    }
    
    $htmlForPdf .= '
    <div class="footer">
        <strong>AutoHD - ARZ Automobile</strong><br>
        Autoankauf Rheinberg<br>
        info@autohd.de | 0176 30339020
    </div>
</body>
</html>';
    
    file_put_contents($requestFolder . 'anfrage.html', $htmlForPdf);
    error_log('[PDF] HTML-Datei erstellt (Browser->Drucken->PDF): ' . $requestFolder . 'anfrage.html');
}

$message .= "\n=== BILDER ===\n";
$message .= "Gespeichert in: " . basename($requestFolder) . "\n";
$message .= "Anzahl Bilder: " . count($savedImages) . "\n";
if (count($savedImages) > 0) {
    $message .= "\nBilder online ansehen:\n";
    foreach ($savedImages as $imgPath) {
        $imgUrl = 'https://autohd.de/uploads/' . basename($requestFolder) . '/' . basename($imgPath);
        $message .= "- " . $imgUrl . "\n";
    }
}

// HTML E-Mail erstellen
$htmlMessage = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9f9f9; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: #4CAF50; background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0 0; font-size: 16px; }
        .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
        .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .section h2 { color: #4CAF50; margin-top: 0; font-size: 20px; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
        .info-label { font-weight: bold; width: 40%; color: #555; }
        .info-value { width: 60%; color: #333; }
        .contact-box { background: #e8f5e9; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #777; font-size: 14px; }
        .link { color: #4CAF50; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>🚗 Neue Fahrzeuganfrage</h1>
                <p style="margin: 5px 0 0 0; font-size: 16px;">Fahrzeugbewertung</p>
            </div>
            <div class="content">
                <div class="section">
                    <h2>📋 Fahrzeugdaten</h2>
                    <div class="info-row"><span class="info-label">Marke:</span><span class="info-value">' . htmlspecialchars($_POST['makeName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Modell:</span><span class="info-value">' . htmlspecialchars($_POST['modelName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Generation:</span><span class="info-value">' . htmlspecialchars($_POST['generationName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Serie:</span><span class="info-value">' . htmlspecialchars($_POST['serieName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Baujahr:</span><span class="info-value">' . htmlspecialchars($_POST['year'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">KM-Stand:</span><span class="info-value">' . htmlspecialchars($_POST['mileage'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Kraftstoff:</span><span class="info-value">' . htmlspecialchars($_POST['fuelName'] ?? $_POST['fuelId'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Getriebe:</span><span class="info-value">' . htmlspecialchars($_POST['transmissionName'] ?? $_POST['transmissionId'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Zustand:</span><span class="info-value">' . htmlspecialchars($_POST['condition'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Unfallschaden:</span><span class="info-value">' . htmlspecialchars($_POST['accidentDamage'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Standort:</span><span class="info-value">' . htmlspecialchars($_POST['location'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Preisvorstellung:</span><span class="info-value"><strong>' . htmlspecialchars($_POST['price'] ?? '-') . ' EUR</strong></span></div>
                </div>
                
                <div class="section">
                    <h2>🔧 Ausstattung</h2>
                    <div class="info-row" style="border:none;"><span class="info-value" style="width:100%;">' . (is_array($features) && count($features) > 0 ? implode(', ', array_map('htmlspecialchars', $features)) : 'Keine Ausstattungsmerkmale angegeben') . '</span></div>
                </div>
                
                <div class="section">
                    <h2>📞 Kontaktdaten</h2>
                    <div class="contact-box">
                        <div class="info-row" style="border: none;"><span class="info-label">E-Mail:</span><span class="info-value"><a class="link" href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></span></div>
                        <div class="info-row" style="border: none;"><span class="info-label">Telefon:</span><span class="info-value"><a class="link" href="tel:' . htmlspecialchars($phone) . '">' . htmlspecialchars($phone) . '</a></span></div>
                    </div>
                </div>';

if (count($savedImages) > 0) {
    $htmlMessage .= '
                <div class="section">
                    <h2>📷 Fahrzeugbilder (' . count($savedImages) . ')</h2>';
    foreach ($savedImages as $imgPath) {
        $imgUrl = 'https://autohd.de/uploads/' . basename($requestFolder) . '/' . basename($imgPath);
        $htmlMessage .= '
                    <div style="margin: 10px 0;">
                        <a class="link" href="' . htmlspecialchars($imgUrl) . '" target="_blank" style="display: inline-block; padding: 8px 16px; background: #e8f5e9; border-radius: 4px; text-decoration: none;">📎 ' . htmlspecialchars(basename($imgPath)) . '</a>
                    </div>';
    }
    $htmlMessage .= '
                </div>';
}

$htmlMessage .= '
            </div>
            <div class="footer">
                AutoHD - ARZ Automobile | Autoankauf Rheinberg<br>
                info@autohd.de | 0176 30339020
            </div>
        </div>
    </div>
</body>
</html>
';

// Kunden-Bestätigungsmail (HTML) - identische Struktur wie Händler-Mail
$customerHtmlMsg = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9f9f9; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .card { background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: #4CAF50; background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0 0; font-size: 16px; }
        .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
        .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .section h2 { color: #4CAF50; margin-top: 0; font-size: 20px; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
        .info-label { font-weight: bold; width: 40%; color: #555; }
        .info-value { width: 60%; color: #333; }
        .contact-box { background: #e8f5e9; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 20px; }
        .footer { text-align: center; padding: 20px; color: #777; font-size: 14px; }
        .link { color: #4CAF50; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>🚗 Bestätigung Ihrer Anfrage</h1>
                <p style="margin: 5px 0 0 0; font-size: 16px;">Vielen Dank für Ihr Vertrauen</p>
            </div>
            <div class="content">
                <div class="section">
                    <h2>📋 Ihre übermittelten Fahrzeugdaten</h2>
                    <div class="info-row"><span class="info-label">Marke:</span><span class="info-value">' . htmlspecialchars($_POST['makeName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Modell:</span><span class="info-value">' . htmlspecialchars($_POST['modelName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Generation:</span><span class="info-value">' . htmlspecialchars($_POST['generationName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Serie:</span><span class="info-value">' . htmlspecialchars($_POST['serieName'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Baujahr:</span><span class="info-value">' . htmlspecialchars($_POST['year'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">KM-Stand:</span><span class="info-value">' . htmlspecialchars($_POST['mileage'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Kraftstoff:</span><span class="info-value">' . htmlspecialchars($_POST['fuelName'] ?? $_POST['fuelId'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Getriebe:</span><span class="info-value">' . htmlspecialchars($_POST['transmissionName'] ?? $_POST['transmissionId'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Zustand:</span><span class="info-value">' . htmlspecialchars($_POST['condition'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Unfallschaden:</span><span class="info-value">' . htmlspecialchars($_POST['accidentDamage'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Standort:</span><span class="info-value">' . htmlspecialchars($_POST['location'] ?? '-') . '</span></div>
                    <div class="info-row"><span class="info-label">Ihre Preisvorstellung:</span><span class="info-value"><strong>' . htmlspecialchars($_POST['price'] ?? '-') . ' EUR</strong></span></div>
                </div>
                
                <div class="section">
                    <h2>🔧 Ausstattung</h2>
                    <div class="info-row" style="border:none;"><span class="info-value" style="width:100%;">' . (is_array($features) && count($features) > 0 ? implode(', ', array_map('htmlspecialchars', $features)) : 'Keine Ausstattungsmerkmale angegeben') . '</span></div>
                </div>
                
                <div class="section">
                    <h2>� Was passiert als Nächstes?</h2>
                    <p style="margin: 8px 0;"><strong>1.</strong> Wir prüfen Ihre Fahrzeugdaten</p>
                    <p style="margin: 8px 0;"><strong>2.</strong> Sie erhalten ein faires, transparentes Angebot</p>
                    <p style="margin: 8px 0;"><strong>3.</strong> Bei Interesse vereinbaren wir einen Termin</p>
                </div>
                
                <div class="section">
                    <h2>📞 Haben Sie Fragen?</h2>
                    <div class="contact-box">
                        <p style="margin: 8px 0;"><strong>Rufen Sie uns an:</strong> <a class="link" href="tel:017630339020">0176 30339020</a></p>
                        <p style="margin: 8px 0;"><strong>Oder schreiben Sie an:</strong> <a class="link" href="mailto:info@autohd.de">info@autohd.de</a></p>
                    </div>
                </div>
            </div>
            <div class="footer">
                AutoHD - ARZ Automobile | Autoankauf Rheinberg<br>
                info@autohd.de | 0176 30339020
            </div>
        </div>
    </div>
</body>
</html>
';

// === VERSAND ===

if ($usePHPMailer) {
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = defined('SMTP_HOST') ? SMTP_HOST : 'smtp.ionos.de';
        $mail->SMTPAuth   = true;
        $mail->Username   = defined('SMTP_USER') ? SMTP_USER : 'info@autohd.de';
        $mail->Password   = defined('SMTP_PASS') ? SMTP_PASS : ''; // Passwort aus Config
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = defined('SMTP_PORT') ? SMTP_PORT : 587;
        $mail->CharSet    = 'UTF-8';
        
        // Debug aktivieren (für Fehlersuche)
        $mail->SMTPDebug = 2;
        $mail->Debugoutput = function ($str, $level) {
            error_log("PHPMailer[$level] $str");
        };
        
        // Explizit Sender setzen (für IONOS)
        $mail->Sender = 'info@autohd.de';
        
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // 1. E-Mail an HÄNDLER
        $mail->setFrom('info@autohd.de', 'AutoHD Webformular');
        $mail->addAddress(defined('SMTP_RECEIVER') ? SMTP_RECEIVER : 'info@autohd.de'); 
        $mail->addReplyTo($email); // Damit man direkt dem Kunden antworten kann

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlMessage;
        $mail->AltBody = $message; // Fallback für E-Mail-Clients ohne HTML

        // KEINE Anhänge mehr - stattdessen Links in der E-Mail
        // (SMTP-Größenlimits umgehen, schnellerer Versand)
        error_log("[HÄNDLER-MAIL] " . count($savedImages) . " Bilder als Links in E-Mail eingefügt");

        if (!$mail->send()) {
            error_log('[HÄNDLER-MAIL] Fehler: ' . $mail->ErrorInfo);
            throw new Exception('Händler-Mail konnte nicht gesendet werden');
        }
        error_log('[HÄNDLER-MAIL] Erfolgreich gesendet an: ' . (defined('SMTP_RECEIVER') ? SMTP_RECEIVER : 'info@autohd.de'));

        // 2. Bestätigung an KUNDEN (Auto-Responder)
        $mail->clearAddresses();
        $mail->clearAttachments();
        $mail->clearReplyTos();
        $mail->clearCCs();
        $mail->clearBCCs();
        
        // Absender für Kunden-Mail
        $mail->setFrom('info@autohd.de', 'AutoHD - ARZ Automobile');
        $mail->addAddress($email); // An den Kunden
        $mail->Subject = "✅ Ihre Anfrage bei AutoHD wurde erhalten";
        
        $customerMsg = "Hallo,\n\n";
        $customerMsg .= "vielen Dank für Ihre Anfrage. Wir haben Ihre Fahrzeugdaten erhalten und werden diese schnellstmöglich prüfen.\n\n";
        $customerMsg .= "Ihr Team von AutoHD - ARZ Automobile\n";
        $customerMsg .= "Tel: 0176 30339020\n";
        $customerMsg .= "E-Mail: info@autohd.de\n";
        $customerMsg .= "Web: autohd.de";

        $mail->Body = $customerHtmlMsg;
        $mail->AltBody = $customerMsg;
        
        if (!$mail->send()) {
            error_log('[KUNDEN-MAIL] Fehler: ' . $mail->ErrorInfo);
            throw new Exception('Kunden-Mail konnte nicht gesendet werden');
        }
        error_log('[KUNDEN-MAIL] Erfolgreich gesendet an: ' . $email);

        echo json_encode(['success' => true, 'message' => 'Anfrage erfolgreich gesendet']);

    } catch (Exception $e) {
        // Fallback oder Fehler
        echo json_encode(['success' => false, 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
    }
} else {
    // Fallback: Standard mail() 
    // Händler-Mail mit HTML
    $headers = "From: info@autohd.de\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $success = mail(defined('SMTP_RECEIVER') ? SMTP_RECEIVER : 'info@autohd.de', $subject, $htmlMessage, $headers);
    
    // Kunden-Bestätigung
    if ($success) {
        $customerHeaders = "From: info@autohd.de\r\n";
        $customerHeaders .= "Reply-To: info@autohd.de\r\n";
        $customerHeaders .= "MIME-Version: 1.0\r\n";
        $customerHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
        
        mail($email, "✅ Ihre Anfrage bei AutoHD wurde erhalten", $customerHtmlMsg, $customerHeaders);
        
        echo json_encode(['success' => true, 'message' => 'Gesendet']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Fehler beim Senden']);
    }
}
?>