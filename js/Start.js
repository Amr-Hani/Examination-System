$(".start").click(function () {
  location.replace("../Exam.html");
});

window.addEventListener("load", function () {
  getQuestions();
  let questionIndex = 0;
  this.window.localStorage.setItem("questionIndex", 0);
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
      throw new Error(
        "Failed to fetch questions. HTTP status: " + questionsResponse.status
      );
    }

    // Parse JSON data
    let questionsArr = await questionsResponse.json();
    // Check if the array is empty
    if (questionsArr.length === 0) {
      status = "empty"; // No questions found
      console.log("Status:", status);
    } else {
      // If data is available, update status
      status = "success";
      console.log("Status:", status);

      currentQuestions = [...getTenRundomQuestions(questionsArr)];
      window.localStorage.setItem(
        "QuestionsArr",
        JSON.stringify(currentQuestions)
      );
      console.log(currentQuestions);
    }
  } catch (error) {
    // Update status on error
    status = "error";
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
