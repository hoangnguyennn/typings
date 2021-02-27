import { FC } from 'react';
import { AppProvider } from './contexts/App';
import Text from './components/Text';
import Input from './components/Input';
import Statistics from './components/Statistics';

const App: FC = () => {
  return (
    <AppProvider>
      <div className="content">
        <Text />
        <Input />
        <Statistics />
      </div>
    </AppProvider>
  );
};

export default App;
