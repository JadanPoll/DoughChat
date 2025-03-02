import React, { useState } from "react";

const questionnaireData = [
  {
    id: "q1",
    question: "1. How many credit cards do you have?",
    options: [
      { text: "I have never had a credit card", value: "none" },
      { text: "1", value: "1" },
      { text: "2 to 4", value: "2-4" },
      { text: "5 or more", value: "5+" },
    ],
  },
  {
    id: "q1a",
    question: "1a. How long ago did you get your first credit card?",
    options: [
      { text: "Less than 6 months ago", value: "<6m" },
      { text: "Between 6 months and 2 years ago", value: "6m-2y" },
      { text: "2 to 4 years ago", value: "2-4y" },
      { text: "4 to 5 years ago", value: "4-5y" },
      { text: "5 to 8 years ago", value: "5-8y" },
      { text: "8 to 10 years ago", value: "8-10y" },
      { text: "10 to 15 years ago", value: "10-15y" },
      { text: "15 to 20 years ago", value: "15-20y" },
      { text: "More than 20 years ago", value: "20y+" },
    ],
  },
  {
    id: "q2",
    question:
      "2. How long ago did you get your first loan? (i.e., auto loan, mortgage, student loan, etc.)",
    options: [
      { text: "I have never had a loan", value: "none" },
      { text: "Less than 6 months ago", value: "<6m" },
      { text: "Between 6 months and 2 years ago", value: "6m-2y" },
      { text: "2 to 5 years ago", value: "2-5y" },
      { text: "5 to 10 years ago", value: "5-10y" },
      { text: "10 to 15 years ago", value: "10-15y" },
      { text: "15 to 20 years ago", value: "15-20y" },
      { text: "More than 20 years ago", value: "20y+" },
    ],
  },
];

const Questionnaire = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});

  const handleAnswer = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));

    if (currentQuestionIndex + 1 < questionnaireData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(responses);
    }
  };

  const question = questionnaireData[currentQuestionIndex];

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>{question.question}</h2>
      {question.options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleAnswer(question.id, option.value)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            margin: "8px 0",
            padding: "10px",
            border: "1px solid #007BFF",
            backgroundColor: "#FFF",
            color: "#007BFF",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Questionnaire;
