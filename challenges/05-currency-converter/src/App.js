import { useEffect, useState } from 'react';

import './loader.css';

export default function App() {
  const [amount, setAmount] = useState('');
  const [curFrom, setCurFrom] = useState('USD');
  const [curTo, setCurTo] = useState('EUR');
  const [convertedAmt, setConvertedAmt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();

      setConvertedAmt(null);

      async function fetchConvertedAmt() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${curFrom}&to=${curTo}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Something went wrong during fetching conversion');

          const data = await res.json();

          setConvertedAmt(data.rates[curTo]);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (!amount) return;

      if (curFrom === curTo) {
        setConvertedAmt(amount);
        return;
      }

      fetchConvertedAmt();

      return () => controller.abort();
    },
    [amount, curFrom, curTo]
  );

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />

      <select value={curFrom} onChange={(e) => setCurFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select value={curTo} onChange={(e) => setCurTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {isLoading && <Loader />}
      {convertedAmt && !isLoading && <p>{convertedAmt}</p>}
    </div>
  );
}

function Loader() {
  return <p className="loader"></p>;
}
