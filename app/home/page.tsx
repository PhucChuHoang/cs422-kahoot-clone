'use client';
import { Button } from '@/components/ui/button';
import UserDisplay from '@/components/user_display';
import {
  removeQuizSession,
  setCurrentQuestionDisplay,
  setCurrentQuizId,
  setCurrentQuizName,
  setIsUpdate,
  setQuestions,
  useAppSelector,
  useInitSessionAvailable,
} from '@/lib';
import { Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { isTokenExpired } from '@/lib/utils';
import { DeleteOutlined } from '@ant-design/icons'; // Import the delete icon
import { QuizService } from '@/services/QuizService';

export default function Home() {
  const listSession = useAppSelector((state) => state.data.listSession);
  const [quizName, setQuizName] = useState('');
  const [error, setError] = useState('');
  const [selectedKey, setSelectedKey] = useState<string>('0');
  const [hasSession, setHasSession] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const quizService = QuizService.getInstance();
  const username = useAppSelector((state) => state.user.username);
  useInitSessionAvailable();

  useEffect(() => {
    if (listSession) {
      setHasSession(true);
    }
  }, [listSession]);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log('Page home');
    if (!token || isTokenExpired(token)) {
      Cookies.remove('token');
      router.replace('/login');
    }
  });

  const handleCreateQuiz = () => {
    if (!quizName.trim()) {
      setError('Quiz name is required');
      return;
    }

    setError('');
    dispatch(setCurrentQuestionDisplay(-1));
    dispatch(setCurrentQuizName(quizName));
    router.push('/home/quiz');
  };

  const handleEditQuiz = () => {
    if (listSession) {
      dispatch(setIsUpdate(true));
      const currentQuiz = listSession[parseInt(selectedKey)];
      dispatch(setQuestions(currentQuiz.questions));
      dispatch(setCurrentQuestionDisplay(-1));
      dispatch(setCurrentQuizName(currentQuiz.title));
      dispatch(setCurrentQuizId(currentQuiz.id));
      router.push('/home/quiz');
    }
  };

  const handleDeleteQuiz = (index: number, quiz_id: string) => {
    dispatch(removeQuizSession(index));
    if (!listSession || listSession.length === 0) {
      setHasSession(false);
    }
    quizService.deleteQuiz(quiz_id);
  };

  const handleStartQuiz = async () => {
    if (listSession) {
      const currentQuizId = listSession[parseInt(selectedKey)].id;
      try {
        const sessionCode = await quizService.createSession(currentQuizId);
        // await quizGameService.connect({
        //   session_code: sessionCode,
        //   access_token: token ?? '',
        // });
        router.replace(`/game/${sessionCode}`);
      } catch (error) {
        setError('Failed to start quiz');
      } finally {
        setError('');
      }
    }
  };

  return (
    <div className="flex" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="flex w-1/4 items-center justify-center">
        <UserDisplay
          username={username || 'User'}
          avatarUrl="https://png.pngtree.com/png-clipart/20190614/original/pngtree-teachers-day-teacher-teacher-character-avatar-illustration-educators-png-image_3797974.jpg"
        />
      </div>
      <div className="h-full overflow-auto pr-2">
        <h1 className="pr-2 text-2xl font-bold">List Available Sessions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full font-bold">Create new quiz</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new quiz</DialogTitle>
              <DialogDescription>
                Please enter the name of the quiz
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Quiz name"
              onChange={(e) => setQuizName(e.target.value)}
            />
            {error && (
              <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
            )}
            <DialogFooter>
              <Button onClick={handleCreateQuiz}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {hasSession && listSession && (
          <Menu
            defaultSelectedKeys={[selectedKey]}
            onSelect={({ key }) => setSelectedKey(key)}
          >
            {listSession.map((session: QuizSession, index: number) => (
              <Menu.Item key={index.toString()} className="font-bold">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  {session.title}
                  <DeleteOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteQuiz(index, session.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </Menu.Item>
            ))}
          </Menu>
        )}
      </div>
      {hasSession && listSession && (
        <div className="h-full flex-grow overflow-auto">
          <div className="flex h-full flex-col pl-2">
            <div className="flex w-full flex-row items-center justify-between">
              <p className="text-2xl font-bold">
                Session Name: {listSession[parseInt(selectedKey)].title}
              </p>
              <div>
                <Button
                  className="mr-2 border-2 border-primary bg-background"
                  onClick={handleEditQuiz}
                >
                  Edit Quiz
                </Button>
                <Button className="mr-2" onClick={handleStartQuiz}>
                  Start Quiz
                </Button>
              </div>
            </div>
            <div className="flex-grow overflow-auto">
              {listSession[parseInt(selectedKey)].questions.map(
                (quiz: Question, index: number) => {
                  return (
                    <div key={index} className="border-b-2 border-gray-200 p-2">
                      <p className="text-2xl font-bold">
                        Question: {quiz.text}
                      </p>
                      {quiz.options.map((answer: QuestionAnswer, index) => {
                        return (
                          <div key={index} className="p-2">
                            <p className="font-bold">
                              Answer {index + 1}: {answer.text}
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
      )}
    </div>
  );
}
