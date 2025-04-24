document.addEventListener("DOMContentLoaded", () => {
  const startbtn = document.getElementById("start-btn");
  const restartbtn = document.getElementById("restart-btn");
  const scoredisplay = document.getElementById("score");
  const resultcontainer = document.getElementById("result-container");
  const nextbtn = document.getElementById("next-btn");
  const choicelist = document.getElementById("choices-list");
  const questiontext = document.getElementById("question-text");
  const questioncontainer = document.getElementById("question-container");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentquestionindex = 0;
  let score = 0;

  startbtn.addEventListener("click", startquiz);
  nextbtn.addEventListener("click", nextquestion);
  restartbtn.addEventListener("click", restartquiz);

  function startquiz() {
    startbtn.classList.add("hidden");
    resultcontainer.classList.add("hidden");
    questioncontainer.classList.remove("hidden");
    score = 0;
    currentquestionindex = 0;
    showquestion();
  }

  function showquestion() {
    nextbtn.classList.add("hidden");
    questiontext.textContent = questions[currentquestionindex].question;
    choicelist.innerHTML = ""; // Clear previous choices

    questions[currentquestionindex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("choice-item"); // Add class for styling
      li.addEventListener("click", () => selectanswer(li, choice));
      choicelist.appendChild(li);
    });
  }

  function selectanswer(selectedLi, choice) {
    const correctanswer = questions[currentquestionindex].answer;

    // Remove selection from other choices
    document.querySelectorAll(".choice-item").forEach((li) => {
      li.classList.remove("correct", "incorrect");
      li.style.pointerEvents = "none"; // Disable further selection
    });

    if (choice === correctanswer) {
      selectedLi.classList.add("correct");
      score++;
    } else {
      selectedLi.classList.add("incorrect");
    }

    nextbtn.classList.remove("hidden");
  }

  function nextquestion() {
    currentquestionindex++;
    if (currentquestionindex < questions.length) {
      showquestion();
    } else {
      showresult();
    }
  }

  function showresult() {
    questioncontainer.classList.add("hidden");
    resultcontainer.classList.remove("hidden");
    scoredisplay.textContent = `Score: ${score} out of ${questions.length}`;
  }

  function restartquiz() {
    score = 0;
    currentquestionindex = 0;
    resultcontainer.classList.add("hidden");
    startquiz();
  }
});
