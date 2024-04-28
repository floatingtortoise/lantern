import React, { useEffect, useState } from "react";
import Link from "next/link";

function QuizPage() {
  //declare the Quiz interface
  interface Quiz {
    question: string;
    choices: string[];
  }

  // initialize welcome message as "loading"
  const [question, setQuestion] = React.useState("loading");
  //const [choices, setChoices] = React.useState([]);
  const [choices, setChoices] = React.useState<string[]>([]);
   // Initialize global quiz question counter
   let quizCounter = 0;
   // State for quizList
   const [quizList, setQuizList] = useState<Quiz[]>([]);
  //let quizList: Quiz[] = [];

  function parseQuizQuestions(inputText: string) {
    const parsedQuizList: Quiz[] = [];

    const data = JSON.parse(inputText);
    const quizQuestions = data["quiz_question(s)"];
    const questionBlocks = quizQuestions.trim().split("\n");

    questionBlocks.forEach((block: string) => {
      const [questionText, choicesText] = block.replace("{", "").replace("}", "").split(", [");
      // Extract the question (remove leading/trailing whitespace)
      const this_question = questionText.trim();
      // Extract choices and remove square brackets and extra whitespace
      const this_choices = choicesText ? choicesText.replace("]", "").split(","):[];
      parsedQuizList.push({
        question: this_question,
        choices: this_choices
      });
    });

    return parsedQuizList;
  }
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://localhost:8080/quiz/create_quiz')
        .then(response => response.json())
        .then((data) => {
          const jsonString = JSON.stringify(data);
          const thisList = parseQuizQuestions(jsonString);
          setQuizList(thisList);
          console.log(thisList);
          setQuestion(thisList[quizCounter].question);
          setChoices(thisList[quizCounter].choices);
        })
        .catch((error) => {
          console.error("Error:", error);
          setQuestion("Select all that are true about molecules");
          setChoices([
            "Molecules make up matter.",
            "Molecules are compounds.",
            "Molecules are made of atoms.",
            "All of the above",
          ]);
        });
    }
  }, []);
  

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswerClick = (answerId: string) => {
    if (selectedAnswers.includes(answerId)) {
      // If the clicked answer is already selected, deselect it
      setSelectedAnswers(selectedAnswers.filter((id) => id !== answerId));
    } else {
      // Otherwise, select the clicked answer
      setSelectedAnswers([...selectedAnswers, answerId]);
    }
  };

  const handleSubmit = (quizList: Quiz[]) => {
    // setQuestion("Question 2");
    // setChoices(["hey", "hi", "hello", "hola"]);
    quizCounter++;
    console.log(quizCounter);
    setQuestion(quizList[quizCounter].question);
    setChoices(quizList[quizCounter].choices);
    (
      document.getElementById("feedback-correct") as HTMLInputElement
    ).style.display = "none";
    (
      document.getElementById("feedback-wrong") as HTMLInputElement
    ).style.display = "none";
    (
      document.getElementById("check-button") as HTMLInputElement
    ).style.display = "block";
    (
      document.getElementById("submit-button") as HTMLInputElement
    ).style.display = "none";
    selectedAnswers.length = 0;
  };

  const handleCheck = (correctId: string) => {
    if (selectedAnswers.includes(correctId)) {
      (
        document.getElementById("feedback-correct") as HTMLInputElement
      ).style.display = "block";
      (
        document.getElementById("check-button") as HTMLInputElement
      ).style.display = "none";
      (
        document.getElementById("submit-button") as HTMLInputElement
      ).style.display = "block";
    } else {
      (
        document.getElementById("feedback-wrong") as HTMLInputElement
      ).style.display = "block";
    }
  };

  return (

    <div className="container">

      <span
        className="left-column"
      />
       <Link href="/dashboard" className="button" id="left1">
        <span>Dashboard</span>
      </Link>

      <Link href="/settings1" className="button" id="left2">
        <span>Settings</span>
      </Link>

      <Link href="/settings2" className="button" id="left3">
        <span>Community</span>
      </Link>

      <span className="home-text">Lantern AI</span>

      <span className="lesson-name">
        <span>Lesson 1 - A Matter of Science</span>
      </span>

      <span id="feedback-correct">
        <p>
          Nice! Molecules make up matter and are always made of one or more
          atoms.
        </p>
      </span>

      <span id="feedback-wrong">
        <p>
          Molecules make up compounds, but that does not mean they are them.
        </p>
      </span>

      <button className="view-notes-outer">
        <span className="view-notes">View Notes</span>
      </button>

      <div className='quiz'>
        <span className="quiz-question">{question}</span>
        <div className="quiz-answers">
          <button className={`quiz-answer ${selectedAnswers.includes('answer1') ? 'selected' : ''}`} id="answer1" onClick={() => handleAnswerClick('answer1')}>{choices[0]}</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer2') ? 'selected' : ''}`} id="answer2" onClick={() => handleAnswerClick('answer2')}>{choices[1]}</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer3') ? 'selected' : ''}`} id="answer3" onClick={() => handleAnswerClick('answer3')}>{choices[2]}</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer4') ? 'selected' : ''}`} id="answer4" onClick={() => handleAnswerClick('answer4')}>{choices[3]}</button>
        </div>

        <button
          className="check-button-outer"
          id="check-button"
          onClick={() => handleCheck("answer3")}
        >
          <span className="check-button">Check Answer</span>
        </button>
        <button
          className="check-button-outer"
          id="submit-button"
          onClick={() => handleSubmit(quizList)}
        >
          <span className="check-button">Submit</span>
        </button>

      </div>

    </div>
  )
}

export default QuizPage