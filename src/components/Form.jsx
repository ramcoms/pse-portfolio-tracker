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

  // populate tickers
  let symbolList = [];
  const getList = () => {
    const arr = documents.stock;
    if (arr) {
      arr.map((item) => symbolList.push(item.symbol));
    }
    return symbolList;
  };
  getList();

  // get stock price from API
  const getPrice = (name, average, shares) => {
    const stockList = documents.stock;
    const stockData = stockList.find(({ symbol }) => symbol === name);
    const { price } = stockData;
    const amount = price.amount;
    console.log(amount);

    setCurrentPrice(amount);
    setMarketValue(amount * shares * 0.99105);
    setProfitLoss((amount * 0.99105 - average) / average);

    console.log(currentPrice);
  };

  // compute market value of each stock
  // const calculateMarketValue = (price, shares) => {
  // };

  // compute gain/loss
  // const calculateProfitLoss = (ave_price, price) => {
  //   setProfitLoss(
  //     price ? ((price * 0.99105 - ave_price) / ave_price) * 100 : 0
  //   );
  // };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if stock is not in symbolList
    if (!symbolList.includes(stockName)) {
      setError('ticker not found');
      setStockName('');
      return;
    }

    getPrice(stockName, averagePrice, totalShares);

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

  return (
    <form className='stock-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label></label>
        <input
          required
          list='symbol-list'
          onChange={(e) => setStockName(e.target.value)}
          value={stockName || ''}
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
          value={averagePrice || ''}
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
          value={totalShares || ''}
          placeholder='total shares'
        />
      </div>

      <button className='add-btn'>+</button>
      <p className='error'>{error}</p>
    </form>
  );
};

export default Form;
