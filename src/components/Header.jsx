import { useState } from 'react';
import Form from './Form';

import './Header.css';

const Header = ({ uri }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='header'>
      <h4>R's portfolio</h4>

      <div className='btn-group'>
        {!showForm && (
          <button className='add-btn' onClick={() => setShowForm(true)}>
            +
          </button>
        )}

        {showForm && <Form uri={uri} />}

        {showForm && (
          <button className='hide-btn' onClick={() => setShowForm(false)}>
            --
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
