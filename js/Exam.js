var displayTime = $(".clock"); /**document.getElementsByTagName("h3")[0]; */
const totalTime = 5 * 60; // (5 minutes)
let intervalId; // ref to the time upadting to enbale me of claring the time later

window.addEventListener("load", function () {
  initTimer();
  currentQuestions = JSON.parse(
    this.window.localStorage.getItem("QuestionsArr")
  );
  questionIndex = Number(this.window.localStorage.getItem("questionIndex"));
  displayQuestions(questionIndex);
  updateButtonState();
});
function updateTime() {
  let CurrentTime = new Date().getTime(); // Current time in milliseconds
  let finishTime = localStorage.getItem("FinishTime"); // Retrieve finish time from localStorage
  if (!finishTime) {
    clearInterval(intervalId);
    localStorage.removeItem("FinishTime");
    displayTime.html("Time's up!");
    // here should aslo navigate to result page
    clearAllLocalStorage();
    navigateTo("../Timeout.html"); // navigate her to time out screens
    return; // 3shan mkmlsh ba2y el function
  }

  let remainingTime = Math.max(
    Math.floor((finishTime - CurrentTime) / 1000),
    0
  ); // Calculate remaining time in seconds

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    localStorage.removeItem("FinishTime"); // Clear end time when timer is done
    displayTime.html("Time's up!"); // navigate to result page
    clearAllLocalStorage();
    navigateTo("../Timeout.html"); // navigate her to time out screens
  } else {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    displayTime.html(
      `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    );
  }
}

function startTime() {
  let CurrentTime = new Date().getTime(); // Current time in milliseconds
  console.log(CurrentTime, " this is current time ");

  const FinishTime = CurrentTime + totalTime * 1000; // Calculate end time in milliseconds
  console.log(FinishTime, "ths is finish time");

  localStorage.setItem("FinishTime", FinishTime); // Store finish time in localStorage in case of page reload
  updateTime(); // Immediately update time
  intervalId = setInterval(updateTime, 1000); // no will call the setInterval wich will call implecictly the update time method(call back)
}

function initTimer() {
  let finshTime = localStorage.getItem("FinishTime");
  if (!finshTime) {
    // If there's no saved end time, start a new timer
    startTime();
  } else {
    //  resume from the saved end time
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  }
}

//////////////////////////////////////////////////////////////
let currentQuestions = [];

let question = document.getElementsByClassName("question")[0];
let chooseA = document.getElementsByClassName("Q1")[0];
let chooseB = document.getElementsByClassName("Q2")[0];
let chooseC = document.getElementsByClassName("Q3")[0];
let chooseD = document.getElementsByClassName("Q4")[0];
let counter = document.getElementsByClassName("count")[0];

function displayQuestions(questionIndex) {
  question.innerHTML = currentQuestions[questionIndex].question;
  chooseA.innerHTML = currentQuestions[questionIndex].A;
  chooseB.innerHTML = currentQuestions[questionIndex].b;
  chooseC.innerHTML = currentQuestions[questionIndex].c;
  chooseD.innerHTML = currentQuestions[questionIndex].d;
  counter.innerHTML = `${questionIndex + 1}`;

  $(".head div").removeClass("activeFlag");
  if (questionFlags.has(questionIndex)) {
    $(".head div").addClass("activeFlag");
  }

  let answer = localStorage.getItem(questionIndex);
  removeActiv();
  if (answer) {
    switch (answer) {
      case "A":
        chooseA.classList.add("active");
        break;
      case "B":
        chooseB.classList.add("active");
        break;
      case "C":
        chooseC.classList.add("active");
        break;
      case "D":
        chooseD.classList.add("active");
        break;
    }
  }
}
/**************************************************************************************************************************/
let prevQuestion = document.getElementsByClassName("prev")[0];
let nextQuestion = document.getElementsByClassName("next")[0];
prevQuestion.addEventListener("click", function () {
  if (questionIndex > 0) {
    questionIndex--;
    displayQuestions(questionIndex);
    window.localStorage.setItem("questionIndex", questionIndex);
  }
  updateButtonState();
});

nextQuestion.addEventListener("click", function () {
  if (questionIndex < 9) {
    questionIndex++;
    displayQuestions(questionIndex);
    window.localStorage.setItem("questionIndex", questionIndex);
  }
  updateButtonState();
});

function updateButtonState() {
  if (questionIndex == 0) {
    prevQuestion.classList.add("disable"); // Disable backward button
  } else {
    prevQuestion.classList.remove("disable");
  }

  if (questionIndex == 9) {
    nextQuestion.classList.add("disable"); // Disable forward button
    console.log("amr");
  } else {
    nextQuestion.classList.remove("disable");
  }
}
/**************************************************************************************************************************/
// localStorage.removeItem("questionFlags");
let questionFlags = new Set();
let questionChoicess = localStorage.getItem("questionFlags");
if (questionChoicess) {
  questionFlags = new Set(JSON.parse(questionChoicess));
}
showMarked(questionFlags);
$(".head div").click(function () {
  questionFlags.add(questionIndex);
  let questionArr = JSON.stringify(Array.from(questionFlags));
  localStorage.setItem("questionFlags", questionArr);
  if ($(".head div").hasClass("activeFlag")) {
    $(".head div").removeClass("activeFlag");
    $(".markedQuestion div").remove();
    questionFlags.delete(questionIndex);
    let questionArr = JSON.stringify(Array.from(questionFlags));
    localStorage.setItem("questionFlags", questionArr);
  } else {
    $(".head div").addClass("activeFlag");
  }
  showMarked(questionFlags);
});

function showMarked(questionFlags) {
  $(".marked").remove();
  questionFlags.forEach((element) => {
    $(".markedQuestion").append(`<div
                class="marked d-flex align-items-center justify-content-between m-2 ps-2 pe-2 p-1"
              >
                <p class="mt-2">Question Q${element + 1}</p>
                <div name="${
                  element + 1
                }" ><i class="fa-solid fa-trash"></i></div>
              </div>`);
    // class="marked d-flex align-items-center justify-content-between m-2 ps-2 pe-2 p-1"
    // >
    // <p class="mt-2">Question Q${element + 1}</p>
    // <div name="${element + 1}" ><i class="fa-solid fa-trash"></i></div>
    // </div>`);
  });
}
/**************************************************************************************************************************/
//عندكو هنا مشكله في ال current و ال question index >> مش عارف احط انهي واحد ف الاتنين ف ال local storage hena
$(".markedQuestion").on("click", "div svg", function () {
  let currentIndex = Number($(this.parentElement).attr("name"));
  console.log(currentIndex);
  questionFlags.delete(currentIndex - 1);
  this.parentElement.parentElement.remove();
  let questionArr = JSON.stringify(Array.from(questionFlags));
  localStorage.setItem("questionFlags", questionArr);
  $(".head div").removeClass("activeFlag");
});

