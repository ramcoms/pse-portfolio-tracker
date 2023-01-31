import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import { supabase } from '../supabase';

export const useFetch = (table) => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await supabase.from(table).select();

      if (error) {
        setError(error);
        console.log(error);
      }

      if (data) {
        setDocuments(data);
        setError(null);
      }
    };

    fetchData();
  }, [table]);

  return { error, documents };
};
