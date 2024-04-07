import Image from 'next/image'
import Link from 'next/link';

const Homepage = () => {

  return (
    <div className="container">

      <div className="innercontainer">
        <img
          className="rectangle1"
        />
        <Link href="/settings" className="button" id="left1">
            <span>Dashboard</span>
        </Link>

        <Link href="/settings" className="button" id="left2">
            <span>Settings</span>
        </Link>

        <Link href="/settings1" className="button" id="left3">
            <span>Community</span>
        </Link>

        <div> <span className="text06">Lantern AI</span></div>

        <span className="text08">
          <span>Lesson 1 - A Matter of Science</span>
        </span>

        <div className="group8">
          <div className="group4">
            <img
              alt="Line11116"
              src="/external/line11116-0ep.svg"
              className="line1"
            />
            <img
              alt="Line21117"
              src="/external/line21117-96nd.svg"
              className="line2"
            />
          </div>
        </div>
        <img
          className="rectangle23"
        />
        <button className="text10">
          <span>View Notes</span>
        </button>

        <div
          className="rectangle24"
        />
        <div
          className="rectangle9"
        />
        <div
          className="rectangle25"
        />
        <span className="text12">
          <span>Next</span>
        </span>
        <span className="text16">
          <span>What are examples of cleaning and transforming data?</span>
        </span>
        <textarea className="text-entry" placeholder="Hello! Enter your answer here:)"></textarea>
      </div>
    </div>
  )
}


export default Homepage;