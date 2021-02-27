import { FC } from 'react';
import { AppProvider } from './contexts/App';
import Text from './components/Text';
import Input from './components/Input';

const App: FC = () => {
  return (
    <AppProvider>
      <div className="content">
        <Text />
        <Input />
      </div>
    </AppProvider>
  );
};

export default App;
