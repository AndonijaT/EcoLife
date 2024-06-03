// src/components/Question.tsx
import React from 'react';
import './Question.css';

interface QuestionProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Question: React.FC<QuestionProps> = ({
  title,
  subtitle,
  imageSrc,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  onNext,
  onPrevious
}) => {
  return (
    <div className="question-container">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <img src={imageSrc} alt={title} className="question-image" />
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-slider"
      />
      <p>{value} {unit}</p>
      <div className="navigation-buttons">
        <button onClick={onPrevious}>&lt;</button>
        <button onClick={onNext}>&gt;</button>
      </div>
    </div>
  );
};

export default Question;
