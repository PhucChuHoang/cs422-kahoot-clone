'use client';
import QuizAddForm from '@/components/quiz_add_form';
import '../../globals.css';
import { QuizSideBar } from '@/components/quiz_side_bar';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/lib/utils';
import { setToken, useAppDispatch, useAppSelector } from '@/lib';

export default function QuizPage() {
  const router = useRouter();
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  if (!token || isTokenExpired(token)) {
    dispatch(setToken(undefined));
    router.push('/login');
  }

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
