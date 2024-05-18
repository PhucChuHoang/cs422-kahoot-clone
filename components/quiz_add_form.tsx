import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { addQuestion, useAppSelector } from '@/lib';
import { useDispatch } from 'react-redux';

const QuizAddForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '']);
  const currentQuizDisplay = useAppSelector(
    (state) => state.data.currentQuizDisplay,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setQuestion(currentQuizDisplay?.question || '');
    setAnswers(currentQuizDisplay?.answers || ['', '']);
  }, [currentQuizDisplay]);

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

  const handleDeleteQuiz = () => (e: React.MouseEvent) => {
    // TODO
    e.preventDefault();
    // Delete the quiz
    // This could involve calling an API, updating the state, etc.
    // dispatch(deleteQuiz(index));
  };

  const handleUpdateQuiz = () => (e: React.MouseEvent) => {
    // TODO
    e.preventDefault();
    // Update the quiz
    // This could involve calling an API, updating the state, etc.
    // dispatch(updateQuiz(index, { question, answers }));
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
    dispatch(addQuestion({ question, answers }));

    // Clear the form
    setQuestion('');
    setAnswers(['', '']);
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
        {currentQuizDisplay ? (
          <div className="mt-4">
            <Button onClick={handleUpdateQuiz()}>Save</Button>
            <Button onClick={handleDeleteQuiz()}>Delete Question</Button>
          </div>
        ) : (
          <Button type="submit" className="mt-4">
            Save
          </Button>
        )}
      </div>
    </form>
  );
};

export default QuizAddForm;
