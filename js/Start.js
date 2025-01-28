let currentQuestions;
let questionIndex = 0;

window.addEventListener("load", function () {});

async function getQuestions() {
  console.log("amr");

  // Initialize status
  let status = "loading"; // Function starts with a "loading" status
  console.log("Status:", status);
  try {
    // Fetch the questions
    let questionsResponse = await fetch("../Data/question.json");
    console.log(questionsResponse);

    // Check if the response is okay
    if (!questionsResponse.ok) {
      location.replace("../ServerDown.html"); //navigate to error screen
    }

    // Parse JSON data
    let questionsArr = await questionsResponse.json();
    // Check if the array is empty
    if (questionsArr.length === 0) {
      location.replace("../ServerDown.html"); //navigate to error screen
      status = "empty"; // No questions found
      console.log("Status:", status);
    } else {
      status = "success";
      console.log("Status:", status);
      currentQuestions = [...getTenRundomQuestions(questionsArr)];
      window.localStorage.setItem(
        "QuestionsArr",
        JSON.stringify(currentQuestions)
      );
      window.localStorage.setItem("questionIndex", 0);
      location.replace("../Exam.html");
      console.log("amr");
    }
  } catch (error) {
    // Update status on error
    status = "error";
    location.replace("../ServerDown.html"); //navigate to error screen
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
$(".startBtn").click(function () {
  if (localStorage.getItem("QuestionsArr")) {
    currentQuestions = JSON.parse(localStorage.getItem("QuestionsArr"));
    console.log(currentQuestions);
    location.replace("../Exam.html");
  } else {
    getQuestions();
  }
});
