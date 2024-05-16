'use client';
import QuizAddForm from '@/components/quiz_add_form';
import '../globals.css';
import { QuizSideBar } from '@/components/quiz_side_bar';

export default function QuizPage() {
  return (
    <div>
      <div className="quiz-form-container flex flex-col">
        <QuizSideBar />
        <QuizAddForm />
      </div>
    </div>
  );
}
