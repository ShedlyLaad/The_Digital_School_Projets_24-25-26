<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Merci pour votre participation</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
      background-color: rgba(139, 92, 246, 0.2);
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(139, 92, 246, 0.08);
    }
    .brand {
      text-align: center;
      margin-bottom: 16px;
    }
    .brand-logo {
      height: 36px;
    }
    .brand-text {
      font-size: 14px;
      color: #555;
      margin-bottom: 8px;
      text-align: center;
    }
    .header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #8B5CF6;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
      color: #222;
    }
    .note {
      font-size: 14px;
      margin-top: 20px;
    }
    .footer {
      font-size: 12px;
      margin-top: 30px;
      color: #666;
    }
    .signature {
      margin-top: 32px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .signature img {
      height: 32px;
      vertical-align: middle;
    }
    .signature-text {
      font-size: 15px;
      color: #222;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Merci pour votre participation</div>
    <div class="content">
      @php
        $sexe = optional($response->personaldata)->sexe;
        $civilite = ($sexe === 'femme') ? 'Madame' : 'Monsieur';
        $prenom = trim((string) optional($response->personaldata)->prenom);
        $nom = trim((string) optional($response->personaldata)->nom);
        $affichageNom = trim($prenom . ' ' . $nom);
      @endphp
      <p>
        {{ $civilite }} {{ $affichageNom !== '' ? $affichageNom : 'Participant' }},
      </p>
      <p>
        Nous vous remercions d’avoir pris le temps de répondre à notre sondage :
      </p>
      <p><strong>{{ optional($response->survey)->title ?? 'Sondage' }}</strong></p>
      <p>
        Vos réponses ont été enregistrées avec succès. Vous pouvez consulter votre formulaire à tout moment grâce à votre lien personnel.
      </p>
      
      <p>
        Pour toute question ou information complémentaire, notre équipe reste à votre disposition.
      </p>
      <div class="signature">
        <img src="{{ $message->embed(public_path('bigscreen_logo_black.png')) }}" alt="Bigscreen Logo">

      </div>
    </div>
    <div class="footer">
      Cet email a été envoyé automatiquement, merci de ne pas y répondre.
    </div>
  </div>
</body>
</html>
