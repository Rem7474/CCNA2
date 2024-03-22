//utilise un fichier csv contenant les questions et réponse du quizz d'entrainement au ccna2
//structure du fichier : question;type de question(1 pour texte 2 pour image); nb de réponses; nb réponse correcte; réponse1; réponse2; réponse3; réponse4; réponse correcte1; réponse correcte2; réponse correcte3; réponse correcte4; lien de l'image
//affichage des questions et réponses dans une page html
//affichage du score à la fin du quizz, qui est composé de 50 question pris aléatoirement dans le fichier csv (et pas deux fois la même question)
//affichage du temps mis pour répondre à l'ensemble des questions
//affichage du nombre de question correcte et incorrecte
//affichage du pourcentage de réussite

//fonction pour récupérer les données du fichier csv
function getCSVData() {
    //récupération du fichier csv
    var csvFile = new XMLHttpRequest();
    csvFile.open("GET", "questions.csv", false);
    csvFile.send(null);
    var csvData = csvFile.responseText;
    //séparation des lignes
    var lines = csvData.split("\n");
    //création d'un tableau pour chaque ligne
    var data = [];
    for (var i = 0; i < lines.length; i++) {
        data.push(lines[i].split(";"));
    }
    return data;
}

//fonction pour récupérer les questions et réponses
function getQuestions() {
    var data = getCSVData();
    var questions = [];
    for (var i = 0; i < data.length; i++) {
        var question = {
            question: data[i][0],
            type: data[i][1],
            nbReponses: data[i][2],
            nbReponsesCorrectes: data[i][3],
            reponses: [],
            reponsesCorrectes: [],
            image: data[i][data[i].length - 1]
        }
        for (var j = 4; j < data[i].length - 1; j++) {
            if (j < 4 + question.nbReponses) {
                question.reponses.push(data[i][j]);
            } else {
                question.reponsesCorrectes.push(data[i][j]);
            }
        }
        questions.push(question);
    }
    return questions;
}

//fonction pour mélanger les questions et en choisir 50
function shuffleQuestions(questions) {
    var shuffledQuestions = [];
    for (var i = 0; i < 50; i++) {
        var randomIndex = Math.floor(Math.random() * questions.length);
        shuffledQuestions.push(questions[randomIndex]);
        questions.splice(randomIndex, 1);
    }
    return shuffledQuestions;
}


//fonction pour afficher les questions et réponses associées
function displayQuestions() {
}

//fonction pour commencer le quizz
function startQuizz() {
    var questions = getQuestions();
    var shuffledQuestions = shuffleQuestions(questions);
    console.log(shuffledQuestions);
}

    