import { useAppSelector } from '@/lib';
import { Menubar, MenubarItem } from './ui/menubar';

export const QuizSideBar = () => {
  const currentQuizzes = useAppSelector((state) => state.data.currentQuizzes);

  return (
    <Menubar>
      <div className="p-4">
        <h2 className="mb-4 text-lg font-bold">Quizzes</h2>
        <ul>
          {currentQuizzes.map((quiz, index) => (
            <MenubarItem key={index}>{quiz.question}</MenubarItem>
          ))}
        </ul>
      </div>
    </Menubar>
  );
};
