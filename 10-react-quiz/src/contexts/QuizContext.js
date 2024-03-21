import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',

  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index++, answer: null };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      };
    case 'tick':
      if (state.secondsRemaining <= 0)
        return {
          ...state,
          status: 'finished',
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
          secondsRemaining: state.secondsRemaining--,
        };

      return {
        ...state,
        secondsRemaining: state.secondsRemaining--,
      };

    default:
      throw new Error('Action unknown');
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions?.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`, {
          signal: controller.signal,
        });
        const data = await res.json();

        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed' });
        console.error(err.message);
      }
    }
    fetchQuestions();

    return () => controller.abort();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        numQuestions,
        index,
        points,
        totalPoints,
        answer,
        questions,
        secondsRemaining,
        highscore,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error('QuizContext was used outside of the QuizProvider');

  return context;
}

export { QuizProvider, useQuiz };
