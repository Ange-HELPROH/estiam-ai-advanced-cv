# Créer un CV optimisé par IA - Mini-formation

Projet pédagogique **ÉSTIAM - AI Advanced** - Auteur : **Ange TEUFACK**.

## Contexte pédagogique validé

- **Titre** : Créer un CV optimisé par IA
- **Périmètre** : Améliorer un CV existant avec ChatGPT
- **Langue** : Français
- **Public** : Étudiants et jeunes diplômés de 15 à 30 ans
- **Durée pédagogique totale** : 18 minutes
  - **Module 1** : Diagnostiquer son CV (5 minutes)
  - **Module 2** : Améliorer son CV avec ChatGPT (7 minutes)
  - **Module 3** : Vérifier et finaliser son CV (6 minutes)

## Architecture du projet (compatible GitHub Pages)

```text
estiam-ai-advanced-cv/
├── index.html          # Accueil : couverture, 3 objectifs, 3 modules, Notre méthode, 5 prompts, Vidéos, Handout PDF, Quiz, Glossaire, Crédits et Sources
├── modules/
│   ├── module-1.html   # Module 1 (5 min) : 3 critères, illustration diagnostic, CV initial à 1 colonne, analyse, exercice et lecteurs vidéo
│   ├── module-2.html   # Module 2 (7 min) : prompt en 5 blocs, illustration prompt, démonstration ChatGPT, exercice guidé et lecteurs vidéo
│   └── module-3.html   # Module 3 (6 min) : 3 contrôles, fact-check Onisep, CV Avant/Après à 1 colonne, checklist (10 points), Quiz final Google Forms et Quiz d'entraînement (8 questions)
├── css/
│   └── style.css       # Styles clairs et accessibles (police unique Merriweather 300-900 partout, palette #0D1B35 / #2452E8 / #6850C9 / #F3B448 / #22A06B)
├── js/
│   └── main.js         # Menu mobile, Sommaire repliable, copie de prompts, impression CV, checklist, Quiz d'entraînement (8 questions) et gestion Google Forms
├── assets/
│   ├── images/         # Illustrations intégrées (cover-formation.png, module-1-diagnostic.png, module-2-prompt.png, module-3-verification.png)
│   ├── docs/           # Handout PDF intégré (E3_Handout_CV_IA_FINAL.pdf)
│   └── videos/         # Vidéos MP4 intégrées (E3_Scene_01_Introduction_20s_FINAL.mp4 et E3_Lesson_Video_FINAL.mp4)
└── README.md           # Documentation technique du projet
```

## Évaluations et sources officielles

- **Quiz final principal (Google Forms officiel)** : intégré dans `modules/module-3.html` (`#quiz-final`, avec accès direct `https://forms.gle/xWCkTc8geZbm69Ud7`, lien long alternatif et intégration repliable) et accessible depuis `index.html` (`#ressources`).
- **Entraînement complémentaire (Quiz HTML local - 8 questions)** : intégré dans `modules/module-3.html` (`#quiz-entrainement`), fonctionnel hors ligne avec corrigés immédiats.
- **Sources officielles vérifiées** :
  - Onisep : « BTS Services informatiques aux organisations, option B : Solutions logicielles et applications métiers (SLAM) » (`https://www.onisep.fr/ressources/univers-formation/formations/post-bac/bts-services-informatiques-aux-organisations-option-b-solutions-logicielles-et-applications-metiers`)
  - CNIL : « Les questions-réponses de la CNIL sur l'utilisation d'un système d'IA générative » (`https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative`)

## Utilisation locale

Ouvrir directement le fichier `index.html` dans un navigateur web moderne, ou servir la racine du projet en local.
