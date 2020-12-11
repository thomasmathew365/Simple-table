import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [state, setState] = useState({ data: null, isLoading: true });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setState({ data: data, isLoading: false });
      });
  }, [url]);

  return { data: state, setState };
}
