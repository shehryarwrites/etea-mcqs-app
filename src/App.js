import { useState } from "react";

const mcqs = [
  {
    question: "Pedagogy is the study of ____?",
    options: ["Education", "Teaching Methods", "Learning Process", "Guiding Students"],
    answer: 1,
    explanation: "Pedagogy specifically refers to the methods and practices of teaching."
  },
  {
    question: "What is the plural form of 'mouse'?",
    options: ["Mouses", "Mices", "Mousees", "Mice"],
    answer: 3,
    explanation: "The correct plural of 'mouse' is 'mice'."
  },
  {
    question: "Which sentence is grammatically correct?",
    options: ["She have a book.", "She has a book.", "She haves a book.", "She having a book."],
    answer: 1,
    explanation: "The correct sentence is 'She has a book' because 'has' agrees with third-person singular."
  }
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const mcq = mcqs[current];

  const handleOptionClick = (index) => {
    setSelected(index);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowExplanation(false);
    setCurrent((prev) => (prev + 1) % mcqs.length);
  };

  return (
    <div className="container">
      <h1>ETEA Teaching Cadre MCQs</h1>
      <div className="card">
        <h2>Question {current + 1} of {mcqs.length}</h2>
        <p className="question">{mcq.question}</p>
        <ul className="options">
          {mcq.options.map((opt, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`option ${
                selected !== null
                  ? index === mcq.answer
                    ? "correct"
                    : index === selected
                    ? "incorrect"
                    : ""
                  : ""
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
        {showExplanation && (
          <p className="explanation"><strong>Explanation:</strong> {mcq.explanation}</p>
        )}
        <button onClick={nextQuestion} disabled={selected === null} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
}