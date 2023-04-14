/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const chosen = src = "images/checked.png";
const notChosen = src = "images/unchecked.png";

const risultati = {
    one: 0,
    two: 0,
    three: 0
};
let count = 0;
let result = null;

function Reset(event) {
    //Tolgo il tasto "Ripeti il quiz".
    const element = event.currentTarget;
    element.classList.remove('result');
    //Riporto i div delle domande come in origine
    const boxes = document.querySelectorAll('.choice-grid div');
    for (const box of boxes) {
        box.classList.remove('choose');
        box.classList.remove('hidden');
        const mark = box.querySelector('.checkbox');
        mark.src = notChosen;
        box.addEventListener("click", onClick);
    }
    //Cancello la personalità
    const personality = document.querySelector('#endResult');
    personality.classList.add('hide');
    //Ripristino tutte le variabili 
    for (let key in risultati) {
        risultati[key] = 0;
    }
 console.log(risultati);
    count = 0;
    result = null;

    //Ritorno a inizio pagina
    const titolo = document.querySelector('header span');
    titolo.scrollIntoView('click', Reset);
}

function Personality() {

    //Riempio il div dedicato al risultato
    const new_h1 = document.querySelector('#new_h1');
    new_h1.textContent= '';
    new_h1.textContent = RESULTS_MAP[result].title;
    const new_p = document.querySelector('#new_p');
    new_p.textContent= '';
    new_p.textContent = RESULTS_MAP[result].contents;

    const container = document.querySelector('#endResult');
    container.classList.remove('hide');

    //Rivelo il tasto per "ripetere il quiz".
    const end = document.querySelector('#repeat');
    end.classList.add('result');
    end.addEventListener('click', Reset)

}
function endFunction() {

    //Rimuovo l'event listener
    const images = document.querySelectorAll('.choice-grid div');

    for (const img of images) {
        img.removeEventListener("click", onClick);
    }
    // Salvo il risultato della personalità
    if (risultati.one === risultati.two || risultati.one === risultati.three) {
        result = risultati.one;

    }

    else if (risultati.two === risultati.three) {
        result = risultati.two;

    }
    else result = risultati.one;
    Personality();


}

function onClick(event) {

    const element = event.currentTarget;
    // Prendo tutti i div con lo stesso "parent" (della stessa domanda).
    const boxes = element.parentNode.querySelectorAll('div');

    //Inserisco la risposta nel conteggio solo una volta per domanda.
    if (risultati[element.dataset.questionId] === 0) count++;


    //Inserisco il risultato della personalità che corrisponde al questionId della domanda.
    risultati[element.dataset.questionId] = element.dataset.choiceId;

    // A tutte le box tolgo la classe 'hidden' e anche 'choose' e imposto le checkbox vuote così posso cambiare risposta e aggiornare ogni volta le varie classi.
    for (const box of boxes) {
        box.classList.add('hidden');
        box.classList.remove('choose');
        const img = box.querySelector('.checkbox');
        img.src = notChosen;

    }
    //Alla box scelta aggiungo la classe 'choose' e tolgo la classe 'hidden' che ho aggiunto nel ciclo for.
    element.classList.add('choose');
    element.classList.remove('hidden');
    // Aggiorno la checkbox
    const img = event.currentTarget.querySelector('.checkbox');
    img.src = chosen;

    //Controllo per vedere se ho risposto a tutte le domande.
    if (count === 3) {
        console.log('count a 3');
        endFunction();
    };
}


const images = document.querySelectorAll('.choice-grid div');
for (const img of images) {
    img.addEventListener("click", onClick);
}


