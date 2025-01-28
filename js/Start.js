
$(".startBtn").click(function () {
  console.log("amr");

  location.replace("../Exam.html");
});

let currentQuestions;
let questionIndex = 0;


window.addEventListener("load", function () {
  if (this.localStorage.getItem("QuestionsArr")) {
    currentQuestions = JSON.parse(this.localStorage.getItem("QuestionsArr"));
  } else {
    getQuestions();
  }
});

async function getQuestions() {
  // Initialize status
  let status = "loading"; // Function starts with a "loading" status
  console.log("Status:", status);

  try {
    // Fetch the questions
    let questionsResponse = await fetch("../Data/question.json");
    console.log(questionsResponse);

    // Check if the response is okay
    if (!questionsResponse.ok) {
      // location.replace("")//navigate to error screen
    }

    // Parse JSON data
    let questionsArr = await questionsResponse.json();
    // Check if the array is empty
    if (questionsArr.length === 0) {
      // location.replace("")//navigate to error screen
      status = "empty"; // No questions found
      console.log("Status:", status);
    } else {
      // If data is available, update status
      status = "success";
      console.log("Status:", status);
      currentQuestions = [...getTenRundomQuestions(questionsArr)];
      console.log(currentQuestions);
    }
  } catch (error) {
    // Update status on error
    status = "error";
    // location.replace("")//navigate to error screen
    console.error("Status:", status, "| Error Message:", error.message);
  }
}

function getTenRundomQuestions(arr) {
  let randomArray = new Set();
  do {
    let randomNumber = Math.floor(Math.random() * 19);
    randomArray.add(arr[randomNumber]);
  } while (randomArray.size < 10);
  return randomArray;
}

$(".start").click(function () {
  window.localStorage.setItem("QuestionsArr", JSON.stringify(currentQuestions));
  window.localStorage.setItem("questionIndex", 0);
  location.replace("../Exam.html");
});
