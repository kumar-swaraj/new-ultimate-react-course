import { useState } from 'react';

export default function App() {
  const [bill, setBill] = useState('');
  const [myTip, setMyTip] = useState(0);
  const [friendsTip, setFriendsTip] = useState(0);

  const totalTip = bill * (((myTip + friendsTip) * 0.5) / 100);

  function handleSetMyTip(e) {
    setMyTip(+e.target.value);
  }

  function handleSetFriendsTip(e) {
    setFriendsTip(+e.target.value);
  }

  function handleBillChange(value) {
    setBill(value);
  }

  function handleReset() {
    setBill('');
    setMyTip(0);
    setFriendsTip(0);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <BillInput bill={bill} onSetBill={handleBillChange} />
      <TipSelect htmlId="myTip" tip={myTip} onSetTip={handleSetMyTip}>
        <label htmlFor="myTip">How did you like the service?</label>
      </TipSelect>
      <TipSelect
        htmlId="friendsTip"
        tip={friendsTip}
        onSetTip={handleSetFriendsTip}
      >
        <label htmlFor="friendsTip">
          How did your friend like the service?
        </label>
      </TipSelect>

      {bill > 0 && (
        <>
          <Total bill={bill} avgTip={totalTip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label htmlFor="bill">How much was the bill?</label>
      <input
        type="number"
        id="bill"
        value={bill}
        onChange={(e) => onSetBill(+e.target.value)}
      ></input>
    </div>
  );
}

function TipSelect({ htmlId, tip, onSetTip, children }) {
  return (
    <div>
      {children}
      <select id={htmlId} value={tip} onChange={onSetTip}>
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amzing! (20%)</option>
      </select>
    </div>
  );
}

function Total({ bill, avgTip }) {
  return (
    <h3>
      You pay ${(bill + avgTip).toFixed(2)} (${bill} + ${avgTip.toFixed(2)} tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return (
    <div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
