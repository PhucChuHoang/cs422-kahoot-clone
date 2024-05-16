import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

const QuizAddForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '']);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAnswerChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAnswers = [...answers];
      newAnswers[index] = e.target.value;
      setAnswers(newAnswers);
    };

  const handleAddAnswer = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnswers([...answers, '']);
  };

  const handleDeleteAnswer = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const newAnswers = [...answers];
    newAnswers.splice(index, 1);
    setAnswers(newAnswers);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the question and answers
    if (!question || answers.some((answer) => !answer)) {
      alert('Please fill out all fields.');
      return;
    }

    // Submit the question and answers
    // This could involve calling an API, updating the state, etc.
    console.log('Question:', question);
    console.log('Answers:', answers);

    // Clear the form
    setQuestion('');
    setAnswers(['', '', '', '']);
  };

  return (
    <form onSubmit={handleSubmitQuestion}>
      <Input
        value={question}
        onChange={handleQuestionChange}
        placeholder="Question"
      />
      {answers.map((answer, index) => (
        <div key={index} className="mb-2 mt-2 flex items-center">
          <Input
            value={answer}
            onChange={handleAnswerChange(index)}
            placeholder={`Answer ${index + 1}`}
          />
          <Button onClick={handleDeleteAnswer(index)}>Delete</Button>
        </div>
      ))}
      <div className="button-quiz-form-container flex flex-col items-center ">
        <Button onClick={handleAddAnswer}>Add Answer</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default QuizAddForm;
