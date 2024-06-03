// src/components/Quiz.tsx
import React, { useState } from 'react';
import './Quiz.css';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([0, 0, 0, 0, 0]); // Initial values for 5 questions

  const questions = [
    {
      title: "How far do you travel by car or motorcycle each week?",
      subtitle: "As a driver or passenger",
      imageSrc: "/assets/car.png",
      min: 0,
      max: 500,
      step: 10,
      unit: "kms"
    },
    {
      title: "What is the average fuel economy of the vehicles you use most often?",
      subtitle: "",
      imageSrc: "/assets/fuel.png",
      min: 0,
      max: 20,
      step: 1,
      unit: "liters/100 kms"
    },
    // Add more questions as needed
  ];

  const handleValueChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestion].title}</h2>
      <p>{questions[currentQuestion].subtitle}</p>
      <img src={questions[currentQuestion].imageSrc} alt={questions[currentQuestion].title} className="question-image" />
      <input
        type="range"
        value={answers[currentQuestion]}
        min={questions[currentQuestion].min}
        max={questions[currentQuestion].max}
        step={questions[currentQuestion].step}
        onChange={(e) => handleValueChange(currentQuestion, Number(e.target.value))}
        className="range-slider"
      />
      <p>{answers[currentQuestion]} {questions[currentQuestion].unit}</p>
      <div className="navigation-buttons">
        <button onClick={handlePrevious}>&lt;</button>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Quiz;
