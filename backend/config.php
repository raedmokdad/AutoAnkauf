<?php
// Konfiguration für E-Mail-Versand (IONOS)

// Empfänger-Adresse (Hier kommen die Anfragen an)
// EMPFEHLUNG: info@arz-automobile.de
define('SMTP_RECEIVER', 'info@arz-automobile.de');

// SMTP-Zugangsdaten (Vom IONOS Kundencenter)
define('SMTP_HOST', 'smtp.ionos.de');
define('SMTP_PORT', 587); // Oder 465 für SSL
define('SMTP_USER', 'info@autohd.de'); // Ihre E-Mail-Adresse
define('SMTP_PASS', 'n2a+3M+Y34_9k8+K-Ty:'); // Ihr E-Mail-Passwort

// Absender-Name, der beim Kunden angezeigt wird
define('SMTP_FROM_NAME', 'AutoHD - ARZ Automobile');

// Debug-Modus (auf false setzen für Produktion)
define('DEBUG_MODE', false);
?>