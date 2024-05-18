'use client';
import { Button } from '@/components/ui/button';
import UserDisplay from '@/components/user_display';
import { setCurrentQuizDisplay, setQuestions, useAppSelector } from '@/lib';
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  const listSession = useAppSelector((state) => state.data.listSession);
  const [selectedKey, setSelectedKey] = useState<string>('0');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEditQuiz = () => {
    const currentQuiz = listSession[parseInt(selectedKey)];
    dispatch(setQuestions(currentQuiz.list_quizzes));
    dispatch(setCurrentQuizDisplay(-1));
    router.push('/home/quiz');
  };

  return (
    <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="flex w-1/4 items-center justify-center">
        <UserDisplay
          username="username"
          avatarUrl="https://png.pngtree.com/png-clipart/20190614/original/pngtree-teachers-day-teacher-teacher-character-avatar-illustration-educators-png-image_3797974.jpg"
        />
      </div>
      <div className="h-full overflow-auto pr-2">
        <h1 className="pr-2 text-2xl font-bold">List Available Sessions</h1>
        <Link href="/home/quiz">
          <Button
            className="w-full"
            onClick={() => {
              dispatch(setCurrentQuizDisplay(-1));
              dispatch(setQuestions([]));
            }}
          >
            Add Session
          </Button>
        </Link>
        <Menu
          defaultSelectedKeys={[selectedKey]}
          onSelect={({ key }) => setSelectedKey(key)}
        >
          {listSession.map((session: QuizSession, index: number) => (
            <Menu.Item key={index.toString()} className="font-bold">
              {session.name}
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div className="h-full flex-grow overflow-auto">
        <div className="flex h-full flex-col pl-2">
          <div className="flex w-full flex-row items-center justify-between">
            <p className="text-2xl font-bold">
              Session Name: {listSession[parseInt(selectedKey)].name}
            </p>
            <div>
              <Button
                className="mr-2 border-2 border-primary bg-background"
                onClick={handleEditQuiz}
              >
                Edit Quiz
              </Button>
              <Button className="mr-2">Start Quiz</Button>
            </div>
          </div>
          <div className="flex-grow overflow-auto">
            {listSession[parseInt(selectedKey)].list_quizzes.map(
              (quiz: Quiz, index: number) => {
                return (
                  <div key={index} className="border-b-2 border-gray-200 p-2">
                    <p className="text-2xl font-bold">
                      Question: {quiz.question}
                    </p>
                    {quiz.answers.map((answer: string, index: number) => {
                      return (
                        <div key={index} className="p-2">
                          <p className="font-bold">
                            Answer {index + 1}: {answer}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
