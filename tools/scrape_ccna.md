# scrape_ccna.py

Description
-----------
Script heuristique pour récupérer des questions/ réponses depuis une page web (ex. articles qui listent questions de modules). Le script tente d'extraire des blocs de questions suivies d'une liste de réponses et produit un fichier JSON approximatif dans `data/`.

Important — Légalité et éthique
--------------------------------
- Avant d'utiliser ce script sur un site tiers, vérifiez les conditions d'utilisation et la légalité du scraping pour cette source.
- Ce script est heuristique et peut produire des résultats incomplets ou incorrects : vérifiez et corrigez manuellement le JSON produit.

Dépendances
-----------
- `requests`
- `beautifulsoup4`

Installez-les si besoin :

```powershell
py -m pip install requests beautifulsoup4
```

Usage
-----
Exemple depuis la racine du projet :

```powershell
cd c:\Code\CCNA2\CCNA2
py tools\scrape_ccna.py --url "https://ccnareponses.com/modules-1-3-examen-sur-la-connectivite-des-reseaux-de-base-et-les-communications-reponses/"
```

Options
-------
- `--url` ou `-u` : URL de la page à scraper (par défaut une page pour les modules 1-3)
- `--out` ou `-o` : chemin de sortie JSON (par défaut dérivé de l'URL et placé dans `data/`)

Comportement et limites
-----------------------
- Le script cherche un conteneur principal `Ccnareponses_Incontent_1` puis extrait des blocs <p><strong>Question</strong></p> suivis d'une liste `<ul>` contenant les réponses.
- Il marque comme correctes les `<li>` ayant la classe `correct_answer` lorsqu'elle est présente.
- Si rien n'est trouvé dans le conteneur, le script fait un fallback en parsant toute la page.
- Le JSON produit doit être révisé manuellement : les indices `correctAnswers` peuvent être vides ou incorrects.

Sortie
-----
Un fichier JSON est écrit dans `data/` (nom dérivé de l'URL) contenant des objets avec les clés : `id`, `question`, `answers`, `correctAnswers`, `image`, `type`.

Remarques techniques
-------------------
- Le parsing HTML est fragile : toute modification du site source peut casser l'extraction.
- Respectez le `robots.txt` et les règles de bonne conduite (User-Agent, fréquence des requêtes).
