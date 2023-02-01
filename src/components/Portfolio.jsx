import { useState } from 'react';
import { getData } from './getData';

// database
import { supabase } from '../supabase';

// styles
import './Portfolio.css';

const Portfolio = ({ stocks, uri }) => {
  const [isGain, setIsGain] = useState(true);
  const { documents } = getData(uri);

  const handleDelete = async (id) => {
    await supabase.from('stocks').delete().eq('id', id);
    window.location.reload(false);
  };

  const dateUpdated = documents.as_of ? documents.as_of.slice(0, 10) : '';

  const getPrice = (stockName) => {
    const stockList = documents.stock;

    if (stockList) {
      const stockData = stockList.find(({ symbol }) => symbol === stockName);

      if (stockData) {
        const { name, price, symbol } = stockData;
        return price.amount.toFixed(2);
      }
    }
  };

  const calculateMarketValue = (mkt_price, shares) => {
    return (mkt_price * shares * 0.99105).toLocaleString();
  };

  const calculateProfitLoss = (ave_price, mkt_price) => {
    const profitLoss =
      (((mkt_price * 0.99105 - ave_price) / ave_price) * 100).toFixed(2) + '%';
    return profitLoss;
  };

  return (
    <div className='portfolio-container'>
      <p className='update'>as of: {dateUpdated} </p>
      {stocks.map((stock) => (
        <div className='card' key={stock.id}>
          <div className='card--left'>
            <span className='stock-name'>{stock.name}</span>
            <span className='ave-price'>{stock.average_price.toFixed(2)}</span>
            <span className='total-shares'>{stock.total_shares} sh</span>
          </div>
          <div className='card--right'>
            <span className='current-price'>{getPrice(stock.name)}</span>
            <span className='profit'>
              {calculateProfitLoss(stock.average_price, getPrice(stock.name))}
            </span>
            <span className='mkt-value'>
              {calculateMarketValue(getPrice(stock.name), stock.total_shares)}
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
      <div className='total-group'>
        <span className='total'>Total</span>
        <span className='total-amt'>1,000,000,000.00</span>
      </div>
    </div>
  );
};

export default Portfolio;
