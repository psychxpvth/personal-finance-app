# Gestion Comptabilité Personnelle

Une application web moderne pour gérer votre comptabilité personnelle avec une interface intuitive et des graphiques détaillés.

## Fonctionnalités

✨ **Tableau de bord** - Voir vos statistiques en un coup d'œil
- Solde actuel
- Total des revenus
- Total des dépenses
- Ratio revenus/dépenses

📝 **Ajouter des transactions**
- Enregistrer revenus et dépenses
- Catégories pré-définies
- Descriptions personnalisées
- Dates flexibles

📊 **Historique des transactions**
- Vue complète de toutes les transactions
- Recherche par description ou catégorie
- Filtrer par type (revenu/dépense)
- Supprimer les transactions

📈 **Graphiques**
- Dépenses par catégorie (diagramme circulaire)
- Évolution mensuelle (courbe)
- Analyse visuelle des tendances

💾 **Stockage local**
- Les données sont sauvegardées dans localStorage
- Persistance entre les sessions
- Pas de compte nécessaire

## Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

1. Cloner le repository
```bash
git clone <votre-repo>
cd personal-finance-app
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer le serveur de développement
```bash
npm run dev
```

L'application s'ouvrira automatiquement sur http://localhost:3000

## Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## Déploiement sur GitHub Pages

1. Pousser le code sur GitHub (branche `main`)
2. GitHub Actions va automatiquement builder et déployer l'app
3. L'app sera disponible à: `https://<votre-username>.github.io/personal-finance-app/`

## Technologies utilisées

- **React 18** - Framework UI
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool moderne et rapide
- **Recharts** - Graphiques et visualisations
- **CSS3** - Styles modernes et responsifs

## Structure du projet

```
src/
├── components/       # Composants React
│   ├── AddTransaction.tsx
│   ├── TransactionList.tsx
│   ├── Dashboard.tsx
│   └── Charts.tsx
├── styles/          # Fichiers CSS
├── utils/           # Fonctions utilitaires
├── types.ts         # Définitions TypeScript
├── App.tsx          # Composant principal
└── main.tsx         # Entry point
```

## Données et confidentialité

Toutes vos données sont stockées localement dans votre navigateur. Rien n'est envoyé à des serveurs externes.

## Licence

MIT

## Auteur

Créé avec ❤️ pour gérer vos finances personnelles
