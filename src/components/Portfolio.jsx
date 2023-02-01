import { useState } from 'react';
import './Portfolio.css';
import { supabase } from '../supabase';
import { getData } from './getData';

const uri = 'https://phisix-api3.appspot.com/stocks.json';

const Portfolio = ({ stocks }) => {
  const [isGain, setIsGain] = useState(true);
  const { documents } = getData(uri);

  const handleDelete = async (id) => {
    await supabase.from('stocks').delete().eq('id', id);
    window.location.reload(false);
  };

  const getPrice = (stockName) => {
    const stockList = documents.stock;

    if (stockList) {
      const stockData = stockList.find(({ symbol }) => symbol === stockName);

      if (stockData) {
        const { name, price, symbol } = stockData;
        return price.amount;
      }
    } else {
      console.log('loading data');
    }
  };

  const dateUpdated = documents.as_of ? documents.as_of.slice(0, 10) : '';

  const calculateProfitLoss = (ave_price, mkt_price) => {
    const profitLoss =
      (((mkt_price * 0.99105 - ave_price) / ave_price) * 100).toFixed(2) + '%';
    return profitLoss;
  };

  return (
    <div className='portfolio-container'>
      {stocks.map((stock) => (
        <div className='card' key={stock.id}>
          <div className='card--left'>
            <span className='stock-name'>{stock.name}</span>
            <span className='ave-price'>{stock.average_price.toFixed(2)}</span>
          </div>
          <div className='card--right'>
            <span className='current-price'>{getPrice(stock.name)}</span>
            <span className='profit'>
              {calculateProfitLoss(stock.average_price, getPrice(stock.name))}
            </span>
            <button
              className='delete-btn'
              onClick={() => handleDelete(stock.id)}
            >
              x
            </button>
          </div>
        </div>
      ))}
      <p className='update'>as of: {dateUpdated} </p>
    </div>
  );
};

export default Portfolio;
