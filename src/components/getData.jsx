import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export const getData = (uri) => {
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(uri);
        const data = await res.json();
        setDocuments(data);
        setError(null);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return { error, documents };
};
