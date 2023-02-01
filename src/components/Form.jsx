import { useState } from 'react';
import './Form.css';
import { supabase } from '../supabase';

const Form = () => {
  const [stockName, setStockName] = useState('');
  const [averagePrice, setAveragePrice] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stockName || stockName === '' || !averagePrice) {
      console.log('error');
      return;
    }

    const { data, error } = await supabase
      .from('stocks')
      .insert({ name: stockName.toUpperCase(), average_price: averagePrice });

    setStockName('');
    setAveragePrice();

    window.location.reload(false);
  };

  return (
    <form className='stock-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Stock</label>
        <input
          required
          type='text'
          name='stock-name'
          onChange={(e) => setStockName(e.target.value.toUpperCase())}
          value={stockName}
        />
      </div>

      <div className='form-group'>
        <label>Average Price</label>
        <input
          required
          type='number'
          step='0.0001'
          name='ave-price'
          onChange={(e) => setAveragePrice(e.target.value)}
          value={averagePrice}
        />
      </div>

      <button className='add-btn'>+</button>
    </form>
  );
};

export default Form;
