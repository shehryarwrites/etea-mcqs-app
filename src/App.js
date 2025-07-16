import { useState, useEffect } from "react";

const allMcqs = [
  {
    subject: "Pedagogy",
    question: "Pedagogy is the study of ____?",
    options: ["Education", "Teaching Methods", "Learning Process", "Guiding Students"],
    answer: 1
  },
  {
    subject: "English",
    question: "What is the plural form of 'mouse'?",
    options: ["Mouses", "Mices", "Mousees", "Mice"],
    answer: 3
  },
  {
    subject: "English",
    question: "Which sentence is grammatically correct?",
    options: ["She have a book.", "She has a book.", "She haves a book.", "She having a book."],
    answer: 1
  },
  {
    subject: "Islamiyat",
    question: "The first revelation was revealed in which cave?",
    options: ["Hira", "Saur", "Uhud", "Badar"],
    answer: 0
  }
];

export default function App() {
  const [subject, setSubject] = useState("All");
  const [mcqs, setMcqs] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    let filtered = subject === "All" ? allMcqs : allMcqs.filter(m => m.subject === subject);
    filtered = [...filtered].sort(() => Math.random() - 0.5);
    setMcqs(filtered);
    setCurrent(0);
    setSelected(null);
    setScore(0);
  }, [subject]);

  if (!mcqs.length) return <p>Loading questions...</p>;

  const mcq = mcqs[current];

  const handleSelect = (index) => {
    setSelected(index);
    if (index === mcq.answer) setScore(score + 1);
  };

  const next = () => {
    setSelected(null);
    if (current + 1 < mcqs.length) setCurrent(current + 1);
    else alert("Quiz complete! Final score: " + score + "/" + mcqs.length);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
  };

  const bookmark = () => {
    if (!bookmarks.includes(current)) setBookmarks([...bookmarks, current]);
  };

  return (
    <div className="container">
      <h1>ETEA MCQs Quiz</h1>

      <div className="top-bar">
        <label>Choose Subject: </label>
        <select onChange={(e) => setSubject(e.target.value)} value={subject}>
          <option>All</option>
          <option>Pedagogy</option>
          <option>English</option>
          <option>Islamiyat</option>
        </select>
        <span>Score: {score}</span>
      </div>

      <div className="card">
        <h3>{current + 1}. {mcq.question}</h3>
        <ul className="options">
          {mcq.options.map((opt, i) => (
            <li key={i} onClick={() => handleSelect(i)}
              className={
                selected === null ? "option" :
                i === mcq.answer ? "option correct" :
                i === selected ? "option incorrect" : "option"
              }>
              {opt}
            </li>
          ))}
        </ul>

        <div className="actions">
          <button onClick={bookmark}>🔖 Bookmark</button>
          <button onClick={next} disabled={selected === null}>Next</button>
          <button onClick={restart}>Restart</button>
        </div>
      </div>

      {bookmarks.length > 0 && (
        <div className="bookmarked">
          <h4>🔖 Bookmarked Questions:</h4>
          <ul>
            {bookmarks.map((b, i) => (
              <li key={i}>{mcqs[b]?.question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}