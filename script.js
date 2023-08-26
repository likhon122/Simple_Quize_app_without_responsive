// all important selected Elements 
let startButton = document.querySelector(".startButton");
let popup = document.querySelector(".popup");
let exitButton = document.querySelector(".exit-button");
let continueButton = document.querySelector(".continue-button");
let main = document.querySelector(".main");
let quizSection = document.querySelector(".quiz-section");
let quizCard = document.querySelector(".quiz-card");
let nextButton = document.querySelector(".next-button");
let questionOption = document.querySelector(".question-option");
let totlaQuestion = document.querySelector(".question-total");
let quizHeaderScore = document.querySelector(".quiz-header-score");
let resltSection = document.querySelector(".result-section");
let resultScore = document.querySelector(".result-score");

//add Event listener on start button
startButton.addEventListener("click",()=>{
    popup.classList.add("active");
    main.classList.add("active");
});
//add Event listener on Exit button
exitButton.addEventListener("click",()=>{
    popup.classList.remove("active");
    main.classList.remove("active");

});
//add event listenr on popup Continue button
continueButton.addEventListener("click",()=>{
    quizSection.classList.add("active");
    quizCard.classList.add("active");
    popup.classList.remove("active");
    main.classList.remove("active");
    getQuestion(0);
    countQuestion(1);
});
//add a event listener on popup Next button this button click to exicute getQuestion Function This Function collect Arrey question and add Question-card .. and also exicute countQuestion this function count the exact number of question...
nextButton.onclick = ()=>{
    //This Statement cheek the question number and the next click button number .... if next click button(means : question count )count  is small then the code is stoped and show the new Window
    if(questionCount < questions.length -1){
        questionCount++;
        getQuestion(questionCount);
        questionCounter++;
        countQuestion(questionCounter);
        //adding pointer events none after select any question . Select any question to desable pointer events none and chage button color...
        nextButton.classList.remove("active");
    }else{
        ShowResult();
    };
}
//This is the main arrey..Here is all resorces..
let questions = [
    {
        numb:1,
        question:"What dose HTML stands for?",
        answere:"C. Hyper Text Marcup Language",
        option:[
            "A. Hyper Type Multi Language",
            "B. Hyper Text Multiple Language",
            "C. Hyper Text Marcup Language",
            "D. Home Text Multi Language"
        ]
    },
    {
        numb:2,
        question:"What dose CSS stands for?",
        answere:"A. Cascading Style Sheet",
        option:[
            "A. Cascading Style Sheet",
            "B. Cute Style Sheet",
            "C. Computer Style Sheet",
            "D. Custom Style Sheet"
        ]
    },
    {
        numb:3,
        question:"What dose PHP stands for?",
        answere:"A. Hypertext Preprocessor",
        option:[
            "A. Hypertext Preprocessor",
            "B. Hometext Programing",
            "C. Hypertext Programing",
            "D. Programing Hypertext Processor"
        ]
    },
    {
        numb:4,
        question:"What dose SQL stands for?",
        answere:"D. Structure Query Language",
        option:[
            "A. Strength Query Language",
            "B. Style Query Language",
            "C. Science Question Language",
            "D. Structure Query Language"
        ]
    },
    {
        numb:5,
        question:"What dose XML stands for?",
        answere:"D. Extensible Marcup Language",
        option:[
            "A. Excillent Multiple Language",
            "B. Explore Multiple Language",
            "C. Extra Marcup Language",
            "D. Extensible Marcup Language"
        ]
    }
];
//Initial value
let questionCounter = 1;
let questionCount = 0;
let correctCount = 0;

function getQuestion(index){
    let questionText = document.querySelector('.question');
    //add the title number of question
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;
    //adding arrey to html value this value change to Question option
    let optionTag = `
    <div class="option"><span>${questions[index].option[0]}</span></div>
    <div class="option"><span>${questions[index].option[1]}</span></div>
    <div class="option"><span>${questions[index].option[2]}</span></div>
    <div class="option"><span>${questions[index].option[3]}</span></div>
    `;
    //ading value to questionOption;
    questionOption.innerHTML = optionTag;
    const options = document.querySelectorAll(".option");
    for(let i = 0 ; i<options.length;i++){
        options[i].setAttribute("onclick","anwerCheeker(this)");
    };
}
//show footer question number
function countQuestion(index){
    totlaQuestion.textContent = `${index} of ${questions.length} no Question`;
};

//let's cheek to answer
const anwerCheeker = (answer)=>{
    let userAnswer = answer.textContent;
    let currectAnswer = questions[questionCount].answere;
    let allOption = questionOption.children.length;
    //cheek currect answer
    if(userAnswer == currectAnswer){
        answer.classList.add("currect");
        correctCount ++;
        addCorrectNumber(correctCount);
    }else{
        answer.classList.add("incurrect");
        //show which is currect answer.
        for(let i = 0 ; i < allOption; i++){
            if(questionOption.children[i].textContent == currectAnswer){
                questionOption.children[i].setAttribute("class","option currect");
            };
        };
    };
    //desble to choose any question 
    for(let i = 0 ; i< allOption ; i++){
        questionOption.children[i].classList.add("disabled");
    };
    //adding pointer events none before select any question . Select any question to eneble pointer events auto and chage button color...
    nextButton.classList.add("active");
};

//this function cheek next click to currected answer
function addCorrectNumber(num){
    quizHeaderScore.innerHTML = `Score : ${num}/5`;
};

//Result Section Element
let showcircle = document.querySelector(".circle-div");
let resultValueParcent = document.querySelector(".result-value-pardent");
let restartButton = document.querySelector(".restart-button");
let goHomeButton = document.querySelector(".goto-home-button");

function ShowResult(){
    quizCard.classList.remove("active");
    resltSection.classList.add("active");
    resultScore.innerHTML = `Your score : ${correctCount} out of ${questions.length}`;
    let startValue = -1;
    let endingValue = correctCount/questions.length *100;
    let speed = 30;
    let relaValue = setInterval(()=>{
        if(startValue == endingValue){
            clearInterval(relaValue);
        }else{
            startValue++
            resultValueParcent.innerHTML = `${startValue}%`;
            showcircle.style.background = `conic-gradient(#c40094 ${3.6*startValue}deg, rgba(255,255,255,.1) 0deg)`
        }
    },speed)
}

restartButton.addEventListener("click",()=>{
    quizCard.classList.add("active");
    resltSection.classList.remove("active");
    questionCounter = 1;
    questionCount = 0;
    correctCount = 0;
    getQuestion(questionCount);
    countQuestion(questionCounter);
    addCorrectNumber(correctCount)
});

goHomeButton.addEventListener("click",()=>{
    quizSection.classList.remove("active");
    resltSection.classList.remove("active");
    questionCounter = 1;
    questionCount = 0;
    correctCount = 0;
    getQuestion(questionCount);
    countQuestion(questionCounter);
    addCorrectNumber(correctCount);
})