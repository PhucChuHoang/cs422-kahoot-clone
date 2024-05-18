import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib';
import { Menu } from 'antd';
import { setCurrentQuizDisplay } from '@/lib';
import { Button } from './ui/button';

export const QuizSideBar = () => {
  const dispatch = useAppDispatch();
  const currentQuizzes = useAppSelector((state) => state.data.currentQuizzes);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleMenuClick = (index: number) => {
    setSelectedKey(index.toString());
    dispatch(setCurrentQuizDisplay(index));
  };

  const handleAddQuizClick = () => {
    setSelectedKey(null);
    dispatch(setCurrentQuizDisplay(-1));
  };

  return (
    <div>
      <h1 className="p-2 text-center text-2xl font-bold">List Questions</h1>
      <Button onClick={handleAddQuizClick} className={'w-full font-bold'}>
        Add Question
      </Button>
      <Menu
        mode="inline"
        className="w-full"
        selectedKeys={selectedKey ? [selectedKey] : []}
      >
        {currentQuizzes.map((quiz: Quiz, index: number) => (
          <Menu.Item
            key={index}
            onClick={() => handleMenuClick(index)}
            className="font-bold"
          >
            {quiz.question}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};
