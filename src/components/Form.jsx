import { useState } from 'react';
import { fetchAPI } from './fetchAPI';
import { supabase } from '../config/supabase';

// styles
import './Form.css';

const Form = ({ uri }) => {
  const [stockName, setStockName] = useState('');
  const [averagePrice, setAveragePrice] = useState();
  const [totalShares, setTotalShares] = useState();
  const [error, setError] = useState(null);

  // get data from API
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

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if stock is not in symbolList
    if (!symbolList.includes(stockName)) {
      setError('ticker not found');
      setStockName('');
      return;
    }

    // update database
    const { data, error } = await supabase.from('stocks').insert({
      name: stockName,
      average_price: averagePrice,
      total_shares: totalShares,
    });

    // reset form
    setStockName('');
    setAveragePrice();
    setTotalShares();

    window.location.reload(false);
  };

  return (
    <form className='stock-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>TICKER</label>
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
        <label>AVE. PRICE</label>
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
        <label>NO. OF SHARES</label>
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
