// components
import Portfolio from './components/Portfolio';
import Form from './components/Form';

// hooks
import { useFetch } from './components/useFetch';

// styling
import './App.css';

function App() {
  const { documents } = useFetch('stocks');

  return (
    <div className='App'>
      <h4>R's portfolio</h4>
      <Portfolio stocks={documents} />

      <Form />
    </div>
  );
}

export default App;
