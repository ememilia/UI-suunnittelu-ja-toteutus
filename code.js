// Vakio muuttuja taulukko mihin talletetaan käyttäjän valinnat
const USER_ANSWERS = [];
// Vakio muuttuja kysymyksille
const QUESTIONS = [
  {
    question: "1. Mitä tarkoittaa clock tai watch?",
    answers: ["Katso", "Me", "Kello", "Avaruus"],
    correctAnswer: 2,
  },
  {
    question: "2. Miten kirjoitetaan Orava englanniksi?",
    answers: ["Octopuss", "Squirrel", "Bird", "Beaver"],
    correctAnswer: 1,
  },
  {
    question: "3. Mikä on oikea lyhenne i am:lle eli minä olen?",
    answers: ["Am", "Is", "I", "I'm"],
    correctAnswer: 3,
  },
  {
    question: "4. Mikä on omena englanniksi?",
    answers: ["Apple", "Kiwi", "Watermelon", "Orange"],
    correctAnswer: 0,
  },
  {
    question: "5. Miten kirjoitetaan minun nimeni on?",
    answers: ["My age is", "My name is", "My dogs name is", "My address is"],
    correctAnswer: 1,
  },
];

// Vakio muuttuja kysymyksen paikalle
const QUESTION_PLACE = document.getElementById("question");
// Vakio muuttujat vastausnapeille
const ANSWER_A = document.getElementById("a");
const ANSWER_B = document.getElementById("b");
const ANSWER_C = document.getElementById("c");
const ANSWER_D = document.getElementById("d");
// Vakio diville missä valintanapit
const ANSWER_BUTTONS = [ANSWER_A, ANSWER_B, ANSWER_C, ANSWER_D];
// Vakio muuttuja submit ja seuraava kysymys
const NEXT_BUTTON = document.getElementById("next-button");

let flags = [
  document.getElementById("flag1"),
  document.getElementById("flag2"),
  document.getElementById("flag3"),
  document.getElementById("flag4"),
  document.getElementById("flag5")
];

let quizScore = 0;

const QUESTION_EXPLAIN = document.getElementById("question-explain");

const saveUserAnswer = (userSelection) => {
  let answerIndex = userSelection;
  let correctIndex = QUESTIONS[questionIndex].correctAnswer;

  ANSWER_BUTTONS.forEach((button) => {
    // disabloi kaikki napit
    // tarkoittaa hmtl:ssä <button disabled="true"/>
    // siksi koska vastaukseen ei pitäisi pystyä vastaamaan
    // useamman kerran
    button.setAttribute("disabled", true);
  });
  // poistetaan disaple next-buttonista
  NEXT_BUTTON.removeAttribute("disabled");

  // Jos käyttäjän vastaus on oikea lisää pisteen.
  if (correctIndex === answerIndex) {
    quizScore = quizScore + 1;
   for (let i = 0;  i < quizScore; i++) {
    flags[i].style.opacity = '1.0';
   }

  }

  [correctIndex, answerIndex].forEach((idx) => {
    // toisen tehtävän luokkalistan päivitys
    const classToAdd = correctIndex === idx ? "correct" : "wrong";
    ANSWER_BUTTONS[idx].classList.add(classToAdd);
  });
};

// Näyttää kysymykset ja vastaukset
function showQuestion(questionNumber) {
  const q = QUESTIONS[questionNumber];

  const explainChild = QUESTION_EXPLAIN.children[0];

  if (explainChild) QUESTION_EXPLAIN.removeChild(explainChild);

  QUESTION_PLACE.innerText = q.question;
  // disabloi next buttonin
  NEXT_BUTTON.setAttribute("disabled", true);
  ANSWER_BUTTONS.forEach((button, buttonIndex) => {
    // jokainen nappi pitää alustaa
    // eli siis poistaa luokat wrong/correct
    button.innerText = q.answers[buttonIndex];
    button.classList.remove("wrong");
    button.classList.remove("correct");
    button.removeAttribute("disabled");
  });
}

// visan aloitustila
let questionIndex = 0;

const startQuiz = () => {
  ANSWER_BUTTONS.forEach((button, buttonIndex) => {
    button.addEventListener("click", () => {
      // enabloi kaikki napit
      // tarkoittaa hmtl:ssä <button disabled="false"/>
      saveUserAnswer(buttonIndex);
    });
    // lataa ensimmäinen kysymys
    showQuestion(questionIndex);
  });
};

const nextQuestion = () => {
  // lataa vain jos lisää kysymyksiä
  const moreQuestions = QUESTIONS.length - 1 > questionIndex;
  if (moreQuestions) {
    const nextQuestion = questionIndex + 1;
    showQuestion(nextQuestion);
    questionIndex = nextQuestion;
  } else {
    NEXT_BUTTON.innerText = "Tulos";
    // toisen tehtävän lisää elementti tässä
      // Tulostaa visailun pistemäärän
    let newChild = document.createElement("div");
    newChild.innerText = "Onneksi olkoot sait " + quizScore + "/5 pistettä";
    QUESTION_EXPLAIN.appendChild(newChild);
    // jos ei enempää kysymyksiä näyttää vastauksille oikeat vastaukset
    let quizEnding = document.getElementById("allAnswers");
    quizEnding.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", startQuiz);
NEXT_BUTTON.addEventListener("click", nextQuestion);
