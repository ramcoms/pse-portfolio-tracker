import { useState } from 'react';
import { fetchAPI } from './fetchAPI';

// styles
import './Form.css';

const Form = ({ uri }) => {
  const [stockName, setStockName] = useState('');
  const [averagePrice, setAveragePrice] = useState();
  const [totalShares, setTotalShares] = useState();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [marketValue, setMarketValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);

  const [error, setError] = useState(null);

  const { documents } = fetchAPI(uri);

  // get stock price from API
  const getPrice = (stockName) => {
    const stockList = documents.stock;
    if (stockList) {
      const stockData = stockList.find(({ symbol }) => symbol === stockName);
      const { price } = stockData;
      setCurrentPrice(price.amount);
    }
  };

  // compute market value of each stock
  const calculateMarketValue = (price, shares) => {
    setMarketValue(price * shares * 0.99105);
  };

  // compute gain/loss
  const calculateProfitLoss = (ave_price, price) => {
    setProfitLoss(
      price ? ((price * 0.99105 - ave_price) / ave_price) * 100 : 1
    );
  };

  let symbolList = [];
  const getList = () => {
    const arr = documents.stock;
    if (arr) {
      arr.map((item) => symbolList.push(item.symbol));
    }
    return symbolList;
  };

  getList();
  getPrice(stockName);

  // functions
  // calculateMarketValue(currentPrice, totalShares);
  // calculateProfitLoss(averagePrice, currentPrice);

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if stock is not in symbolList
    if (!symbolList.includes(stockName)) {
      setError('ticker not found');
      setStockName('');
      return;
    }

    console.log(
      stockName,
      averagePrice,
      totalShares,
      currentPrice,
      marketValue,
      profitLoss
    );

    if (!currentPrice || !marketValue || !profitLoss) {
      console.log('loading');
      return;
    }

    // update database
    // const { data, error } = await supabase.from('stocks').insert({
    //   name: stockName,
    //   average_price: averagePrice,
    //   total_shares: totalShares,
    //   current_price: currentPrice,
    //   market_value: marketValue,
    //   profit_loss: profitLoss,
    // });

    // reset form
    // setStockName('');
    // setAveragePrice();
    // setTotalShares();
    // setCurrentPrice();
    // setMarketValue();
    // setProfitLoss();

    // window.location.reload(false);
  };

  console.log(stockName);

  return (
    <form className='stock-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label></label>
        <input
          required
          list='symbol-list'
          onChange={(e) => setStockName(e.target.value)}
          value={stockName}
          placeholder='ticker'
        />
        <datalist id='symbol-list'>
          {symbolList.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </datalist>
      </div>

      <div className='form-group'>
        <label></label>
        <input
          required
          type='text'
          inputMode='decimal'
          name='ave-price'
          onChange={(e) => setAveragePrice(e.target.value)}
          value={averagePrice}
          placeholder='average price'
        />
      </div>

      <div className='form-group'>
        <label></label>
        <input
          required
          type='number'
          name='total-shares'
          onChange={(e) => setTotalShares(e.target.value)}
          value={totalShares}
          placeholder='total shares'
        />
      </div>

      <button className='add-btn'>+</button>
      <p className='error'>{error}</p>
    </form>
  );
};

export default Form;
