import { useFetch } from './components/useFetch';
import './Portfolio.css';
import { supabase } from './supabase';

const Portfolio = () => {
  const { documents: stocks } = useFetch('stocks');

  return (
    <div className='portfolio'>
      {stocks.map((stock) => (
        <div className='card' key={stock.id}>
          <div className='card--left'>
            <span className='stock-name'>{stock.name}</span>
            <span className='ave-price'>{stock.average_price}</span>
          </div>
          <div className='card--right'>
            <span className='gain'>20%</span>
            <span className='current-price'>120.00</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
