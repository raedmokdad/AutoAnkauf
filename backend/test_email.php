<?php
/**
 * Test-Script für E-Mail-Funktionalität
 * Aufruf: http://localhost/backend/test_email.php
 * Oder: php backend/test_email.php
 */

// Simuliere POST-Daten
$_POST['makeId'] = '5';
$_POST['makeName'] = 'BMW';
$_POST['modelId'] = '123';
$_POST['modelName'] = '320d';
$_POST['year'] = '2018';
$_POST['mileage'] = '60001-100000';
$_POST['condition'] = 'good';
$_POST['email'] = 'test@example.com'; // HIER IHRE TEST-E-MAIL EINGEBEN
$_POST['phone'] = '0176 12345678';

// Setze Server-Variablen für Test
$_SERVER['REQUEST_METHOD'] = 'POST';

echo "<h1>E-Mail Test</h1>";
echo "<p>Teste E-Mail-Versand...</p>";

// Lade die bewertung.php Datei
include 'bewertung.php';

echo "<hr>";
echo "<h2>Test abgeschlossen!</h2>";
echo "<p>Bitte prüfen Sie:</p>";
echo "<ul>";
echo "<li>E-Mail-Postfach: info@autohd.de (Mitarbeiter-E-Mail)</li>";
echo "<li>E-Mail-Postfach: " . htmlspecialchars($_POST['email']) . " (Kunden-E-Mail)</li>";
echo "</ul>";
?>

