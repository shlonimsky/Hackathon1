// Declaring the necesery  variables
const btnUserGuess = document.getElementById("user-guess");
const btnCompGuess = document.getElementById("computer-guess")
const homeSection = document.getElementById("home")
const gameSection = document.getElementById("scope")
const level = document.querySelectorAll("#level-container > input")
let attempt = 10;
let numberLength = 4;
let counter = 0;
let compNumb = generateCompNumber();


//  * * * * * * * * * * * * * * * * HOME PAGE * * * * * * * * * * * * * * * * * 

function chooseDifficulty(){
//  adding "chabge" events to the radio buttons
    for (let i=0; i<=level.length-1;i++){
    level[i].addEventListener("change", difficultyForGame)
    }
}

chooseDifficulty()

function difficultyForGame(evt){
// if user changes the difficulty, this function will changes the veriables 
// values to make the code dynamic
    switch (evt.target.value){
        case 'easy': 
            attempt = 10;
            numberLength=3;
            break;
        case "medium" : 
            attempt = 10;
            numberLength=4;
            break;
        case "hard" : 
            attempt=7;
            numberLength = 4;
            break;
        default: console.log(`Error`)
    }
}

// Events for the buttons
btnUserGuess.addEventListener("click", startGamePage)
btnCompGuess.addEventListener("click", startGamePage)


// * * * * * * * * * * *  GAMING PART (GUESSING PART) * * * * * * * * * * * * * 
 

function startGamePage(evt){

    homeSection.classList.toggle("notVisible")
    homeSection.classList.toggle("grid-containerHome")
    gameSection.classList.toggle("notVisible")
    gameSection.classList.toggle("gridContainerGame")
    createTheGameScope()
    footerApearing()
}


function checkUniqueNumber(evt){
    // entered unique digits checking 
    evt.preventDefault();
    //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let userNumber = [];
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   for (let i=0; i<=userNumber-1; i++){
    userNumber.push(evt.target[i].value)
   }
   const allUnique = arr => arr.length === new Set(arr).size
   if (allUnique(userNumber)){
    mainGameFunction(userNumber)
   } else{ 
    document.forms[counter].children[5].classList.toggle("error")
    setTimeout(togleError, 2000);

}

}
function togleError(){
    // Alert about the entering unique numbers only
        document.forms[counter].children[5].classList.toggle("error")
}



function mainGameFunction(userNumber){
    // The main function that cheks user's input and respons how many 
    // bulls or cows user found

    disableField()
    document.getElementById(`btn${attempt}`).classList.add("notVisible")

    // counting the amount of bulls and cows
    let bulls=0, cows=0;
    for (let i=0; i<=numberLength-1; i++){
        for (let j=0; j<=numberLength-1; j++){
            if ( userNumber[i] == compNumb[j]){
                i === j? bulls++ : cows ++
            }
        }
    }
    console.log(`cows${cows}`)
    console.log(`bulls${bulls}`)
    displayingImages(cows,bulls)
    bulls === 4? console.log(`win`) : createTheGameScope();
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Need to create WIN window
}

