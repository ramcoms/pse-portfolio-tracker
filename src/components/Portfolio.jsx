import { useState } from 'react';
import './Portfolio.css';
import { supabase } from '../supabase';

const Portfolio = ({ stocks }) => {
  // const handleDelete = async (id) => {
  //   await supabase.from('stocks').delete().eq('id', id);

  //   setStocks((prevStocks) => {
  //     return prevStocks.filter((st) => st.id !== id);
  //   });
  // };

  return (
    <div className='portfolio-container'>
      {stocks.map((stock) => (
        <div className='card' key={stock.id}>
          <div className='card--left'>
            <span className='stock-name'>{stock.name}</span>
            <span className='ave-price'>{stock.average_price}</span>
          </div>
          <div className='card--right'>
            <span className='current-price'>120.00</span>
            <span className='gain'>20%</span>
            <button
              className='delete-btn'
              onClick={() => handleDelete(stock.id)}
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Portfolio;
