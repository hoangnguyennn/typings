import {
  ChangeEvent,
  createRef,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import vn2telex from 'vn2telex';
import { AppContext } from '../../contexts/App';
import { time2String } from '../../utils';

const inputRef = createRef<HTMLInputElement>();

const Input: FC = () => {
  const {
    currentIndex,
    currentInput,
    currentWord,
    setCurrentIndex,
    setCurrentInput,
    setTimer,
    setWordsStatus,
    timer,
    wordsStatus,
  } = useContext(AppContext);

  const [intervalValue, setIntervalValue] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCurrentInput(inputValue);

    if (inputValue.includes(' ')) {
      if (currentInput.trim().length) {
        setWordsStatus(
          wordsStatus.concat({
            index: currentIndex,
            correct: currentWord() === inputValue.trim(),
            incorrect: currentWord() !== inputValue.trim(),
            word: inputValue.trim(),
            raw: vn2telex(currentWord()),
          })
        );
        setCurrentIndex((currentIndex: number) => currentIndex + 1);
        setCurrentInput('');
      }
    }

    if (!intervalValue) {
      const timeId = setInterval(() => {
        setTimer((timer: number) => timer - 1);
      }, 1000);

      setIntervalValue(timeId);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (timer === 0 && intervalValue) {
      clearInterval(intervalValue);
    }
  }, [timer, intervalValue]);

  return (
    <div className="input-row">
      <input
        className="input"
        ref={inputRef}
        value={currentInput}
        onChange={handleInputChange}
        disabled={timer === 0}
      />

      <span className="timer">{time2String(timer)}</span>
    </div>
  );
};

export default Input;
