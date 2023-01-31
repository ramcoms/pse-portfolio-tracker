import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

import { supabase } from '../supabase';

export const useFetch = (table) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { error, data } = await supabase.from(table).select();

      if (error) {
        setError(error);
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
