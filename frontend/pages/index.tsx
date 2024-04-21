import React, {useEffect, useState} from 'react'
import Link from 'next/link';

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
  //initialize global quiz question counter and quiz list
  let quizCounter = 0;
  let quizList:Quiz[]= [];

  function parseQuizQuestions(inputText: string) {
    const data = JSON.parse(inputText);
    const quizQuestions = data["quiz_question(s)"];
    const questionBlocks = quizQuestions.trim().split("\n\n");
    const quizList:Quiz[]= [];

    questionBlocks.forEach((block: string) => {
      const lines = block.split("\n").map(line => line.trim());
      const this_question = lines[0];
      const this_choices = [lines[2], lines[3], lines[4], lines[5]];
      quizList.push({
        question: this_question,
        choices: this_choices
      });
    });
    return quizList;
  }

  useEffect(() => {
    fetch('http://localhost:8080/quiz/create_quiz')
      .then(response => response.json())
      // set variables to the response from the server
      .then((data) => {
        const jsonString = JSON.stringify(data);
        quizList = parseQuizQuestions(jsonString);
        setQuestion(quizList[quizCounter].question);
        setChoices(quizList[quizCounter].choices);
      })
  }, [])

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

        <span
          className="left-column"
        />
        <Link href="/settings" className="button" id="left1">
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

        <div className='quiz'>
          <span className="quiz-question">{question}</span>
          <div className="quiz-answers">
            <button className={`quiz-answer ${selectedAnswers.includes('answer1') ? 'selected' : ''}`} id="answer1" onClick={() => handleAnswerClick('answer1')}>{choices[0]}</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer2') ? 'selected' : ''}`} id="answer2" onClick={() => handleAnswerClick('answer2')}>{choices[1]}</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer3') ? 'selected' : ''}`} id="answer3" onClick={() => handleAnswerClick('answer3')}>{choices[2]}</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer4') ? 'selected' : ''}`} id="answer4" onClick={() => handleAnswerClick('answer4')}>{choices[3]}</button>
          </div>

        <button className="check-button-outer" onClick={() => handleCheck("answer4")}>
            <span className="check-button">Check Answer</span>
        </button>

        </div>

    </div>
  )
}

export default QuizPage