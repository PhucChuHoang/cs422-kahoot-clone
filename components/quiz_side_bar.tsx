import { useState } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  setQuestions,
  setIsUpdate,
} from '@/lib';
import { Menu } from 'antd';
import { setCurrentQuestionDisplay } from '@/lib';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { QuizService } from '@/services/QuizService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const QuizSideBar = () => {
  const dispatch = useAppDispatch();
  const currentQuestions = useAppSelector(
    (state) => state.data.currentQuestions,
  );
  const currentQuizName = useAppSelector((state) => state.data.currentQuizName);
  const currentQuizId = useAppSelector((state) => state.data.currentQuizId);
  const router = useRouter();
  const quizService = QuizService.getInstance();
  const isUpdate = useAppSelector((state) => state.data.isUpdate);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleCreateQuiz = () => {
    const request: QuizRequest = {
      title: currentQuizName,
      questions: currentQuestions,
    };
    try {
      if (isUpdate) {
        quizService.updateQuiz(currentQuizId ?? '', request);
      } else {
        quizService.createQuiz(request);
      }
      dispatch(setCurrentQuestionDisplay(-1));
      dispatch(setQuestions([]));
      dispatch(setIsUpdate(false));
    } catch (error) {
      toast.error('Login failed. Please check your username and password.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#f56565',
          color: '#fff',
        },
      });
    }
    router.replace('/home');
  };

  const handleMenuClick = (index: number) => {
    setSelectedKey(index.toString());
    dispatch(setCurrentQuestionDisplay(index));
  };

  const handleAddQuizClick = () => {
    setSelectedKey(null);
    dispatch(setCurrentQuestionDisplay(-1));
  };

  return (
    <div>
      <ToastContainer />
      <h1 className="p-2 text-center text-2xl font-bold">{currentQuizName}</h1>
      <Button onClick={handleCreateQuiz} className={'mb-2 w-full font-bold'}>
        {isUpdate ? 'Update Quiz' : 'Create Quiz'}
      </Button>
      <Button onClick={handleAddQuizClick} className={'w-full font-bold'}>
        Add Question
      </Button>
      <Menu
        mode="inline"
        className="w-full"
        selectedKeys={selectedKey ? [selectedKey] : []}
      >
        {currentQuestions.map((quiz: Question, index: number) => (
          <Menu.Item
            key={index}
            onClick={() => handleMenuClick(index)}
            className="font-bold"
          >
            {quiz.text}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};
