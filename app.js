//random messages
//difficulty

let wordBox;
let randomWord;
let randomArray;
let usedWords;
let letterCounter;
let chooseLetter;
let misPlaced;
let attempts;
let solution;


function startup() {
    wordBox = ['bureaulamp', 'kachel', 'prullenmand', 'snoeppot', 'broodtrommel', 'pepermolen', 'percolator', 'waterkoker', 'stekkerdoos'];
    randomWord = wordBox[Math.floor(Math.random() * wordBox.length)]; // select randomWord from wordBox
    console.log('startup: ' + randomWord)
    randomArray = randomWord.split(''); // split randomWord into array with single characters
    misPlaced = [];
    attempts = 8;
    $('#attempts').html(attempts + ' pogingen ');
    solution = randomArray.map(() => ' _ '); // map solution underscores
    $('#letter-counter').html(solution.length);
    $('#input-text').focus();
    $('#input-text').attr('maxlength', 1); // input allows just one character at a time
    $('#misplaced-letters').html('');
    $('#random-message').html('');
    usedWords = [randomWord]; //array from first randomWord
    showSolution();
    // chooseLetterButton();
    // enterButton();
}


function setupNewGame() {
    randomWord = wordBox[Math.floor(Math.random() * wordBox.length)];
    console.log('new game: ' + randomWord);
    randomArray = randomWord.split('');   
    misPlaced = []; // empty misPlaced letters
    attempts = 8;
    $('#attempts').html(attempts + ' pogingen ');
    solution = randomArray.map(() => ' _ ');
    $('#letter-counter').html(solution.length);
    $('#input-text').focus(); // set cursor
    $('#input-text').attr('maxlength', 1);
    $('#misplaced-letters').html('');
    $('#random-message').html(''); // clear message win or lose
    $('#show-attempts').show();
    let target = document.querySelector("#blade-image");
    target.src = "imgs/blade-frame-8.png";
    doubleWords();
}


// show and check solution
function showSolution(){
    $('#solution').html(solution);
    if(solution.join('') === randomArray.join('')){ //arrays into strings otherwise won't compare
        $('#show-attempts').hide();
        $('#random-message').html('YES gewonnen!'); //you win
        $('#input-text').attr('maxlength', 0); //disable input
        $('#input-text').attr('maxlength', 0); //disable input
        $('#button-choose-letter').prop('disabled', true); //disable input button
    }
}


//show wrong letters
function addMisplaced(){    
    if(misPlaced.length){
        misPlaced.push(chooseLetter);
        $('#misplaced-letters').html(misPlaced.join(' * '));
    } else {
        misPlaced.push(chooseLetter);
        $('#misplaced-letters').html(misPlaced);
    }
    countdownAttempts();
}


//countdown attempts and images
function countdownAttempts(){
    attempts--;
    let target = document.querySelector("#blade-image");

    if(attempts === 1){
        $('#attempts').html(attempts + ' poging ');
        target.src = "imgs/gif/blade-win.gif";
    }
    
    if(attempts > 1){
        $('#attempts').html(attempts + ' pogingen ');
        target.src = "imgs/blade-frame-" + attempts + ".png";
    }

    if(attempts === 0){
        $('#show-attempts').hide();
        $('#random-message').html('blèèèh je bent AF').css('color', '#cc0000'); //finished
        $('#input-text').attr('maxlength', 0); //disable input
        $('#button-choose-letter').prop('disabled', true); //disable input button
        target.src = "imgs/gif/blade-lose.gif";
    }   

}


//check already chosen letters
function doubleLetters(){
    if(misPlaced.indexOf(chooseLetter) !== -1){
        $('#show-attempts').hide();
        $('#random-message').html('Die letter heb je al geprobeerd!').css('color', '#ffff50');
    } else {
        addMisplaced();
    }
}


//check if randomWord isn't already used
function doubleWords(){
    for(let i = 0;i < usedWords.length; i++){
        if(usedWords[i] === randomWord){
            console.log('double');
            reloadGame();
        } 
    }    
}


//check usedWords vs capacity wordBox 
function reloadGame(){    
    if(usedWords.length < wordBox.length){ // prevent infinitive loop        
        setupNewGame();
    } else {
        location.reload(); //refresh
        return false;
    }
}

// make sure chosen letter shows in solution or misPlaced
function checkLetter(){
    let correctLetter = false;
    for(let i=0; i < randomArray.length; i++){
        if(chooseLetter === randomArray[i]){
            correctLetter = true;
            solution[i] = chooseLetter;
            showSolution();
        }     
    }

    if(!correctLetter){
         doubleLetters(); //prevent double letters in misPlaced
    }
}


//click on button starts new game  
$('#button-word-generator').on('click', function(){
    reloadGame();
    $('#button-choose-letter').prop('disabled', false); //enable input button
    usedWords.push(randomWord); // push after check doubleWords otherwise double entries usedWords
    console.log(usedWords);
    showSolution();
    // chooseLetterButton();
    // enterButton();
});


//button choose letter
// function chooseLetterButton() {
    $('#button-choose-letter').on('click', function(){
        chooseLetter = document.querySelector('#input-text').value;
        clearRandomMessage();
        checkLetter();
        clearText();
    });
// }


//enter button
// function enterButton() {
    $('#input-text').on('keyup', function(e) {
        chooseLetter = document.querySelector('#input-text').value;
        if(e.keyCode < 65) {
            $('#input-text').val('');
            
        }
        if (e.keyCode > 90) {
            $('#input-text').val('');
        }

        // if(e.keyCode >= 65 && e.keyCode <= 90) {
        //     $(chooseLetter).replaceWith(e);
        // }

        if(e.keyCode == 13){
            clearRandomMessage();
            checkLetter();
            clearText();
        }
    });
// }


function clearRandomMessage() {
    $('#random-message').html(''); // clear message already chosen letter
    $('#show-attempts').show();
}


function clearText() {
    $('#input-text').val(''); //clear input
    $('#input-text').focus(); //set cursor
}


// start first game
startup();