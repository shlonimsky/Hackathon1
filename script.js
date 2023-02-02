// Declaring the necesery  variables
const btnUserGuess = document.getElementById("user-guess");
const btnCompGuess = document.getElementById("computer-guess")
const homeSection = document.getElementById("home")
const section = document.getElementById("scope")
let attempt = 10;


// Events for the buttons
btnUserGuess.addEventListener("click", startGamePage)
btnCompGuess.addEventListener("click", startGamePage)


// * * * * * * * * * * *  GAMING PART (GUESSING PART) * * * * * * * * * * * * * 
  
function createTheGameScope(){
    // This function creates new input forms and new imagis every attempt
    document.getElementById("attempt").textContent = `Attemts left: ${attempt} `
    // container for images
    const divCow = document.createElement("div")
    divCow.setAttribute("id",`cow${attempt}`)
        // creating 4 images
    for (let i=1; i<=4;i++){
    let imgCow = document.createElement("img")
    imgCow.setAttribute("src","img/cow.png");
    imgCow.classList.add("hidden")
    divCow.appendChild(imgCow)
    }
    section.appendChild(divCow)
   
    // form container
    const newForm = document.createElement("form")
    newForm.addEventListener("submit", mainGameFunction)
    newForm.addEventListener("keydown", onlyNumbers)       
    // Creating 4 inputs
    for (let i=1; i<=4; i++){
        const newInput = document.createElement("input")
        newInput.setAttribute("type","text")
        newInput.setAttribute("maxlength","1")
        newInput.setAttribute("required","")
        newForm.appendChild(newInput)
    }
    // Button creating
    const newSubmit = document.createElement("button")
    newSubmit.setAttribute("type","submit")
    const btnText = document.createTextNode("Check")
    // Appending
    newSubmit.appendChild(btnText)
    newForm.appendChild(newSubmit)
    section.appendChild(newForm)

    // Bulls section
    const divBull = document.createElement("div")
    divBull.setAttribute("id",`bull${attempt}`)

    // creating 4 images
    for (let i=1; i<=4;i++){
    let imgBull = document.createElement("img")
    imgBull.setAttribute("src","img/bull.png");
    imgBull.classList.add("hidden")
    divBull.appendChild(imgBull)
    }
    section.appendChild(divBull)
}

function startGamePage(evt){

    homeSection.classList.toggle("notVisible")
    homeSection.classList.toggle("grid-containerHome")
    section.classList.toggle("notVisible")
    section.classList.toggle("gridContainerGame")
    createTheGameScope()
    footerApearing()
}

let compNumb = generateCompNumber();

function mainGameFunction(evt){
    // The main function that cheks user's input and respons how many 
    // bulls or cows user found

    evt.preventDefault();
    let bulls=0, cows=0;
    for (let i=0; i<=3; i++){
        for (let j=0; j<=3; j++){
            if ( evt.target[i].value == compNumb[j]){
                i === j? bulls++ : cows ++
            }
        }
    }
    console.log(`cows${cows}`)
    console.log(`bulls${bulls}`)
    displayingImages(cows,bulls)
    bulls === 4? console.log(`win`) : createTheGameScope();
}

function displayingImages(cows,bulls){
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
    if (!((code >= 47 && code <= 57) || code==8)){
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
    document.querySelector("footer").classList.add("apearing_from_bottom")
    const draft = document.querySelectorAll("footer span")
    for (let i = 0; i<=draft.length-1;i++){
        draft[i].addEventListener("click", crosOutDigits)
    }

}

function crosOutDigits(evt){
    evt.target.classList.toggle("fade-out")
}