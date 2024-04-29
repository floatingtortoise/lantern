import React, { useContext, useEffect, useState } from "react";
import DataContext from '../contexts/DataContext'; // Ensure this path is correct
import Link from "next/link";

function QuizPage() {
  interface Quiz {
    question: string;
    choices: string[];
  }

  const [question, setQuestion] = React.useState("loading");
  const [choices, setChoices] = React.useState<string[]>([]);
  const [quizCounter, setQuizCounter] = useState(0);
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  function parseQuizQuestions(data: any): Quiz[] {
    const parsedQuizList: Quiz[] = [];
    if (data && data["quiz_question(s)"]) {
      const quizQuestions = data["quiz_question(s)"].trim();
      const questionBlocks = quizQuestions.split("\n");
      questionBlocks.forEach((block: string) => {
        const [questionText, choicesText] = block.replace("{", "").replace("}", "").split(", [");
        // Extract the question (remove leading/trailing whitespace)
        const this_question = questionText.trim();
        // Extract choices and remove square brackets and extra whitespace
        const this_choices = choicesText ? choicesText.replace("]", "").split(",").map(choice => choice.trim()) : [];
        parsedQuizList.push({
          question: this_question,
          choices: this_choices
        });
      });
    }
    return parsedQuizList;
  }

  const { data } = useContext(DataContext);
  useEffect(() => {
    if (data) {
      const quizData = parseQuizQuestions(data);
      setQuizList(quizData);
      if (quizData.length > 0) {
        setQuestion(quizData[0].question);
        setChoices(quizData[0].choices);
      } else {
        setQuestion("No data available");
        setChoices([]);
      }
    }
  }, [data]);

  const handleAnswerClick = (answerId: string) => {
    setSelectedAnswers([answerId]);
    setIsSubmitted(false);
    console.log("Answer clicked:", answerId);
  };

  const handleSubmit = () => {
    setIsCorrect(selectedAnswers[0] === "answer1");
    console.log("Correct Answer:", "answer1", "Selected Answer:", selectedAnswers[0]);
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    if (quizCounter < quizList.length - 1) {
      setQuizCounter(prevCounter => prevCounter + 1);
      setQuestion(quizList[quizCounter + 1].question);
      setChoices(quizList[quizCounter + 1].choices);
      setIsCorrect(false);
      setIsSubmitted(false);
      setSelectedAnswers([]);
    } else {
      setQuestion("No more questions!");
      setChoices([]);
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
        <span>Question {quizCounter+1}</span>
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
          {choices.map((choice, index) => (
            <button
              key={`answer${index + 1}`}
              id={`answer${index + 1}`}
              className={`quiz-answer ${selectedAnswers.includes(`answer${index + 1}`) ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(`answer${index + 1}`)}
            >
              {choice}
              {isSubmitted && selectedAnswers.includes(`answer${index + 1}`) && (
                isCorrect ? 
                <span style={{ marginLeft: '20px', color: 'green' }}>✔️ Correct!</span> :
                <span style={{ marginLeft: '20px', color: 'red' }}>❌ Wrong!</span>
              )}
            </button>
          ))}
        </div>
        {!isSubmitted ? (
          <button className="check-button-outer" id="check-button" onClick={handleSubmit}>
            <span className="check-button">Submit</span>
          </button>
        ) : (
          <button className="check-button-outer" id="check-button" onClick={handleContinue}>
            <span className="check-button">Continue</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizPage