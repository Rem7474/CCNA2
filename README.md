# CCNA2 — Outils de révision et calculatrice de note finale

> Révision et utilitaires pour la préparation à la certification CCNA2.

Résumé
------
Ce dépôt contient une petite application côté client (HTML/CSS/JS) pour réviser les modules CCNA2 et une calculatrice interactive permettant d'estimer la note minimale nécessaire à l'examen final.

Principales pages
-----------------
- `index.html` — page principale de l'application de révision (quiz/configuration).
- `grade.html` — calculatrice de la note finale (remplace l'ancien script `test.php`) : entrées par sliders, résultat dynamique.
- `style.css`, `script.js` — styles et scripts globaux.
- `data/` — fichiers JSON de contenu et modules.

Fonctionnalité de la calculatrice
--------------------------------
La calculatrice applique la même logique que l'ancien script PHP :

    M_percent = (note_annuelle_sur_20 / 20) * 100
    N = 0.34 * M_percent + 0.33 * (TP + Quizz)

À partir d'un seuil cible `N` (par défaut 70), la calculatrice résout pour `E_required = TP + Quizz` :

    E_required = (N - 0.34 * M_percent) / 0.33

Et affiche :
- la valeur brute `E_required` (en %),
- la valeur legacy (E_required/2) pour compatibilité avec l'affichage PHP précédent,
- le TP nécessaire sachant votre score actuel au quizz (et un exemple pour 85/100).

Utilisation locale
------------------
Vous pouvez simplement ouvrir `index.html` ou `grade.html` dans votre navigateur.
Si vous préférez lancer un serveur local (pratique pour éviter des restrictions de `file://`), depuis la racine du dépôt utilisez Python :

```powershell
# depuis c:\Code\CCNA2\CCNA2 (PowerShell)
python -m http.server 8000
# puis ouvrez http://localhost:8000/index.html dans votre navigateur
```

En ligne
-------
Le site est également hébergé et accessible publiquement à l'adresse : https://ccna2.remcorp.fr

Fichiers importants
-------------------
- `index.html` — page d'accueil et point d'entrée.
- `grade.html` — nouvelle calculatrice (HTML/CSS/JS autonome).
- `style.css` — CSS partagé utilisé par les pages.
- `script.js` — script principal qui alimente le quiz.
- `data/*.json` — contenus des modules et manifest.
