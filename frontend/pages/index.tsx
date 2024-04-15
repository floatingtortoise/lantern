import React, { useEffect, useState } from "react";
import Link from "next/link";

function quizPage() {
  // initialize welcome message as "loading"
  const [question, setQuestion] = useState("loading");
  const [choices, setChoices] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:8080/api/home')
  //     .then(response => response.json())
  //     // set variables to the response from the server
  //     .then((data) => {
  //       // put backend data into frontend
  //       // console.log(data)
  //       // console.log(data.question)
  //       // console.log(data.choices)
  //       setQuestion(data.question);
  //       setChoices(data.choices);
  //     })
  // }, [])

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

  const handleCheck = (correctId: string) => {
    if (selectedAnswers.includes(correctId)) {
      (
        document.getElementById("feedback-correct") as HTMLInputElement
      ).style.display = "block";
      // (document.getElementById("feedback-wrong") as HTMLInputElement).style.display = "none";
    } else {
      (
        document.getElementById("feedback-wrong") as HTMLInputElement
      ).style.display = "block";
      // (document.getElementById("feedback-correct") as HTMLInputElement).style.display = "none";
    }
  };

  return (
    <div className="container">
      <span className="left-column" />
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
        {/* <br></br>
        <p>What is a compound?</p>
        <input className="feedback-input" placeholder="Type here"></input> */}
      </span>

      <button className="view-notes-outer">
        <span className="view-notes">View Notes</span>
      </button>

      <div className="quiz">
        <span className="quiz-question">{question}</span>
        <div className="quiz-answers">
          <button
            className={`quiz-answer ${
              selectedAnswers.includes("answer1") ? "selected" : ""
            }`}
            id="answer1"
            onClick={() => handleAnswerClick("answer1")}
          >
            {choices[0]}
          </button>
          <button
            className={`quiz-answer ${
              selectedAnswers.includes("answer2") ? "selected" : ""
            }`}
            id="answer2"
            onClick={() => handleAnswerClick("answer2")}
          >
            {choices[1]}
          </button>
          <button
            className={`quiz-answer ${
              selectedAnswers.includes("answer3") ? "selected" : ""
            }`}
            id="answer3"
            onClick={() => handleAnswerClick("answer3")}
          >
            {choices[2]}
          </button>
          <button
            className={`quiz-answer ${
              selectedAnswers.includes("answer4") ? "selected" : ""
            }`}
            id="answer4"
            onClick={() => handleAnswerClick("answer4")}
          >
            {choices[3]}
          </button>
        </div>
        <button
          className="check-button-outer"
          onClick={() => handleCheck("answer4")}
        >
          <span className="check-button">Check Answer</span>
        </button>
      </div>
    </div>
  );
}

export default quizPage;
