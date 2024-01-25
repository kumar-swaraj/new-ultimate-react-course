import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="app" style={{ textAlign: 'center' }}>
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="date-counter">
      <div className="step">
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={step}
          onChange={(e) => setStep(+e.target.value)}
        />
        <label>{step}</label>
      </div>

      <div className="count">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? 'Today is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
          {date.toDateString()}
        </span>
      </p>

      {(step !== 1 || count !== 0) && (
        <button
          onClick={() => {
            setStep(1);
            setCount(0);
          }}
        >
          Reset
        </button>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
