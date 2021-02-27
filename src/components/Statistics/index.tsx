import { FC, useContext } from 'react';
import { AppContext } from '../../contexts/App';

const Statistics: FC = () => {
  const { statistics } = useContext(AppContext);
  return (
    <div className="statistics-wrapper">
      <div className="statistics">
        <p className="wpm">{statistics().wpm} WPM</p>
        <p className="statistics-row">
          Correct: <span className="correct">{statistics().correct}</span>
        </p>
        <p className="statistics-row">
          Incorrect: <span className="incorrect">{statistics().incorrect}</span>
        </p>
        <p className="statistics-row">
          Keystrokes{' '}
          <span className="correct">{statistics().correctCharacters}</span> |{' '}
          <span className="incorrect">{statistics().incorrectCharacters}</span>
        </p>
      </div>
      {/* <p className="raw-input">{}</p> */}
    </div>
  );
};

export default Statistics;
