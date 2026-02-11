# -*- coding: utf-8 -*-
import re

# Händler-E-Mail Template (Table-basiert)
handler_template = '''// HTML E-Mail erstellen (Table-basiert für GMX/Web.de Kompatibilität)
$htmlMessage = \'<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; font-family:Arial,sans-serif; background-color:#f5f5f5;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f5f5f5;">
<tr>
<td align="center" style="padding:20px;">
<table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff; border-radius:10px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
<!-- Header -->
<tr>
<td bgcolor="#4CAF50" style="padding:30px; text-align:center; color:#ffffff; border-radius:10px 10px 0 0;">
<div style="font-size:28px; font-weight:bold; margin:0;">Neue Fahrzeuganfrage</div>
<div style="font-size:16px; margin-top:5px;">Fahrzeugbewertung</div>
</td>
</tr>
<!-- Content -->
<tr>
<td style="padding:30px; background-color:#f9f9f9;">
<!-- Fahrzeugdaten -->
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Fahrzeugdaten</h2>
<table width="100%" cellpadding="8" cellspacing="0">
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Marke:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'makeName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Modell:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'modelName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Generation:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'generationName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Serie:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'serieName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Baujahr:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'year\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">KM-Stand:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'mileage\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Kraftstoff:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'fuelName\'] ?? $_POST[\'fuelId\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Getriebe:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'transmissionName\'] ?? $_POST[\'transmissionId\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Zustand:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'condition\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Unfallschaden:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'accidentDamage\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Standort:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'location\'] ?? \'-\') . \'</td></tr>
<tr><td width="40%" style="font-weight:bold; color:#555;">Preisvorstellung:</td><td style="color:#333; font-weight:bold;">\' . htmlspecialchars($_POST[\'price\'] ?? \'-\') . \' EUR</td></tr>
</table>
</td>
</tr>
</table>
<!-- Ausstattung -->
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Ausstattung</h2>
<div style="color:#333;">\' . (is_array($features) && count($features) > 0 ? implode(\', \', array_map(\'htmlspecialchars\', $features)) : \'Keine Ausstattungsmerkmale angegeben\') . \'</div>
</td>
</tr>
</table>
<!-- Kontaktdaten -->
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Kontaktdaten</h2>
<table width="100%" cellpadding="10" cellspacing="0" style="background-color:#e8f5e9; border-left:4px solid #4CAF50;">
<tr><td style="font-weight:bold; color:#555;">E-Mail:</td><td><a href="mailto:\' . htmlspecialchars($email) . \'" style="color:#4CAF50; text-decoration:none;">\' . htmlspecialchars($email) . \'</a></td></tr>
<tr><td style="font-weight:bold; color:#555;">Telefon:</td><td><a href="tel:\' . htmlspecialchars($phone) . \'" style="color:#4CAF50; text-decoration:none;">\' . htmlspecialchars($phone) . \'</a></td></tr>
</table>
</td>
</tr>
</table>\';

if (count($savedImages) > 0) {
    $htmlMessage .= \'
<!-- Bilder -->
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Fahrzeugbilder (\' . count($savedImages) . \')</h2>\';
    foreach ($savedImages as $imgPath) {
        $imgUrl = \'https://autohd.de/uploads/\' . basename($requestFolder) . \'/\' . basename($imgPath);
        $htmlMessage .= \'<div style="margin:10px 0;"><a href="\' . htmlspecialchars($imgUrl) . \'" target="_blank" style="display:inline-block; padding:8px 16px; background-color:#e8f5e9; border-radius:4px; color:#4CAF50; text-decoration:none;">\' . htmlspecialchars(basename($imgPath)) . \'</a></div>\';
    }
    $htmlMessage .= \'
</td>
</tr>
</table>\';
}

$htmlMessage .= \'
</td>
</tr>
<!-- Footer -->
<tr>
<td style="padding:20px; text-align:center; color:#777; font-size:14px;">
AutoHD - ARZ Automobile | Autoankauf Rheinberg<br>
info@autohd.de | 0176 30339020
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>\';'''

