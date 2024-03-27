<?php
//page de calcul de notes cisco a partir de la moyenne annuel et donne la note minimal a la certif finale
//note_moyenne=note de l'année (sur 34 points)
//note_exam_TP=note de l'examen pratique (sur 33 points)
//note_exam_theo=note de l'examen théorique (sur 33 points)
//N=0.34*note_moyenne+0.33*(note_exam_TP+note_exam_theo);
//note_exam=note_exam_TP+note_exam_theo;
//note_exam : sur 66 points

if (isset($_GET['note_moyenne'])){
    $note_moyenne=$_GET['note_moyenne'];
    //conversion de la note sur 20 en note sur 34
    $note_moyenne=($note_moyenne/20)*34;
    $N=0.34*$note_moyenne+0.33*($note_exam);
    //calcul de la note minimale à l'examen (N>=70)
    $note_exam=70-0.34*$note_moyenne;
    echo "Note minimale à l'examen : $note_exam";
}
else{
    //formulaire de saisie des notes
    echo "<form action='test.php' method='get'>";
    echo "Note de l'année (sur 20 points) : <input type='text' name='note_moyenne'><br>";
    echo "<input type='submit'>";
    echo "</form>";
}
?>
