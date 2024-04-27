// Dashboard.tsx
import React from "react";
import Link from "next/link";
import Upload from "./upload";

const Dashboard = () => {
  const cards = [
    {
      title: "lesson 1: a matter of science",
      lastOpened: "02/01/2024",
    },
    { title: "multiplication", lastOpened: "12/11/2023" },
    { title: "vocabulary 1", lastOpened: "01/01/2022" },
    { title: "vocabulary 2", lastOpened: "01/01/2023" },
  ];
  return (
    <div style={styles.container}>
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
      <span>
        <input style={styles.studyWhat} placeholder="What do you want to study?"></input>
        <button style={styles.uploadButton}>Submit</button>
        <Upload  />
      </span>
      <div style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <Link href="/" key={index}>
            <div key={index} style={styles.card}>
              <div style={styles.cardHeader}>
                <span
                  style={{ ...styles.cardCircle, backgroundColor: "#FF605C" }}
                ></span>
                <span
                  style={{ ...styles.cardCircle, backgroundColor: "#FFBD44" }}
                ></span>
                <span
                  style={{ ...styles.cardCircle, backgroundColor: "#00CA4E" }}
                ></span>
              </div>
              <div style={styles.cardBody}>
                <h2 style={styles.cardTitle}>{card.title}</h2>
                <p style={styles.cardText}>last opened: {card.lastOpened}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// You can extract the styles into a separate CSS file or use a CSS-in-JS library
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#FBF6EF", // A light beige background similar to the image
    height: "100vh",
    boxSizing: "border-box",
    padding: "20px",
    paddingLeft: 300,
    paddingTop: 130,
  },
  uploadButton: {
    backgroundColor: "#D9534F", // A deep red color
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  card: {
    backgroundColor: "#E9E7DA", // A pale green background for the card, similar to the image
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "300px", // Adjusted to better reflect the image
    padding: "20px",
    boxSizing: "border-box",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "start",
    gap: "8px",
    marginBottom: "20px",
  },
  cardCircle: {
    height: "12px",
    width: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
  cardBody: {
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.2rem", // Slightly larger font for the title
    fontWeight: "bold",
    margin: "0 0 10px 0",
    color: "#333333", // A dark gray for better contrast
  },
  cardText: {
    fontSize: "0.9rem", // Smaller font for the subtitle
    color: "#555555", // Lighter than the title for contrast
    margin: 0,
  },
  studyWhat:{
    width: 230,
    height: 43,
    marginRight: 10,
    border: "1px solid #D9534F",
    borderRadius: 4,
    paddingLeft: 10,
  }
};

export default Dashboard;
