import Portfolio from './components/Portfolio';
import Form from './components/Form';

import { useState } from 'react';
import { useFetch } from './components/useFetch';

import './App.css';

function App() {
  const { documents, error } = useFetch('stocks');
  const [stocks, setStocks] = useState();

  const handleDelete = async (id) => {
    setStocks((prevStocks) => {
      return prevStocks.filter((st) => st.id !== id);
    });
  };

  console.log(documents);

  return (
    <div className='App'>
      <h3>PSE</h3>
      <Portfolio stocks={documents} />
      <Form />
    </div>
  );
}

export default App;
