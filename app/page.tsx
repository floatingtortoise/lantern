import Image from 'next/image'
import Link from 'next/link';

const Homepage = () => {

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

        <div className='quiz'>
            <span className="quiz-question">What are examples of cleaning and transforming data?</span>
          <button className="next-button-outer">
            <span className="next-button">Next</span>
          </button>
        </div>
    </div>
  )
}


export default Homepage;