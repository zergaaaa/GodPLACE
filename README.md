# 🔥 Godplace Panel - Discord Bot Manager

Panneau Discord pour Godplace.

## 🚀 Installation Rapide

\`\`\`bash
npm install
cp .env.example .env.local
# Modifier .env.local avec votre token Discord
npm run dev
\`\`\`

Ouvrez [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration Discord Bot

### Créer un Bot Discord
1. Allez sur [Discord Developer Portal](https://discord.com/developers/applications)
2. Créez une nouvelle application
3. Dans "Bot", créez un bot et copiez le token
4. Dans "OAuth2 > URL Generator" :
   - Scopes: `bot`
   - Permissions: `Send Messages`, `Attach Files`
5. Invitez le bot sur votre serveur avec l'URL générée

### Permissions requises
- ✅ Send Messages
- ✅ Attach Files
- ✅ Use Slash Commands (optionnel)

## 📁 Structure du Projet

\`\`\`
godplace-panel/
├── app/
│   ├── api/discord/send/route.ts    # API Discord
│   ├── globals.css                  # Styles globaux
│   ├── layout.tsx                   # Layout principal
│   └── page.tsx                     # Page principale
├── .env.local                       # Variables d'environnement
├── .env.example                     # Exemple de configuration
├── package.json                     # Dépendances
├── tailwind.config.js              # Configuration Tailwind
├── tsconfig.json                    # Configuration TypeScript
└── README.md                        # Ce fichier
\`\`\`

## 🎯 Fonctionnalités

- ✅ **Authentification Firebase** - Connexion sécurisée
- ✅ **Interface moderne** - Design responsive avec Tailwind CSS
- ✅ **Multi-catégories** - Support de toutes les catégories Godplace
- ✅ **Aperçu d'images** - Prévisualisation avant envoi
- ✅ **Multi-salons** - Envoi vers différents salons Discord
- ✅ **Logs complets** - Suivi des actions utilisateurs
- ✅ **Gestion d'erreurs** - Messages d'erreur détaillés

## 🔐 Sécurité

- Token Discord stocké côté serveur uniquement
- Authentification Firebase requise
- Logs de toutes les actions
- Validation des données côté serveur

## 🚀 Déploiement

Push sur GitHub → Connecter à Vercel → Ajouter DISCORD_BOT_TOKEN

Le projet fonctionne sur toute plateforme supportant Next.js :
- Netlify
- Railway
- Heroku
- VPS avec Node.js

## 🐛 Dépannage

### Le bot n'envoie pas de messages
1. Vérifiez que le token est correct dans `.env.local`
2. Vérifiez que le bot a les permissions dans le salon
3. Vérifiez les logs dans la console du serveur

### Erreur 403 (Forbidden)
- Le bot n'a pas les permissions dans le salon
- Vérifiez les rôles du bot sur Discord

### Erreur 404 (Not Found)
- L'ID du salon est incorrect
- Le bot n'est pas sur le serveur

## 📞 Support

Pour toute question ou problème :
1. Vérifiez les logs dans la console
2. Consultez la documentation Discord API
3. Ouvrez une issue sur GitHub

## 📝 Licence

Projet privé - Tous droits réservés
