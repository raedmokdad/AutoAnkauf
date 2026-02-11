<?php
session_start();

// === PASSWORT-KONFIGURATION ===
// Ändere diese Werte nach dem ersten Login!
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'xK9#mL2$pQ7@wR5!nH8&vB3%yT6'); // Starkes Passwort - sicher aufbewahren!

// Login-Prüfung
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        
        if ($username === ADMIN_USERNAME && $password === ADMIN_PASSWORD) {
            $_SESSION['admin_logged_in'] = true;
            header('Location: admin.php');
            exit;
        } else {
            $loginError = 'Ungültige Zugangsdaten!';
        }
    }
    
    // Login-Formular
    ?>
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Login - AutoHD</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #4CAF50, #45a049); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
            .login-box { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); width: 100%; max-width: 400px; }
            .login-box h1 { color: #4CAF50; margin-bottom: 30px; text-align: center; }
            .form-group { margin-bottom: 20px; }
            .form-group label { display: block; margin-bottom: 5px; color: #555; font-weight: bold; }
            .form-group input { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 16px; }
            .form-group input:focus { outline: none; border-color: #4CAF50; }
            .btn-login { width: 100%; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer; }
            .btn-login:hover { background: #45a049; }
            .error { background: #ffebee; color: #c62828; padding: 10px; border-radius: 5px; margin-bottom: 20px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="login-box">
            <h1 style="display: flex; align-items: center; justify-content: center; gap: 10px;"><span style="background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 8px 16px; border-radius: 5px; font-size: 20px;">AutoHD</span> Admin Login</h1>
            <?php if (isset($loginError)): ?>
                <div class="error"><?= htmlspecialchars($loginError) ?></div>
            <?php endif; ?>
            <form method="POST">
                <div class="form-group">
                    <label>Benutzername:</label>
                    <input type="text" name="username" required autofocus>
                </div>
                <div class="form-group">
                    <label>Passwort:</label>
                    <input type="password" name="password" required>
                </div>
                <button type="submit" class="btn-login">Anmelden</button>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit;
}

// === ADMIN-BEREICH ===
$uploadsDir = __DIR__ . '/../uploads/';
$uploadsUrl = '/uploads/';

// Alle Anfrage-Ordner laden
$folders = [];
if (is_dir($uploadsDir)) {
    $items = scandir($uploadsDir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || $item === '.htaccess') continue;
        $folderPath = $uploadsDir . $item;
        if (is_dir($folderPath)) {
            $jsonPath = $folderPath . '/anfrage.json';
            $htmlPath = $folderPath . '/anfrage.html';
            
            $data = [
                'folder' => $item,
                'timestamp' => '-',
                'email' => '-',
                'marke' => '-',
                'modell' => '-',
                'preisvorstellung' => '-',
                'bilder_anzahl' => 0,
                'has_html' => file_exists($htmlPath),
                'json_path' => $jsonPath
            ];
            
            // JSON-Daten laden falls vorhanden
            if (file_exists($jsonPath)) {
                $json = json_decode(file_get_contents($jsonPath), true);
                if ($json) {
                    $data['timestamp'] = $json['timestamp'] ?? '-';
                    $data['email'] = $json['kontakt']['email'] ?? '-';
                    $data['marke'] = $json['fahrzeug']['marke'] ?? '-';
                    $data['modell'] = $json['fahrzeug']['modell'] ?? '-';
                    $data['preisvorstellung'] = $json['fahrzeug']['preisvorstellung'] ?? '-';
                    $data['bilder_anzahl'] = count($json['bilder'] ?? []);
                }
            }
            
            $folders[] = $data;
        }
    }
}

// Sortieren: Neueste zuerst
usort($folders, function($a, $b) {
    return strcmp($b['timestamp'], $a['timestamp']);
});

// Suchfilter
$search = $_GET['search'] ?? '';
if (!empty($search)) {
    $folders = array_filter($folders, function($folder) use ($search) {
        $searchLower = mb_strtolower($search);
        return mb_strpos(mb_strtolower($folder['email']), $searchLower) !== false ||
               mb_strpos(mb_strtolower($folder['marke']), $searchLower) !== false ||
               mb_strpos(mb_strtolower($folder['modell']), $searchLower) !== false;
    });
}

?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Anfragen Übersicht - AutoHD</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header-content { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .header h1 { font-size: 24px; }
        .logout-btn { background: white; color: #4CAF50; padding: 10px 20px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; text-decoration: none; display: inline-block; }
        .logout-btn:hover { background: #f0f0f0; }
        .container { max-width: 1400px; margin: 30px auto; padding: 0 20px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-box { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        .stat-box .number { font-size: 36px; font-weight: bold; color: #4CAF50; }
        .stat-box .label { color: #777; margin-top: 5px; }
        .search-box { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .search-box input { width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 5px; font-size: 16px; }
        .search-box input:focus { outline: none; border-color: #4CAF50; }
        .table-container { background: white; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        thead { background: #4CAF50; color: white; }
        thead th { padding: 15px; text-align: left; font-weight: bold; }
        tbody td { padding: 15px; border-bottom: 1px solid #eee; }
        tbody tr:hover { background: #f9f9f9; }
        .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .badge-success { background: #e8f5e9; color: #4CAF50; }
        .badge-warning { background: #fff3e0; color: #f57c00; }
        .btn { padding: 8px 16px; border-radius: 5px; text-decoration: none; font-size: 14px; display: inline-block; }
        .btn-primary { background: #4CAF50; color: white; }
        .btn-primary:hover { background: #45a049; }
        .empty-state { padding: 60px; text-align: center; color: #999; }
        .empty-state .icon { font-size: 64px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <h1><span style="background: white; color: #4CAF50; padding: 5px 12px; border-radius: 5px; font-weight: bold; margin-right: 15px;">AutoHD</span> Anfragen Verwaltung</h1>
            <a href="?logout" class="logout-btn">Abmelden</a>
        </div>
    </div>

    <div class="container">
        <div class="stats">
            <div class="stat-box">
                <div class="number"><?= count($folders) ?></div>
                <div class="label">Gesamt Anfragen</div>
            </div>
            <div class="stat-box">
                <div class="number"><?= array_sum(array_column($folders, 'bilder_anzahl')) ?></div>
                <div class="label">Gesamt Bilder</div>
            </div>
            <div class="stat-box">
                <div class="number"><?= count(array_filter($folders, fn($f) => $f['has_html'])) ?></div>
                <div class="label">Mit HTML-Report</div>
            </div>
        </div>

        <div class="search-box">
            <form method="GET">
                <input type="text" name="search" placeholder="🔍 Suchen nach E-Mail, Marke oder Modell..." value="<?= htmlspecialchars($search) ?>">
            </form>
        </div>

        <div class="table-container">
            <?php if (empty($folders)): ?>
                <div class="empty-state">
                    <div class="icon">📂</div>
                    <p>Keine Anfragen gefunden<?= $search ? ' für "' . htmlspecialchars($search) . '"' : '' ?>.</p>
                </div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>E-Mail</th>
                            <th>Fahrzeug</th>
                            <th>Preisvorstellung</th>
                            <th>Bilder</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($folders as $folder): ?>
                            <tr>
                                <td><?= htmlspecialchars(date('d.m.Y H:i', strtotime($folder['timestamp']))) ?></td>
                                <td><?= htmlspecialchars($folder['email']) ?></td>
                                <td><strong><?= htmlspecialchars($folder['marke']) ?></strong> <?= htmlspecialchars($folder['modell']) ?></td>
                                <td><?= htmlspecialchars($folder['preisvorstellung']) ?> EUR</td>
                                <td><span class="badge <?= $folder['bilder_anzahl'] > 0 ? 'badge-success' : 'badge-warning' ?>"><?= $folder['bilder_anzahl'] ?> Bilder</span></td>
                                <td>
                                    <?php if ($folder['has_html']): ?>
                                        <a href="<?= $uploadsUrl . $folder['folder'] ?>/anfrage.html" target="_blank" class="btn btn-primary">📄 Ansehen</a>
                                    <?php else: ?>
                                        <span style="color: #999;">Kein Report</span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
