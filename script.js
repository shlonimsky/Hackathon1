// Declaring the necesery  variables
const btnUserGuess = document.getElementById("user-guess");
const btnCompGuess = document.getElementById("computer-guess")
const homeSection = document.getElementById("home")
const gameSection1 = document.getElementById("scope1")
const gameSection = document.getElementById("scope")
const level = document.querySelectorAll("#level-container > input")
let attempt = 10;
let numberLength = 4;
let counter = 0;
let compNumb;


//  * * * * * * * * * * * * * * * * HOME PAGE * * * * * * * * * * * * * * * * * 

function chooseDifficulty() {
    //  adding "change" events to the radio buttons
    for (let i = 0; i <= level.length - 1; i++) {
        level[i].addEventListener("change", difficultyForGame)
    }
}

chooseDifficulty()

function difficultyForGame(evt) {
    // if user changes the difficulty, this function will changes the veriables 
    // values to make the code dynamic
    switch (evt.target.value) {
        case 'easy':
            attempt = 10;
            numberLength = 3;

            break;
        case "medium":
            attempt = 10;
            numberLength = 4;

            break;
        case "hard":
            attempt = 7;
            numberLength = 4;
            break;
        default: console.log(`Error`)
    }
}

// Events for the buttons
btnUserGuess.addEventListener("click", startGamePage)
// btnCompGuess.addEventListener("click", startGamePage)


// * * * * * * * * * * * * * * * GAMING PART (GUESSING PART) * * * * * * * * * * * * * * * * * 

//  ------ preparation to game and checking the input ------

function startGamePage(evt) {
// Opening the game board(id=scope) and hidding the home board
    homeSection.classList.toggle("notVisible")
    homeSection.classList.toggle("grid-containerHome")
    gameSection.classList.toggle("notVisible")
    gameSection.classList.toggle("flexContainerGame")

    createTheGameScope()
    footerApearing()

    // generate random number
    compNumb = generateCompNumber();
}


function checkUniqueNumber(evt) {
    // entered unique digits checking 

    evt.preventDefault();

    let userNumber = [];
    // pushing the number that user entered to array
    for (let i = 0; i < numberLength; i++) {
        userNumber.push(evt.target[i].value)
    }
    // array function that checks if arrau contains only unique numbers(return true if only unoque/ false if not)
    const allUnique = arr => arr.length === new Set(arr).size

    if (allUnique(userNumber)) {
        mainGameFunction(userNumber)
    } else {
// showing the error message
        document.forms[counter].children[numberLength + 1].classList.toggle("error")
        setTimeout(togleError, 2000);
    }
}

function togleError() {
    // Alert about the entering unique numbers only
    document.forms[counter].children[numberLength + 1].classList.toggle("error")
}


//  ------ The main game process ------

function mainGameFunction(userNumber) {
    // The main function respons how many bulls or cows user have found and calls:
    // - function that blocks previously fields and button
    // - function that shows images and 
    // - function that checks if user get win.
 
    disableField()
    document.getElementById(`btn${attempt}`).classList.add("notVisible")
    document.getElementById(`btn${attempt}`).nextSibling.classList.add("notVisible")

    // counting the amount of bulls and cows
    let bulls = 0, cows = 0;
    for (let i = 0; i <= numberLength - 1; i++) {
        for (let j = 0; j <= numberLength - 1; j++) {
            if (userNumber[i] == compNumb[j]) {
                i === j ? bulls++ : cows++
            }
        }
    }
    console.log(`cows${cows}`)
    console.log(`bulls${bulls}`)
    displayingImages(cows, bulls)
    win_Loose_Check(bulls, attempt)
}


function win_Loose_Check(bulls, attempt) {
// checking if the user won/lost or continue playing

    if (bulls === numberLength) {
        createWinWindow(1)
    } else if (attempt === 0) {
        createWinWindow(0)
        return;
    }
    else {
        createTheGameScope();
    }
}

//  ------ Creating part ------


function createTheGameScope() {
    // This function creates new input forms and new images every attempt

    document.getElementById("attempt").textContent = `Attemts left: ${attempt} `
    // container for images
    const divCow = document.createElement("div")
    divCow.setAttribute("id", `cow${attempt}`)
    // creating 4 images
    for (let i = 1; i <= numberLength; i++) {
        let imgCow = document.createElement("img")
        imgCow.setAttribute("src", "img/cow.png");
        imgCow.classList.add("hidden")
        divCow.appendChild(imgCow)
    }
    gameSection1.appendChild(divCow)

    // form container
    const newForm = document.createElement("form")
    newForm.addEventListener("submit", checkUniqueNumber)
    newForm.addEventListener("keydown", onlyNumbers)
    // newForm.classList.add("flex-form")
    // Creating 4 inputs
    for (let i = 1; i <= numberLength; i++) {
        const newInput = document.createElement("input")
        newInput.setAttribute("type", "text")
        newInput.setAttribute("maxlength", "1")
        newInput.setAttribute("required", "")
        newForm.appendChild(newInput)
    }
    // Button creating
    const newSubmit = document.createElement("button")
    newSubmit.setAttribute("type", "submit")
    newSubmit.setAttribute("id", `btn${attempt}`)
    const btnText = document.createTextNode("Check")
    // message "error" creating
    const errorMessage = document.createElement("p")
    errorMessage.classList.add("grid-5-columns")
    const errorMessageText = document.createTextNode("Unique digits only")
    errorMessage.appendChild(errorMessageText)
    // Appending
    newSubmit.appendChild(btnText)
    newForm.appendChild(newSubmit)
    newForm.appendChild(errorMessage)
    gameSection1.appendChild(newForm)

    // Bulls section
    const divBull = document.createElement("div")
    divBull.setAttribute("id", `bull${attempt}`)

    // creating 4 images
    for (let i = 1; i <= numberLength; i++) {
        let imgBull = document.createElement("img")
        imgBull.setAttribute("src", "img/bull.png");
        imgBull.classList.add("hidden")
        divBull.appendChild(imgBull)
    }
    gameSection1.appendChild(divBull)
}

