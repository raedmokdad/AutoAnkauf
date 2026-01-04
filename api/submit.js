// Vercel Serverless Function für Formular-Submission
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const {
      makeId,
      modelId,
      generationId,
      serieId,
      year,
      mileage,
      email,
      phone,
      price
    } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Ungültige E-Mail-Adresse' 
      });
    }

    // Create email message
    const message = `
Neues Auto-Verkaufsangebot

=== Fahrzeugdetails ===
Marke ID: ${makeId}
Modell ID: ${modelId}
Generation ID: ${generationId}
Karosserieform ID: ${serieId}
Erstzulassung: ${year}
Kilometerstand: ${mileage}

=== Kontaktdaten ===
E-Mail: ${email}
Telefon: ${phone}
Preisvorstellung: ${price} €
    `.trim();

    // Configure email transporter (using Gmail as example)
    // WICHTIG: Du musst diese Umgebungsvariablen in Vercel setzen!
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // z.B. 'Arzautomobileservice@gmail.com'
        pass: process.env.EMAIL_PASSWORD // App-spezifisches Passwort von Google
      }
    });

    // Send email
    await transporter.sendMail({
      from: email,
      to: 'Arzautomobileservice@gmail.com',
      replyTo: email,
      subject: 'Neues Auto-Verkaufsangebot - ARZ Automobile',
      text: message
    });

    return res.status(200).json({
      success: true,
      message: 'E-Mail erfolgreich gesendet'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Fehler beim Senden der E-Mail'
    });
  }
}

