"use client";
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react';

const Homepage = () => {

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

        <button className="view-notes-outer">
          <span className="view-notes">View Notes</span>
        </button>

        {/* <div className='quiz'>
          <span className="quiz-question">What are examples of cleaning and transforming data?</span>
          <div className="quiz-answers">
            <button className="quiz-answer" id="answer1">Removing missing values, converting data types</button>
            <button className="quiz-answer" id="answer2">Creating new columns, filtering data</button>
            <button className="quiz-answer" id="answer3">All of the above</button>
            <button className="quiz-answer" id="answer4">None of the above</button>
          </div>
          <button className="check-button-outer">
            <span className="check-button">Check Answer</span>
          </button>
        </div> */}

        <div className='quiz'>
          <span className="quiz-question">What are examples of cleaning and transforming data?</span>
          <div className="quiz-answers">
            <button className={`quiz-answer ${selectedAnswers.includes('answer1') ? 'selected' : ''}`} id="answer1" onClick={() => handleAnswerClick('answer1')}>Removing missing values, converting data types</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer2') ? 'selected' : ''}`} id="answer2" onClick={() => handleAnswerClick('answer2')}>Creating new columns, filtering data</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer3') ? 'selected' : ''}`} id="answer3" onClick={() => handleAnswerClick('answer3')}>All of the above</button>
            <button className={`quiz-answer ${selectedAnswers.includes('answer4') ? 'selected' : ''}`} id="answer4" onClick={() => handleAnswerClick('answer4')}>None of the above</button>
            
          </div>
          <button className="check-button-outer">
            <span className="check-button">Check Answer</span>
          </button>
        </div>

    </div>
  )
}


export default Homepage;