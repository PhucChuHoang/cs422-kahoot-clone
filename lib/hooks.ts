import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { QuizService } from '@/services/QuizService';
import { useEffect } from 'react';
import { setListSession } from './sliceData';

/**
 * Typed useSelector hook
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Typed useDispatch hook
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useInitSessionAvailable = () => {
  const dispatch = useAppDispatch();
  const quizService = QuizService.getInstance();

  useEffect(() => {
    const initSession = async () => {
      try {
        const sessions = await quizService.getAllQuizzes();
        dispatch(setListSession(sessions));
      } catch (error) {
        console.error(error);
      }
    };

    initSession();
  }, [dispatch, quizService]);
};
