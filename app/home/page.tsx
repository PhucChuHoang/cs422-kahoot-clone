'use client';
import UserDisplay from '@/components/user_display';
import { useAppSelector } from '@/lib';
import { Menu } from 'antd';
import { useState } from 'react';

export default function Home() {
  const listSession = useAppSelector((state) => state.data.listSession);
  const [selectedKey, setSelectedKey] = useState<string>('0');

  return (
    <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="flex w-1/4 items-center justify-center">
        <UserDisplay
          username="username"
          avatarUrl="https://png.pngtree.com/png-clipart/20190614/original/pngtree-teachers-day-teacher-teacher-character-avatar-illustration-educators-png-image_3797974.jpg"
        />
      </div>
      <div className="h-full w-1/4 overflow-auto">
        <h1 className="text-2xl font-bold">List Available Sessions</h1>
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
      <div className="h-full w-1/2 overflow-auto">
        <div className="flex h-full flex-col pl-2">
          <p className="text-2xl font-bold">
            Session Name: {listSession[parseInt(selectedKey)].name}
          </p>
          <div className="flex-grow overflow-auto">
            {listSession[parseInt(selectedKey)].list_quizzes.map(
              (quiz: Quiz, index: number) => {
                return (
                  <div key={index} className="border-b-2 border-gray-200 p-2">
                    <p className="font-bold">Question: {quiz.question}</p>
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
