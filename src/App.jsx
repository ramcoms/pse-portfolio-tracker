// components
import Portfolio from './components/Portfolio';
import Form from './components/Form';

// hooks
import { fetchDB } from './components/fetchDB';

// styling
import './App.css';
import { useState } from 'react';

// PSE API
const pse_uri = 'https://phisix-api3.appspot.com/stocks.json';

function App() {
  const [showForm, setShowForm] = useState(false);

  const { documents } = fetchDB('stocks');

  return (
    <div className='App'>
      <h4>R's portfolio</h4>
      <Portfolio stocks={documents} uri={pse_uri} />
      {showForm && <Form uri={pse_uri} />}

      {!showForm && (
        <button className='add-btn' onClick={() => setShowForm(true)}>
          +
        </button>
      )}

      {showForm && (
        <button className='hide-btn' onClick={() => setShowForm(false)}>
          ^
        </button>
      )}
    </div>
  );
}

export default App;
