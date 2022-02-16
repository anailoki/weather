import { Provider } from 'react-redux';
import './App.css';
import Weather from './pages/Weather';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Weather />
    </Provider>
  );
}

export default App;
