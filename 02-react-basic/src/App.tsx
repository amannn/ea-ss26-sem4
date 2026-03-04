import {useState} from 'react';

function Counter({count, onCountChange}) {
  const isOdd = count % 2 !== 0;

  function onClick() {
    const nextCount = count + 1;
    onCountChange(nextCount);
  }

  function onDecrement() {
    onCountChange(count - 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <p>Is odd: {isOdd ? 'yes' : 'no'}</p>
      <button onClick={onClick}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter count={count} onCountChange={setCount} />
      <Counter count={count} onCountChange={setCount} />
    </div>
  );
}
