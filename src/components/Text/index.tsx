import { FC, useContext } from 'react';
import classnames from 'classnames';
import { AppContext, IWordStatus } from '../../contexts/App';

const Text: FC = () => {
  const { text, currentIndex, wordsStatus, currentWordStatus } = useContext(
    AppContext
  );

  const wordStatusByIndex = (index: number): IWordStatus | undefined => {
    return (
      wordsStatus[index] || (index === currentIndex && currentWordStatus())
    );
  };

  const renderWordByWord = () => {
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        className={classnames({
          word: true,
          correct: wordStatusByIndex(index)?.correct,
          incorrect: wordStatusByIndex(index)?.incorrect,
          current: index === currentIndex,
        })}
      >
        {word}
      </span>
    ));
  };

  return <div className="words">{renderWordByWord()}</div>;
};

export default Text;