# Kunden-E-Mail Template (Table-basiert)
customer_template = '''// Kunden-Bestätigungsmail (Table-basiert für GMX/Web.de Kompatibilität)
$customerHtmlMsg = \'<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; font-family:Arial,sans-serif; background-color:#f5f5f5;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f5f5f5;">
<tr>
<td align="center" style="padding:20px;">
<table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff; border-radius:10px; box-shadow:0 2px 4px rgba(0,0,0,0.1);">
<tr>
<td bgcolor="#4CAF50" style="padding:30px; text-align:center; color:#ffffff; border-radius:10px 10px 0 0;">
<div style="font-size:28px; font-weight:bold; margin:0;">Bestätigung Ihrer Anfrage</div>
<div style="font-size:16px; margin-top:5px;">Vielen Dank für Ihr Vertrauen</div>
</td>
</tr>
<tr>
<td style="padding:30px; background-color:#f9f9f9;">
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Ihre übermittelten Fahrzeugdaten</h2>
<table width="100%" cellpadding="8" cellspacing="0">
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Marke:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'makeName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Modell:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'modelName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Generation:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'generationName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Serie:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'serieName\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Baujahr:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'year\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">KM-Stand:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'mileage\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Kraftstoff:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'fuelName\'] ?? $_POST[\'fuelId\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Getriebe:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'transmissionName\'] ?? $_POST[\'transmissionId\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Zustand:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'condition\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Unfallschaden:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'accidentDamage\'] ?? \'-\') . \'</td></tr>
<tr style="border-bottom:1px solid #eee;"><td width="40%" style="font-weight:bold; color:#555;">Standort:</td><td style="color:#333;">\' . htmlspecialchars($_POST[\'location\'] ?? \'-\') . \'</td></tr>
<tr><td width="40%" style="font-weight:bold; color:#555;">Ihre Preisvorstellung:</td><td style="color:#333; font-weight:bold;">\' . htmlspecialchars($_POST[\'price\'] ?? \'-\') . \' EUR</td></tr>
</table>
</td>
</tr>
</table>
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Ausstattung</h2>
<div style="color:#333;">\' . (is_array($features) && count($features) > 0 ? implode(\', \', array_map(\'htmlspecialchars\', $features)) : \'Keine Ausstattungsmerkmale angegeben\') . \'</div>
</td>
</tr>
</table>
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Was passiert als Nächstes?</h2>
<p style="margin:8px 0; color:#333;"><strong>1.</strong> Wir prüfen Ihre Fahrzeugdaten</p>
<p style="margin:8px 0; color:#333;"><strong>2.</strong> Sie erhalten ein faires, transparentes Angebot</p>
<p style="margin:8px 0; color:#333;"><strong>3.</strong> Bei Interesse vereinbaren wir einen Termin</p>
</td>
</tr>
</table>
<table width="100%" cellpadding="15" cellspacing="0" style="background-color:#ffffff; border-radius:8px; margin-bottom:20px;">
<tr>
<td>
<h2 style="color:#4CAF50; margin:0 0 15px 0; padding-bottom:10px; border-bottom:2px solid #4CAF50; font-size:20px;">Haben Sie Fragen?</h2>
<table width="100%" cellpadding="10" cellspacing="0" style="background-color:#e8f5e9; border-left:4px solid #4CAF50;">
<tr><td><p style="margin:8px 0; color:#333;"><strong>Rufen Sie uns an:</strong> <a href="tel:017630339020" style="color:#4CAF50; text-decoration:none;">0176 30339020</a></p></td></tr>
<tr><td><p style="margin:8px 0; color:#333;"><strong>Oder schreiben Sie an:</strong> <a href="mailto:info@autohd.de" style="color:#4CAF50; text-decoration:none;">info@autohd.de</a></p></td></tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:20px; text-align:center; color:#777; font-size:14px;">
AutoHD - ARZ Automobile | Autoankauf Rheinberg<br>
info@autohd.de | 0176 30339020
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>\';'''

# Datei einlesen
with open('submit.php', 'r', encoding='utf-8') as f:
    content = f.read()

# Händler-Template ersetzen (von "// HTML E-Mail erstellen" bis zum nächsten "// Kunden-Bestätigungsmail")
content = re.sub(
    r'// HTML E-Mail erstellen.*?(?=// Kunden-Bestätigungsmail)',
    handler_template + '\n\n',
    content,
    flags=re.DOTALL
)

# Kunden-Template ersetzen (von "// Kunden-Bestätigungsmail" bis "';")
content = re.sub(
    r'// Kunden-Bestätigungsmail.*?\n\';',
    customer_template,
    content,
    flags=re.DOTALL
)

# Datei schreiben
with open('submit.php', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ E-Mail-Templates erfolgreich auf Table-Layout umgestellt!")
print("   - Händler-Mail: Table-basiert, inline CSS")
print("   - Kunden-Mail: Table-basiert, inline CSS")
print("   - Kompatibel mit GMX, Web.de, Outlook, Gmail")
