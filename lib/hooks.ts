import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { QuizService } from '@/services/QuizService';
import { useEffect } from 'react';
import { setListSession } from './sliceData';
import Cookies from 'js-cookie';
import { setToken, setUsername } from './slice';
import { isTokenExpired } from './utils';

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
  const pageKey = useAppSelector((state) => state.data.pageKey);

  useEffect(() => {
    const initSession = async () => {
      try {
        const sessions = await quizService.getAllQuizzes();
        dispatch(setListSession(sessions ?? undefined));
      } catch (error) {
        console.error(error);
      }
    };

    initSession();
  }, [dispatch, quizService, pageKey]);
};

export const useInitToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    const username = Cookies.get('username');
    if (token && !isTokenExpired(token)) {
      dispatch(setToken(token));
      dispatch(setUsername(username));
    }
  });
};
