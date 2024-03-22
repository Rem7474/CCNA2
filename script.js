//utilise un fichier csv contenant les questions et réponse du quizz d'entrainement au ccna2
//structure du fichier : question;type de question(1 pour texte 2 pour image); nb de réponses; nb réponse correcte; réponse1; réponse2; réponse3; réponse4; réponse correcte1; réponse correcte2; réponse correcte3; réponse correcte4; lien de l'image
//affichage des questions et réponses dans une page html
//affichage du score à la fin du quizz, qui est composé de 50 question pris aléatoirement dans le fichier csv (et pas deux fois la même question)
//affichage du temps mis pour répondre à l'ensemble des questions
//affichage du nombre de question correcte et incorrecte
//affichage du pourcentage de réussite

//event listener pour le chargement de la page
var shuffledQuestions = GetDataQuizz();
localStorage.setItem("score", 0);
localStorage.setItem("currentQuestionIndex", 0);
document.addEventListener("DOMContentLoaded", displayQuestions);
//fonction pour récupérer les données du fichier csv
function getCSVData() {
    //récupération du fichier csv (décodage ANSI)
    var csvFile = new XMLHttpRequest();
    csvFile.open("GET", "ExamCisco2.csv", false);
    csvFile.overrideMimeType("text/plain; charset=iso-8859-1"); // specify the character encoding
    csvFile.send(null);
    var csvData = csvFile.responseText;
    //séparation des lignes
    var lines = csvData.split("\n");
    //création d'un tableau pour chaque ligne
    var data = [];
    for (var i = 0; i < lines.length - 1; i++) {
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
            image: data[i][4 + parseInt(data[i][2]) + parseInt(data[i][3])]
        }
        for (var j = 4; j < 4 + parseInt(question.nbReponses); j++) {
            question.reponses.push(data[i][j]);
        }
        for (var j = 4 + parseInt(question.nbReponses); j < 4 + parseInt(question.nbReponses) + parseInt(question.nbReponsesCorrectes); j++) {

            question.reponsesCorrectes.push(question.reponses[parseInt(data[i][j]) - 1]);
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

//fonction pour commencer le quizz
function GetDataQuizz() {
    var questions = getQuestions();
    var shuffledQuestions = shuffleQuestions(questions);
    return shuffledQuestions;
}

//fonction pour afficher les questions et réponses, si appelé avec un paramètre, affiche la question suivante
function displayQuestions() {
    var div = document.getElementById("quizz");
    div.innerHTML = "";
    var divQuestion = document.createElement("div");
    divQuestion.setAttribute("id", "question");
    div.appendChild(divQuestion);
    
    // Check if there is a current question index stored in local storage
    var currentQuestionIndex = localStorage.getItem("currentQuestionIndex");
    if (currentQuestionIndex === null) {
        // If no current question index is stored, set it to 0
        currentQuestionIndex = 0;
    }
    //affiche le numéro de la question en cours sur le nombre total de questions
    var questionNumber = document.createElement("p");
    questionNumber.innerHTML = "Question " + (parseInt(currentQuestionIndex) + 1) + " / 50";
    divQuestion.appendChild(questionNumber);
    var question = document.createElement("p");
    question.innerHTML = shuffledQuestions[currentQuestionIndex].question;
    divQuestion.appendChild(question);
    if (shuffledQuestions[currentQuestionIndex].type == 2) {
        var image = document.createElement("img");
        image.setAttribute("src", shuffledQuestions[currentQuestionIndex].image);
        divQuestion.appendChild(image);
    }
    var divReponses = document.createElement("div");
    divReponses.setAttribute("class", "reponses");
    divQuestion.appendChild(divReponses);
    for (var i = 0; i < shuffledQuestions[currentQuestionIndex].reponses.length; i++) {
        var divReponse = document.createElement("div");
        divReponse.setAttribute("class", "reponse");
        divReponses.appendChild(divReponse);
        
        var input = document.createElement("input");
        //définition des attributs de l'input suivant le nombre de réponses
        if (shuffledQuestions[currentQuestionIndex].nbReponsesCorrectes == 1) {
            input.setAttribute("type", "radio");
        }
        else {
            input.setAttribute("type", "checkbox");
        }
        input.setAttribute("name", "reponse");
        input.setAttribute("id", "reponse" + i);
        divReponse.appendChild(input);
        
        var label = document.createElement("label");
        label.setAttribute("for", "reponse" + i);
        label.innerHTML = shuffledQuestions[currentQuestionIndex].reponses[i];
        divReponse.appendChild(label);
    }
    var divReponse = document.createElement("div");
    divReponse.setAttribute("id", "reponses");
    div.appendChild(divReponse);
    var reponse = document.createElement("button");
    reponse.innerHTML = "Valider";
    reponse.addEventListener("click", checkAnswer);
    divReponse.appendChild(reponse);
    // Store the updated current question index in local storage
    currentQuestionIndex++;
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
}

//fonction pour vérifier la réponse donnée, enregistrer le score et afficher la question suivante
function checkAnswer() {
    var reponses = document.getElementsByName("reponse");
    var reponsesCorrectes = shuffledQuestions[localStorage.getItem("currentQuestionIndex")].reponsesCorrectes;
    var score = localStorage.getItem("score");
    var nbReponsesCorrectes = 0;
    for (var i = 0; i < reponses.length; i++) {
        if (reponses[i].checked) {
            if (reponsesCorrectes.indexOf(shuffledQuestions[localStorage.getItem("currentQuestionIndex")].reponses[i]) != -1) {
                nbReponsesCorrectes++;
            }
        }
    }
    if (nbReponsesCorrectes == shuffledQuestions[localStorage.getItem("currentQuestionIndex")].nbReponsesCorrectes) {
        score++;
    }
    localStorage.setItem("score", score);
    // Check if the current question index is less than 50
    if (localStorage.getItem("currentQuestionIndex") < 50) {
        displayQuestions();
    }
    else {
        displayScore();
    }
}

//fonction pour afficher le score
function displayScore() {
    var div = document.getElementById("quizz");
    div.innerHTML = "";
    var score = localStorage.getItem("score");
    var p = document.createElement("p");
    p.innerHTML = "Score : " + score + " / 50";
    div.appendChild(p);
    var p = document.createElement("p");
    p.innerHTML = "Nombre de réponses correctes : " + score;
    div.appendChild(p);
    var p = document.createElement("p");
    p.innerHTML = "Nombre de réponses incorrectes : " + (50 - score);
    div.appendChild(p);
    var p = document.createElement("p");
    p.innerHTML = "Pourcentage de réussite : " + (score / 50 * 100) + " %";
    div.appendChild(p);
}

