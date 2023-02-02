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
  const { documents: date } = fetchAPI(pse_uri);

  const dateUpdated = date.as_of ? date.as_of.slice(0, 10) : '';

  return (
    <div className='App'>
      <Header uri={pse_uri} />
      <Portfolio stocks={stockDB} uri={pse_uri} />
      <p className='update'>as of {dateUpdated} </p>
    </div>
  );
}

export default App;
