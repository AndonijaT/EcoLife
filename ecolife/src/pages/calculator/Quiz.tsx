// src/components/Quiz.tsx
import React, { useState } from 'react';
import './Quiz.css';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(12).fill(0)); // Initial values for 12 questions
  const [finalScore, setFinalScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const emojis = [
    '😢', // 1
    '😟', // 2
    '😞', // 3
    '😐', // 4
    '😕', // 5
    '🙂', // 6
    '😃', // 7
    '😁', // 8
    '😎', // 9
    '🤩', // 10
  ];
  
  const questions = [
    {
      id: 1,
      title: 'How far do you travel by car or motorcycle each week?',
      subtitle: '(as a driver or passenger)',
      imageSrc: '/assets/car.png',
      min: 0,
      max: 500,
      step: 10,
      unit: 'km',
      type: 'slider',
    },
    {
      id: 2,
      title: 'What is the average fuel economy of the vehicles you use most often?',
      subtitle: '',
      imageSrc: '/assets/fuel.png',
      min: 1,
      max: 20,
      step: 1,
      unit: 'liters / 100 km',
      type: 'slider',
    },
    {
      id: 3,
      title: 'How often do you eat animal-based products?',
      subtitle: '(beef, pork, chicken, fish, eggs, dairy products)',
      imageSrc: '/assets/food.png',
      min: 1,
      max: 7,
      step: 1,
      unit: '',
      type: 'slider',
    },
    {
      id: 4,
      title: 'How much of the food that you eat is unprocessed, unpackaged, or locally grown?',
      subtitle: '(less than 320 kilometers/200 miles away)',
      imageSrc: '/assets/food-local.png',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      type: 'slider',
    },
    {
      id: 5,
      title: 'Which housing type best describes your home?',
      subtitle: '',
      imageSrc: '/assets/housing.png',
      options: [
        'Freestanding, no running water',
        'Freestanding, running water',
        'Multi-storey apartment',
        'Duplex, row house or building with 2-4 housing units',
        'Luxury condominium',
      ],
      type: 'radio',
    },
    {
      id: 6,
      title: 'What material is your house constructed with?',
      subtitle: '',
      imageSrc: '/assets/material.png',
      options: [
        'Straw/bamboo',
        'Wood',
        'Brick/concrete',
        'Steel/other',
      ],
      type: 'radio',
    },
    {
      id: 7,
      title: 'How many people live in your household?',
      subtitle: '',
      imageSrc: '/assets/household.png',
      min: 1,
      max: 10,
      step: 1,
      unit: '',
      type: 'slider',
    },
    {
      id: 8,
      title: 'What is the size of your home?',
      subtitle: '',
      imageSrc: '/assets/house-size.png',
      min: 0,
      max: 300,
      step: 10,
      unit: 'sqm',
      type: 'slider',
    },
    {
      id: 9,
      title: 'Do you have electricity in your home?',
      subtitle: '',
      imageSrc: '/assets/electricity.png',
      options: [
        'yes',
        'no',
      ],
      type: 'radio',
    },
    {
      id: 10,
      title: 'How energy efficient is your home?',
      subtitle: '(modern appliances, climate controls)',
      imageSrc: '/assets/efficiency.png',
      min: 1,
      max: 10,
      step: 1,
      unit: '',
      type: 'slider',
    },
    {
      id: 11,
      title: 'What percentage of your home\'s electricity comes from renewable sources?',
      subtitle: '(either directly or through purchased green power)',
      imageSrc: '/assets/renewable.png',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      type: 'slider',
    },
    {
      id: 12,
      title: 'Compared to your neighbors, how much trash do you generate?',
      subtitle: '',
      imageSrc: '/assets/trash.png',
      min: 1,
      max: 10,
      step: 1,
      unit: '',
      type: 'slider',
    },
  ];

  const calculateScore = () => {
    let score = 0;
    questions.forEach(question => {
      const answer = answers[question.id - 1]; // Use index in the answers array
      switch (question.id) {
        case 1:
          // How far do you travel by car or motorcycle each week?
          if (answer <= 50) score += 10;
          else if (answer <= 100) score += 8;
          else if (answer <= 200) score += 6;
          else if (answer <= 300) score += 4;
          else score += 1;
          break;
        case 2:
          // What is the average fuel economy of the vehicles you use most often?
          if (answer < 7) score += 9;
          else if (answer <= 12) score += 5;
          else score += 1;
          break;
        case 3:
          // How often do you eat animal-based products?
          if (answer === 1) score += 10;
          else if (answer === 2) score += 9;
          else if (answer === 3) score += 8;
          else if (answer === 4) score += 7;
          else if (answer === 5) score += 6;
          else if (answer === 6) score += 5;
          else if (answer === 7) score += 4;
          break;
        case 4:
          // How much of the food that you eat is unprocessed, unpackaged, or locally grown?
          if (answer >= 80) score += 10;
          else if (answer >= 50) score += 8;
          else if (answer >= 30) score += 6;
          else score += 3;
          break;
        case 5:
          // Which housing type best describes your home?
          if (answer === 0) score += 10;
          else if (answer === 1) score += 10;
          else if (answer === 2) score += 8;
          else if (answer === 3) score += 7;
          else if (answer === 4) score += 5;
          break;
        case 6:
          // What material is your house constructed with?
          if (answer === 0) score += 10;
          else if (answer === 1) score += 10;
          else if (answer === 2) score += 5;
          else if (answer === 3) score += 1;
          break;
        case 7:
          // How many people live in your household?
          if (answer === 1) score += 2;
          else if (answer === 2) score += 5;
          else if (answer > 2) score += 10;
          break;
        case 8:
          // What is the size of your home?
          if (answer <= 20) score += 10;
          else if (answer <= 30) score += 9;
          else if (answer <= 50) score += 8;
          else if (answer <= 100) score += 7;
          else if (answer <= 200) score += 6;
          else score += 2;
          break;
        case 9:
          // Do you have electricity in your home?
          if (answer === 1) score += 10;
          else if (answer === 0) score += 5;
          break;
        case 10:
          // How energy efficient is your home?
          score += answer; // Directly use the answer as the score (assuming answer is between 1 and 10)
          break;
        case 11:
          // What percentage of your home's electricity comes from renewable sources?
          score += Math.floor(answer / 10); // Divide by 10 to get the score (0-10)
          break;
        case 12:
          // Compared to your neighbors, how much trash do you generate?
          if (answer === 1) score += 10;
          else if (answer === 2) score += 9;
          else if (answer === 3) score += 8;
          else if (answer === 4) score += 7;
          else if (answer === 5) score += 6;
          else if (answer === 6) score += 5;
          else if (answer === 7) score += 4;
          break;
        // Add other cases as needed
      }
    });
    setFinalScore(Math.round(score / questions.length));
    setShowSummary(true); // Show summary after calculating score
  };

  const handleValueChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore(); // Calculate score when reaching the end
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="quiz-container">
      {showSummary ? (
        <div className="summary">
          <h2>Summary</h2>
          <p>Your sustainability score is: {finalScore}</p>
          <p>{emojis[finalScore - 1]}</p>
        </div>
      ) : (
        <>
          <h2>{questions[currentQuestion]?.title}</h2>
          <p>{questions[currentQuestion]?.subtitle}</p>
          <img src={questions[currentQuestion]?.imageSrc} alt={questions[currentQuestion]?.title} className="question-image" />
          {questions[currentQuestion]?.options ? (
            <div className="options">
              {questions[currentQuestion]?.options?.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={index}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleValueChange(currentQuestion, index)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="range"
              value={answers[currentQuestion]}
              min={questions[currentQuestion]?.min}
              max={questions[currentQuestion]?.max}
              step={questions[currentQuestion]?.step}
              onChange={(e) => handleValueChange(currentQuestion, Number(e.target.value))}
              className="range-slider"
            />
          )}
          <p>
            {answers[currentQuestion]} {questions[currentQuestion]?.unit}
          </p>
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
        </>
      )}
    </div>
  );
};

export default Quiz;
