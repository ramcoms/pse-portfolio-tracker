import { useState } from 'react';
import { fetchAPI } from './fetchAPI';

// database
import { supabase } from '../config/supabase';

// styles
import './Portfolio.css';

const Portfolio = ({ stocks, uri }) => {
  // get data from API
  const { documents } = fetchAPI(uri);

  let marketValuesArr = [];
  let totalMarketValue = 0;

  // get stock price from API
  const getPrice = (stockName) => {
    const stockList = documents.stock;
    if (stockList) {
      const stockData = stockList.find(({ symbol }) => symbol === stockName);
      const { name, price, symbol } = stockData;
      return price.amount.toFixed(2);
    }
  };

  // compute market value of each stock
  const calculateMarketValue = (mkt_price, shares) => {
    const mkt_value = mkt_price * shares * 0.99105;

    marketValuesArr.push(mkt_value);
    calculateTotal(marketValuesArr, mkt_value);

    return NumberFormatter(mkt_value);
  };

  // compute total market value of ALL stocks
  const calculateTotal = (arr) => {
    totalMarketValue = arr.reduce((a, b) => {
      return a + b;
    }, 0);

    return totalMarketValue;
  };

  // compute gain/loss
  const calculateProfitLoss = (ave_price, mkt_price) => {
    const profitLoss =
      (((mkt_price * 0.99105 - ave_price) / ave_price) * 100).toFixed(2) + '%';
    return profitLoss;
  };

  const handleDelete = async (id) => {
    await supabase.from('stocks').delete().eq('id', id);
    window.location.reload(false);
  };

  const NumberFormatter = (value) => {
    return parseFloat(parseFloat(value).toFixed(0)).toLocaleString();
  };

  return (
    <div className='portfolio-container'>
      {stocks.map((stock) => (
        <div className='card' key={stock.id}>
          <div className='card--left'>
            <span className='stock-name'>{stock.name}</span>
            <span className='ave-price'>{stock.average_price.toFixed(2)}</span>
            <span className='total-shares'>
              {NumberFormatter(stock.total_shares)} shares
            </span>
          </div>
          <div className='card--right'>
            <span className='mkt-value'>
              {calculateMarketValue(getPrice(stock.name), stock.total_shares)}
            </span>
            <span className='current-price'>{getPrice(stock.name)}</span>
            <span className='profit'>
              {calculateProfitLoss(stock.average_price, getPrice(stock.name))}
            </span>
          </div>
          <button className='delete-btn' onClick={() => handleDelete(stock.id)}>
            x
          </button>
        </div>
      ))}
      <div className='total-group'>
        <span className='total'>Total market value</span>
        <span className='total-amt'>{NumberFormatter(totalMarketValue)}</span>
      </div>
    </div>
  );
};

export default Portfolio;
