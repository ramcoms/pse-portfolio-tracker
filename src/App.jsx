import './App.css';
import Portfolio from './Portfolio';
import Form from './Form';
import { useFetch } from './components/useFetch';

function App() {
  const { documents, error } = useFetch('stocks');

  console.log(documents);

  return (
    <div className='App'>
      <h3>PSE</h3>
      <Portfolio />
      <Form />
    </div>
  );
}

export default App;