$(".markedQuestion").on("click", ".marked", function (e) {
  console.log(this);
  if ($(e.target).closest("svg").length) {
    return;
  }
  if (this != this.children[1].children[0]) {
    let currentIndex = Number($(this.children[1]).attr("name"));
    questionIndex = currentIndex - 1;
    displayQuestions(questionIndex);
    window.localStorage.setItem("questionIndex", questionIndex);
  }
});

/******************************************************************************************************************* */

let chooseAnswer = document.getElementsByClassName("choices")[0];
let prev = null;
let currentChoice = null;

chooseAnswer.addEventListener("click", function (e) {
  console.log(questionIndex);
  if (this !== e.target) {
    removeActiv();
    e.target.classList.add("active");
  }
  localStorage.setItem(questionIndex, e.target.getAttribute("name"));
  currentQuestions[questionIndex].chosen_answer = e.target.innerText;
  localStorage.setItem("QuestionsArr", JSON.stringify(currentQuestions));
});

///////////////////////////////////////////////////////////////////////////////////////////
let result = 0;
$("#submit").click(() => {
  console.log("Amr");
  currentQuestions.forEach((element) => {
    if (element.chosen_answer == element.right_answer) {
      result++;
    }
  });
  localStorage.setItem("result", result);
  clearAllLocalStorage();
  if (result >= 6) {
    navigateTo("../Success.html"); // navigate her to result screens (pass)
  } else {
    navigateTo("../Fail.html"); // navigate her to result screens (pass)
  }
});

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
function clearAnswerQuestionsLocaleStoarge() {
  for (let i = 0; i < 10; i++) {
    localStorage.removeItem(i);
  }
}
function clearTimeLocaleStoarge() {
  localStorage.removeItem("FinishTime");
}

function clearQuestionsArrayLocaleStoarge() {
  localStorage.removeItem("QuestionsArr");
}
function clearQuestionsFlagLocaleStoarge() {
  localStorage.removeItem("questionFlags");
}
function clearQuestionsIndexLocaleStoarge() {
  localStorage.removeItem("questionIndex");
}

function removeActiv() {
  chooseA.classList.remove("active");
  chooseB.classList.remove("active");
  chooseC.classList.remove("active");
  chooseD.classList.remove("active");
}
///////////////////////////////////////////////////////////////////////////////////////////
// clearLocaleStoarge();
///////////////////////////////////////////////////////////////////////////////////////////
function clearAllLocalStorage() {
  clearAnswerQuestionsLocaleStoarge();
  clearTimeLocaleStoarge();
  clearQuestionsArrayLocaleStoarge();
  clearQuestionsFlagLocaleStoarge();
  clearQuestionsIndexLocaleStoarge();
}
function navigateTo(screen) {
  location.replace(screen);
}

///////////////////////////////////////////////////////////////////////////////////////////
