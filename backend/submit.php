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
$toEmail = 'Arzautomobileservice@gmail.com';
$subject = 'Neues Auto-Verkaufsangebot - ARZ Automobile';

// Sammle Formular-Daten
$makeId = $_POST['makeId'] ?? '';
$modelId = $_POST['modelId'] ?? '';
$generationId = $_POST['generationId'] ?? '';
$serieId = $_POST['serieId'] ?? '';
$fuelId = $_POST['fuelId'] ?? '';
$transmissionId = $_POST['transmissionId'] ?? '';
$year = $_POST['year'] ?? '';
$mileage = $_POST['mileage'] ?? '';
$condition = $_POST['condition'] ?? '';
$location = $_POST['location'] ?? '';
$accidentDamage = $_POST['accidentDamage'] ?? '';
$featuresJson = $_POST['features'] ?? '[]';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$price = $_POST['price'] ?? '';

// Validiere E-Mail
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Ungültige E-Mail-Adresse']);
    exit;
}

// Erstelle E-Mail-Nachricht
$message = "Neues Auto-Verkaufsangebot\n\n";
$message .= "=== Fahrzeugdetails ===\n";
$message .= "Marke ID: $makeId\n";
$message .= "Modell ID: $modelId\n";
$message .= "Generation ID: $generationId\n";
$message .= "Karosserieform ID: $serieId\n";
$message .= "Kraftstoff: $fuelId\n";
$message .= "Getriebe: $transmissionId\n";
$message .= "Erstzulassung: $year\n";
$message .= "Kilometerstand: $mileage\n";
if (!empty($condition)) {
    $conditionText = match($condition) {
        'excellent' => 'Sehr gut (neuwertig)',
        'good' => 'Gut (gepflegt)',
        'fair' => 'Befriedigend (Gebrauchsspuren)',
        'poor' => 'Ausreichend (Reparaturbedarf)',
        default => $condition
    };
    $message .= "Fahrzeugzustand: $conditionText\n";
}
if (!empty($location)) {
    $message .= "Standort: $location\n";
}
if (!empty($accidentDamage)) {
    $accidentText = match($accidentDamage) {
        'none' => 'Kein Unfallschaden',
        'minor' => 'Kleiner Schaden (repariert)',
        'major' => 'Größerer Schaden',
        'total' => 'Totalschaden',
        default => $accidentDamage
    };
    $message .= "Unfallschaden: $accidentText\n";
}

$featureNames = [
    "ac" => "Klimaanlage / Klimaautomatik",
    "navi" => "Navigation",
    "parking_sensors" => "Parksensoren",
    "heated_seats" => "Sitzheizung",
    "panoramic_roof" => "Panoramadach",
    "sunroof" => "Schiebedach",
    "parking_assist" => "Parkassistent",
    "brake_assist" => "Bremsassistent",
    "multifunction_steering_wheel" => "Multifunktionslenkrad",
    "alloy_wheels" => "Alufelgen",
    "steel_wheels" => "Stahlfelgen",
    "trailer_hitch" => "Anhängerkupplung",
    "carplay" => "Carplay / Android Auto",
    "keyless" => "Keyless Entry / Go",
    "xenon_led" => "Xenon / LED Scheinwerfer",
    "fog_lights" => "Nebelscheinwerfer"
];

$selectedFeatures = json_decode($featuresJson, true) ?? [];
if (!empty($selectedFeatures)) {
    $message .= "Ausstattung: ";
    $featureList = [];
    foreach ($selectedFeatures as $featureId) {
        if (isset($featureNames[$featureId])) {
            $featureList[] = $featureNames[$featureId];
        } else {
             $featureList[] = $featureId;
        }
    }
    $message .= implode(", ", $featureList) . "\n";
}
$message .= "\n";

$message .= "=== Kontaktdaten ===\n";
$message .= "E-Mail: $email\n";
$message .= "Telefon: $phone\n";
$message .= "Preisvorstellung: $price €\n\n";

// Handle Bilder
$imageCount = 0;
$attachments = [];

for ($i = 1; $i <= 3; $i++) {
    if (isset($_FILES["image$i"]) && $_FILES["image$i"]['error'] === UPLOAD_ERR_OK) {
        $imageCount++;
        $file = $_FILES["image$i"];
        $attachments[] = [
            'path' => $file['tmp_name'],
            'name' => $file['name'],
            'type' => $file['type']
        ];
    }
}

if ($imageCount > 0) {
    $message .= "Anzahl Bilder: $imageCount\n";
}

// E-Mail-Header
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Sende E-Mail
$mailSent = false;

if (empty($attachments)) {
    // Einfache E-Mail ohne Anhänge
    $mailSent = mail($toEmail, $subject, $message, $headers);
} else {
    // E-Mail mit Anhängen (erfordert erweiterte PHP-Mail-Funktion)
    // Für Produktion: PHPMailer oder ähnliche Bibliothek verwenden
    $mailSent = mail($toEmail, $subject, $message, $headers);
    // Hinweis: Standard mail() unterstützt keine Anhänge gut
    // Für Produktion: PHPMailer verwenden!
}

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'E-Mail erfolgreich gesendet'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Fehler beim Senden der E-Mail'
    ]);
}
?>