function onlyNumbers(evt) {
    // function prevents leters or symbols inputting 
    const code = evt.keyCode;
    if (!((code >= 47 && code <= 57) || code == 8 || code == 13)) {
        evt.preventDefault();
    }
}


function disableField() {
    // Deleting previous button and making previous fields disabbled
    document.getElementById(`btn${attempt}`).classList.add("notVisible")
    const form = document.forms[counter]
    for (let i = 0; i <= numberLength - 1; i++) {
        form[i].setAttribute("disabled", "")
    }
    counter++
}


function displayingImages(cows, bulls) {
    // function displays images of cows and bulls depending on amount of guesing digits

    let cowDiv = document.querySelector(`#cow${attempt}`)
    let bullDiv = document.querySelector(`#bull${attempt}`)
    for (let i = cows - 1; i >= 0; i--) {
        cowDiv.children[i].classList.toggle("hidden")
    }
    for (let i = bulls - 1; i >= 0; i--) {
        bullDiv.children[i].classList.toggle("hidden")
    }

    attempt--
    console.log(attempt)
}


function generateCompNumber() {
    // This function generates a number that contains unique digits and do not starts from 0

    let compNumb = [];
    let n1, n2, n3, n4;
    // Generate random number != 0
    do { n1 = Math.floor(Math.random() * 10) }
    while (n1 === 0);
    compNumb.push(n1)
    // Generate random number != n1
    n2 = Math.floor(Math.random() * 10);
    while (n2 == n1) {
        n2 = Math.floor(Math.random() * 10);
    }
    compNumb.push(n2)
    // Generate random number != n1,n2
    n3 = Math.floor(Math.random() * 10);
    while ((n3 == n1) || (n3 == n2)) {
        n3 = Math.floor(Math.random() * 10);
    }
    compNumb.push(n3)
    // Generate random number != n1,n2,n3
    if (numberLength === 4) {
        n4 = Math.floor(Math.random() * 10);
        while ((n4 == n1) || (n4 == n2) || (n4 == n3)) {
            n4 = Math.floor(Math.random() * 10);
        }
        compNumb.push(n4)
    }
    console.log(`Computer's number: ${compNumb}`)
    return compNumb;
}

// * * * * * * * * * * * * * * * FOOTER * * * * * * * * * * * * * * * 

function footerApearing() {
    // mahes footer apeeared from buttom
    document.querySelector("footer").classList.add("apearing_from_bottom")
    const draft = document.querySelectorAll("footer span")
    for (let i = 0; i <= draft.length - 1; i++) {
        draft[i].addEventListener("click", crosOutDigits)
    }
}

function crosOutDigits(evt) {
    // making digits in draft faded out
    evt.target.classList.toggle("fade-out")
}

// * * * * * * * * * * * * * * *  POP-UP (rules) * * * * * * * * * * * * * * * 
const openRules = document.querySelector("#openRules")
const closeRules = document.querySelector("#closeRules")

openRules.addEventListener("click", openCloseRules)
closeRules.addEventListener("click", openCloseRules)

function openCloseRules() {
    // making rules hidden or not
    document.querySelector("#rules").classList.toggle("pop-up")
}

// * * * * * * * * * * * POP-UP (Winer) * * * * * * * * * * * 
function createWinWindow(n) {
    // creates or shows winner(n=1)/lose(n=0) window

    if (document.getElementById("winerLose")) {
        document.getElementById("winerLose").classList.toggle("notVisible")
    } else {
        const newWinerWindow = document.createElement("div")
        newWinerWindow.setAttribute("id", "winerLose")
        document.body.append(newWinerWindow)
    }
    textForWinLoseBorad(n);
    setTimeout(getWinerWinLoseWindow, 1000); 
}

function textForWinLoseBorad(n){
    // adding the text to board depending on win/lose user. n=1-win
    const board = document.getElementById("winerLose");
    if( n===1 ){
        board.textContent=`Congrats! You WON!`;
    } else{
        board.textContent=`Sorry,you loose`;
    }
}

function getWinerWinLoseWindow() {
    document.getElementById("winerLose").classList.toggle("slideDown")
}

// * * * * * * * * * * * * OPEN HOME * * * * * * * * * * * 
const openHome = document.getElementById("openHome")
openHome.addEventListener("click", slideHomeSection)

function slideHomeSection(evt) {
    // when user click "home", the home window appears, game board and footer become hidden, and field for input removes

    homeSection.classList.toggle("notVisible")
    homeSection.classList.toggle("grid-containerHome")
    gameSection.classList.toggle("notVisible")
    gameSection.classList.toggle("flexContainerGame")
    document.querySelector("footer").classList.toggle("apearing_from_bottom")
    if (!document.getElementById("winerLose").classList.contains("notVisible")){
        document.getElementById("winerLose").classList.toggle("notVisible")
    }
    removeAlreadyCreated()
}


function removeAlreadyCreated() {
//    removing input fields if they were created
    let n = gameSection1.childElementCount;
    while (n > 0) {
        gameSection1.children[n - 1].parentNode.removeChild(gameSection1.children[n - 1])
        n = gameSection1.childElementCount
    }
// refreshing the variables
    attempt = 10;
    numberLength = 4;
    counter = 0;
}