function createTheGameScope(){
    // This function creates new input forms and new imagis every attempt
    document.getElementById("attempt").textContent = `Attemts left: ${attempt} `
    // container for images
    const divCow = document.createElement("div")
    divCow.setAttribute("id",`cow${attempt}`)
        // creating 4 images
    for (let i=1; i<=numberLength;i++){
    let imgCow = document.createElement("img")
    imgCow.setAttribute("src","img/cow.png");
    imgCow.classList.add("hidden")
    divCow.appendChild(imgCow)
    }
    gameSection.appendChild(divCow)
   
    // form container
    const newForm = document.createElement("form")
    // newForm.addEventListener("submit", mainGameFunction)
    newForm.addEventListener("submit", checkUniqueNumber)
    newForm.addEventListener("keydown", onlyNumbers)  
    // Creating 4 inputs
    for (let i=1; i<=numberLength; i++){
        const newInput = document.createElement("input")
        newInput.setAttribute("type","text")
        newInput.setAttribute("maxlength","1")
        newInput.setAttribute("required","")
        newForm.appendChild(newInput)
    }
    // Button creating
    const newSubmit = document.createElement("button")
    newSubmit.setAttribute("type","submit")
    newSubmit.setAttribute("id", `btn${attempt}`)
    const btnText = document.createTextNode("Check")
    // message "error" creating
    const errorMessage = document.createElement("p")
    const errorMessageText = document.createTextNode("Unique digits only")
    errorMessage.appendChild(errorMessageText)
    // Appending
    newSubmit.appendChild(btnText)
    newForm.appendChild(newSubmit)
    newForm.appendChild(errorMessage)
    gameSection.appendChild(newForm)

    // Bulls section
    const divBull = document.createElement("div")
    divBull.setAttribute("id",`bull${attempt}`)

    // creating 4 images
    for (let i=1; i<=numberLength;i++){
    let imgBull = document.createElement("img")
    imgBull.setAttribute("src","img/bull.png");
    imgBull.classList.add("hidden")
    divBull.appendChild(imgBull)
    }
    gameSection.appendChild(divBull)
}


function disableField(){
    // Deleting previous button and making previous fields disabbled
    document.getElementById(`btn${attempt}`).classList.add("notVisible")
    const form = document.forms[counter]
    for (let i=0; i<=numberLength-1; i++){
        form[i].setAttribute("disabled","")
    }
}


function displayingImages(cows,bulls){
    // function displays images of cows and bulls depending on amount of guesing digits
    if (attempt > 0){
        let cowDiv = document.querySelector(`#cow${attempt}`)
        let bullDiv = document.querySelector(`#bull${attempt}`)
        for (let i=cows-1; i>=0; i--){
            console.log(bullDiv.children[i])
            cowDiv.children[i].classList.toggle("hidden")
        }
        for (let i=bulls-1; i>=0; i--){
            console.log(bullDiv.children[i])
            bullDiv.children[i].classList.toggle("hidden")
        }
    } else{
        alert(`you loose`)
    }
    attempt--
    console.log(attempt)
}

function onlyNumbers(evt){
    // function prevents leters or symbols inputting 
    const code = evt.keyCode;
    if (!((code >= 47 && code <= 57) || code==8 || code ==13)){
        evt.preventDefault();
    } 

}  

function generateCompNumber() {
    // This function generates a number that contains unique digits 
    // and not starts from 0
    // Need to change упростить при помощи создания новых функций  
    let compNumb = [];
    let n1, n2, n3, n4;
    // Generate random number != 0
    do {n1 = Math.floor(Math.random() * 10)}
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
    while ((n3 == n1)||(n3==n2)) {
        n3 = Math.floor(Math.random() * 10);
    }
    compNumb.push(n3)
    // Generate random number != n1,n1,n3
    n4 = Math.floor(Math.random() * 10);
    while ((n4 == n1) || (n4 == n2) || (n4 == n3)) {
        n4 = Math.floor(Math.random() * 10);
    }
    compNumb.push(n4)
    console.log (`Computer's number: ${compNumb}`)
    return compNumb;
}

function footerApearing(){
    // mahes footer apeeared from buttom
    document.querySelector("footer").classList.add("apearing_from_bottom")
    const draft = document.querySelectorAll("footer span")
    for (let i = 0; i<=draft.length-1;i++){
        draft[i].addEventListener("click", crosOutDigits)
    }

}

function crosOutDigits(evt){
    // making digits in draft faded out
    evt.target.classList.toggle("fade-out")
}

// * * * * * * * * * * * POP-UP (rules) * * * * * * * * * 
const openRules = document.querySelector("#openRules")
const closeRules = document.querySelector("#closeRules")

openRules.addEventListener("click", openCloseRules)
closeRules.addEventListener("click", openCloseRules)

function openCloseRules(){
    console.log(`in rules function`)
document.querySelector("#rules").classList.toggle("pop-up")
}
