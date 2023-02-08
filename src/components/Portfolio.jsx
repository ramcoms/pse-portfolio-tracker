import { fetchAPI } from './fetchAPI';

// database
import { supabase } from '../config/supabase';

// styles
import './Portfolio.css';

const Portfolio = ({ documents, stocks, uri }) => {
  // get data from API

  // get stock price from API
  const getPrice = (stockName) => {
    let price;
    const stockList = documents.stock;
    if (stockList) {
      const stockData = stockList.find(({ symbol }) => symbol === stockName);
      price = stockData.price.amount;

      return price;
    }
  };

  // compute market value of each stock
  let marketValuesArr = [];
  const calculateMarketValue = (current, shares) => {
    const marketValue = current * shares * 0.99105;
    marketValuesArr.push(marketValue);
    calculateTotal(marketValuesArr, marketValue);

    return NumberFormatter(marketValue);
  };

  // compute total market value of ALL stocks
  let totalMarketValue = 0;
  const calculateTotal = (arr) => {
    totalMarketValue = arr.reduce((a, b) => {
      return a + b;
    }, 0);

    return totalMarketValue;
  };

  // compute gain/loss
  const calculateProfitLoss = (ave_price, mkt_price) => {
    const profitLoss = mkt_price
      ? ((mkt_price * 0.99105 - ave_price) / ave_price) * 100
      : 1;

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
            <span className='ave-price'>
              average: ₱ {stock.average_price.toFixed(2)}
            </span>
            <span className='total-shares'>
              shares: {NumberFormatter(stock.total_shares)}
            </span>
          </div>
          <div className='card--right'>
            <span className='mkt-value'>
              ₱ {calculateMarketValue(getPrice(stock.name), stock.total_shares)}
            </span>
            <span className='current-price'>
              current: ₱ {getPrice(stock.name).toFixed(2)}
            </span>
            <span className='profit'>
              {/* {calculateProfitLoss(stock.average_price, getPrice(stock.name))} */}
              {stock.profit_loss}
            </span>
          </div>
          <button className='delete-btn' onClick={() => handleDelete(stock.id)}>
            x
          </button>
        </div>
      ))}
      <div className='total-group'>
        <span className='total'>Total market value</span>
        <span className='total-amt'>₱ {NumberFormatter(totalMarketValue)}</span>
      </div>
    </div>
  );
};

export default Portfolio;
