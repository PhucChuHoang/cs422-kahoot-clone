'use client';
import QuizAddForm from '@/components/quiz_add_form';
import '../../globals.css';
import { QuizSideBar } from '@/components/quiz_side_bar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function QuizPage() {
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.replace('/login');
    }
  });

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="w-[256px] p-4">
          <QuizSideBar />
        </div>
        <div className="flex-grow">
          <QuizAddForm />
        </div>
      </div>
    </div>
  );
}