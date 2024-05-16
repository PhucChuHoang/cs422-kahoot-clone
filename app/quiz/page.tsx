'use client';
import QuizAddForm from '@/components/quiz_add_form';
import '../globals.css';

export default function QuizPage() {
  return (
    <div>
      <div className="quiz-form-container">
        <QuizAddForm />
      </div>
    </div>
  );
}
