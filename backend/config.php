<?php
// Konfiguration für E-Mail-Versand (IONOS)

// Empfänger-Adresse (Hier kommen die Anfragen an)
define('SMTP_RECEIVER', 'info@autohd.de');

// SMTP-Zugangsdaten (Vom IONOS Kundencenter)
define('SMTP_HOST', 'smtp.ionos.de');
define('SMTP_PORT', 587); // Oder 465 für SSL
define('SMTP_USER', 'info@autohd.de'); // Ihre E-Mail-Adresse
define('SMTP_PASS', 'n2a+3M+Y34_9k8+K-Ty:'); // Ihr E-Mail-Passwort

// Absender-Name, der beim Kunden angezeigt wird
define('SMTP_FROM_NAME', 'AutoHD - ARZ Automobile');

// Google reCAPTCHA v2 Konfiguration
// Site Key: Öffentlicher Schlüssel (wird im Frontend verwendet)
// Secret Key: Geheimer Schlüssel (nur für Backend-Verifizierung)
// Registrierung unter: https://www.google.com/recaptcha/admin
// HINWEIS: Aktuell Test-Keys für lokale Entwicklung!
// Vor Online-Gang durch echte Keys ersetzen!
define('RECAPTCHA_SECRET_KEY', '6LfauWUsAAAAAAqnXOEelu_bXCVnKaFICem72wEC');

// Debug-Modus (auf false setzen für Produktion)
define('DEBUG_MODE', false);
?>