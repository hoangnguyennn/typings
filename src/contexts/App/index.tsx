import { createContext, FC, useCallback, useEffect, useState } from 'react';
import { getText } from '../../services';

export type IWordStatus = {
  index: number;
  correct: boolean;
  incorrect: boolean;
  word: string;
  raw?: string;
};

export type IStatistic = {
  wpm: number;
  correct: number;
  incorrect: number;
  correctCharacters: number;
  incorrectCharacters: number;
};

type IAppContext = {
  text: string;
  currentIndex: number;
  setCurrentIndex: (value: any) => void;
  currentInput: string;
  setCurrentInput: (value: any) => void;
  wordsStatus: IWordStatus[];
  setWordsStatus: (value: any) => void;
  timer: number;
  setTimer: (value: any) => void;
  currentWord: () => string;
  currentWordStatus: () => IWordStatus;
  statistics: () => IStatistic;
};

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: FC = ({ children }) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [wordsStatus, setWordsStatus] = useState([] as IWordStatus[]);
  const [timer, setTimer] = useState(60);

  const currentWord = useCallback(() => {
    return text.split(' ')[currentIndex];
  }, [text, currentIndex]);

  const currentWordStatus = useCallback((): IWordStatus => {
    return {
      index: currentIndex,
      correct: currentWord() === currentInput.trim(),
      incorrect: !currentWord().includes(currentInput),
      word: currentInput.trim(),
    };
  }, [currentIndex, currentInput, currentWord]);

  const statistics = useCallback((): IStatistic => {
    let correct = 0;
    let incorrect = 0;
    let correctCharacters = 0;
    let incorrectCharacters = 0;
    wordsStatus.forEach((status) => {
      if (status.correct) {
        correct++;
        correctCharacters += status.raw?.length || 0;
      }

      if (status.incorrect) {
        incorrect++;
        incorrectCharacters += status.raw?.length || 0;
      }
    });

    return {
      wpm: Math.round(correctCharacters / 5),
      correct,
      incorrect,
      correctCharacters,
      incorrectCharacters,
    };
  }, [wordsStatus]);

  useEffect(() => {
    getText().then(setText);
  }, []);

  const values = {
    text,
    currentIndex,
    setCurrentIndex,
    currentInput,
    setCurrentInput,
    wordsStatus,
    setWordsStatus,
    timer,
    setTimer,
    currentWord,
    currentWordStatus,
    statistics,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
