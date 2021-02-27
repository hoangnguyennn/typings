import { createContext, FC, useCallback, useEffect, useState } from 'react';
import vn2telex from 'vn2telex';
import { getText } from '../../services';

export type IWordStatus = {
  index: number;
  correct: boolean;
  incorrect: boolean;
  word: string;
  raw?: string;
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
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
