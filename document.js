//variabelen
let spelen = 100;
let eten = 100;
let slapen = 100;
let status = 'Gelukkig';
let dood = false;
let timer = 0;
let timerInterval;


//constanten uit de html halen
const statusDisplay = document.getElementById('status');
const spelenDisplay = document.getElementById('spelenStatus');
const etenDisplay = document.getElementById('etenStatus');
const slapenDisplay = document.getElementById('slapenStatus');
const timerDisplay = document.getElementById('timerStatus');
const voedBtn = document.getElementById('voedBtn');
const speelBtn = document.getElementById('speelBtn');
const slaapBtn = document.getElementById('slaapBtn');
const plaatje = document.getElementById('plaatje');

//updateDisplay werkt de tekstinhoud bij met de huidige waarden van de variabelen en het past ook de plaatjes aan
function updateDisplay() {
    statusDisplay.textContent = 'Status: ' + status;
    spelenDisplay.textContent = 'Spelen: ' + spelen;
    etenDisplay.textContent = 'Eten: ' + eten;
    slapenDisplay.textContent = 'Slapen: ' + slapen;
    timerDisplay.textContent = 'Tijd in leven: ' + timer + ' seconden';

    if (status === 'Gelukkig') { // === betekent gelijk (vergelijkt waarde en type)
        plaatje.src = 'Pictures/Panda Gelukkig.png';
    } else if (status === 'Normaal') {
        plaatje.src = 'Pictures/Panda Neutraal.png';
    } else if (status === 'Verdrietig') {
        plaatje.src = 'Pictures/Panda Verdrietig.png';
    } else if (status === 'Dood') {
        plaatje.src = 'Pictures/Panda Dood.png';
    }
}

//resetGame is een functie die het spel reset als de Tamagotchi dood is. Het reset alles naar de beginwaarden
function resetGame() {
    spelen = 100;
    eten = 100;
    slapen = 100;
    status = 'Gelukkig';
    dood = false;
    timer = 0;
    clearInterval(timerInterval); //Hij cleared de timer
    startTimer(); //en hij start hem weer
    updateDisplay();
}

//decreaseStats zorgt ervoor dat de waarden van spelen, eten en slapen met vaste bedragen
function decreaseStats() {
    if (dood) return; //zorgt ervoor dat de rest niet wordt uitgevoerd als de variable 'dood' waar is

    spelen -= 15; // -= betekent -15 van de waarde
    eten -= 10;
    slapen -= 5;

    if (spelen <= 0 || eten <= 0 || slapen <= 0) { //als een van de waarden kleiner dan of gelijk aan is aan 0 is je tamagotchi dood
        status = 'Dood';
        dood = true;
        playDefeatSound();
        alert('Je Tamagotchi is overleden...'); //als de status "dood" is stopt de timer interval, wordt er een defeatsound afgespeeld en krijg je een alert
        clearInterval(timerInterval);
        setTimeout(resetGame, 5000);
    } else if (spelen <= 30 || eten <= 30 || slapen <= 30) { //als een van de waarden kleiner dan of gelijk aan is aan 30 is je tamagotchi verdrietig
        status = 'Verdrietig';
    } else if (spelen <= 70 || eten <= 70 || slapen <= 70) { //als een van de waarden kleiner dan of gelijk aan is aan 70 is je tamagotchi normaal
        status = 'Normaal';
    } else { //en anders is ie gelukkig
        status = 'Gelukkig'; 
    }
    updateDisplay();
}


//BRON: CHATGBT. Hulp gekregen van chatgbt
// startTimer zorgt ervoor dat het een interval om de 1000ms(1sec) start en die toevoegd aan de tijd in leven.
function startTimer() {
    timerInterval = setInterval(function() {
        timer++; //verhoogt de waarde met 1
        timerDisplay.textContent = 'Tijd in leven: ' + timer + ' seconden';
    }, 1000);
}

//event listeners voor de klikgebeurtenissen van de knoppen
voedBtn.addEventListener('click', function() {
    if (eten < 100 && status !== 'Dood') { // && is een soort korstluiting functie. als spelen groter is dan 100 word er niet gekeken naar de status
        eten += 10; // +10 bij de waarde
        if (eten > 100) eten = 100; //als de eerste if false is gaat ie hier naartoe
        updateDisplay();
    }
});

speelBtn.addEventListener('click', function() {
    if (spelen < 100 && status !== 'Dood') { 
        spelen += 10; 
        if (spelen > 100) spelen = 100;
        updateDisplay();
    }
});

slaapBtn.addEventListener('click', function() {
    if (slapen < 100 && status !== 'Dood') {
        slapen += 10;
        if (slapen > 100) slapen = 100;
        updateDisplay();
    }
});

setInterval(decreaseStats, 1000); //interval om stats te verminderen om de 1000ms

function playDefeatSound() {
    let defeatsound = new Audio("Audio/mixkit-player-losing-or-failing-2042.wav");
    defeatsound.play();
}

updateDisplay();
startTimer(); 