// components
import Portfolio from './components/Portfolio';

// hooks
import { fetchDB } from './components/fetchDB';

// styling
import './App.css';
import Header from './components/Header';
import { fetchAPI } from './components/fetchAPI';

// PSE API
const pse_uri = 'https://phisix-api3.appspot.com/stocks.json';

function App() {
  const { documents: stockDB } = fetchDB('stocks');
  const { documents } = fetchAPI(pse_uri);

  const date = documents.as_of;
  const dateUpdated = date ? date.slice(0, 10) : '';

  return (
    <div className='App'>
      <Header uri={pse_uri} />
      <Portfolio documents={documents} stocks={stockDB} uri={pse_uri} />
      <p className='update'>as of {dateUpdated} </p>
    </div>
  );
}

export default App;
