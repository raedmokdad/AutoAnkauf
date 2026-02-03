WICHTIGE ANLEITUNG ZUR E-MAIL-EINRICHTUNG
=========================================

Damit der E-Mail-Versand über IONOS zuverlässig funktioniert (inkl. Bilder und Bestätigung an den Kunden),
müssen Sie zwei Dinge tun:

1. ZUGANGSDATEN EINTRAGEN
   Öffnen Sie die Datei 'config.php' in diesem Ordner und tragen Sie Ihr E-Mail-Passwort ein:
   define('SMTP_PASS', 'Ihr_Geheimes_Passwort');
   (Prüfen Sie auch, ob die E-Mail-Adresse stimmt).

2. PHPMAILER INSTALLIEREN (Einmalig)
   Da IONOS den einfachen Versand oft blockiert, nutzen wir die Profi-Bibliothek "PHPMailer".
   
   Schritt A: Laden Sie PHPMailer herunter:
   https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip
   
   Schritt B: Entpacken Sie die ZIP-Datei.
   
   Schritt C: Erstellen Sie in diesem Ordner ('backend') einen neuen Unterordner namens 'PHPMailer'.
   
   Schritt D: Kopieren Sie den Inhalt des Ordners 'src' aus dem Download in 'backend/PHPMailer'.
   
   Die Struktur muss am Ende so aussehen:
   /backend/
      config.php
      submit.php
      PHPMailer/
         Exception.php
         PHPMailer.php
         SMTP.php

Sobald Sie das erledigt haben, funktioniert das Kontaktformular mit sicherer Verschlüsselung und Anhängen.
