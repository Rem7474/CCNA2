# csv_to_json.py

Description
-----------
Petit utilitaire pour convertir le CSV d'examen (`ExamCisco2.csv`) en un fichier JSON structuré utilisable par l'application (par défaut `data/final.json`).

Hypothèses et comportements
- Le CSV est séparé par des points-virgules (`;`).
- Le script tente d'ouvrir le fichier en UTF-8 (avec BOM) puis en ISO-8859-1 (latin-1) si nécessaire.
- Colonnes attendues (approximatif) : question;type;nbResponses;nbCorrect;response1;...;correctIndex1;...;image
- Les indices corrects dans le CSV sont 1-based ; le script les convertit en 0-based.

Entrées / sorties
- Entrée : `ExamCisco2.csv` (attendu à la racine du projet)
- Sortie : `data/final.json` (créé/écrasé)

Usage
-----
Depuis PowerShell à la racine du dépôt :

```powershell
# se placer dans le dossier du projet
cd c:\Code\CCNA2\CCNA2
py tools\csv_to_json.py
```

Sortie
-----
Le script écrit un JSON indenté en UTF-8 et affiche le nombre de questions écrites et le chemin du fichier de sortie.

Remarques
--------
- Si votre CSV a un format différent, adaptez le parser `parse_csv_to_questions` ou nettoyez le CSV d'abord.
- Le script est volontairement défensif mais peut laisser des réponses vides si les colonnes manquent.
