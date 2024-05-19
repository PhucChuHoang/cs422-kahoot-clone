import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import {
  useAppSelector,
  addQuestion,
  removeQuestion,
  setQuestions,
  setCurrentQuestionDisplay,
} from '@/lib';
import { useDispatch } from 'react-redux';

const QuizAddForm: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    text: '',
    options: [
      { text: '', is_correct: true },
      { text: '', is_correct: false },
    ],
  });

  const currentQuestionDisplay = useAppSelector(
    (state) => state.data.currentQuestionDisplay,
  );
  const currentQuestions = useAppSelector(
    (state) => state.data.currentQuestions,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentQuestionDisplay) {
      setCurrentQuestion(currentQuestionDisplay);
    } else {
      setCurrentQuestion({
        text: '',
        options: [
          { text: '', is_correct: true },
          { text: '', is_correct: false },
        ],
      });
    }
  }, [currentQuestionDisplay]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const handleAnswerChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newOptions = currentQuestion.options.map((option, i) =>
        i === index ? { ...option, text: e.target.value } : option,
      );
      setCurrentQuestion((prev) => ({
        ...prev,
        options: newOptions,
      }));
    };

  const handleAddAnswer = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentQuestion.options.length < 4) {
      setCurrentQuestion((prev) => ({
        ...prev,
        options: [...prev.options, { text: '', is_correct: false }],
      }));
    }
  };

  const handleDeleteAnswer = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((option, i) => ({
        ...option,
        is_correct: i === index,
      })),
    }));
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the question and answers
    if (
      !currentQuestion.text ||
      currentQuestion.options.some((option) => !option.text)
    ) {
      alert('Please fill out all fields.');
      return;
    }

    // Submit the question and answers
    dispatch(addQuestion(currentQuestion));

    // Clear the form
    setCurrentQuestion({
      text: '',
      options: [
        { text: '', is_correct: true },
        { text: '', is_correct: false },
      ],
    });
  };

  const handleUpdateQuiz = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      setQuestions(
        currentQuestions.map((q) =>
          q.text === currentQuestionDisplay?.text ? currentQuestion : q,
        ),
      ),
    );
  };

  const handleDeleteQuiz = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(removeQuestion(index));

    // Clear the form
    setCurrentQuestion({
      text: '',
      options: [
        { text: '', is_correct: true },
        { text: '', is_correct: false },
      ],
    });
    dispatch(setCurrentQuestionDisplay(-1));
  };

  return (
    <form onSubmit={handleSubmitQuestion}>
      <Input
        value={currentQuestion.text}
        onChange={handleQuestionChange}
        placeholder="Question"
        className="mt-2"
      />
      {currentQuestion.options.map((answer, index) => (
        <div key={index} className="mb-2 mt-2 flex items-center">
          <Input
            value={answer.text}
            onChange={handleAnswerChange(index)}
            placeholder={`Answer ${index + 1}`}
          />
          <input
            className="ml-2 mr-2"
            type="checkbox"
            checked={answer.is_correct}
            onChange={() => handleCorrectAnswerChange(index)}
            style={{ transform: 'scale(1.5)' }}
          />
          {currentQuestion.options.length > 2 && (
            <Button onClick={handleDeleteAnswer(index)}>Delete</Button>
          )}
        </div>
      ))}
      <div className="button-quiz-form-container flex flex-col items-center ">
        {currentQuestion.options.length < 4 && (
          <Button onClick={handleAddAnswer}>Add Answer</Button>
        )}
        {currentQuestionDisplay ? (
          <div className="mt-4">
            <Button onClick={handleUpdateQuiz} className="mr-2">
              Save
            </Button>
            <Button
              onClick={handleDeleteQuiz(
                currentQuestions.findIndex(
                  (q) => q.text === currentQuestionDisplay?.text,
                ),
              )}
            >
              Delete Question
            </Button>
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
