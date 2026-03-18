'use client';

import {useState} from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function onIncrement() {
    setCount(count + 1);
  }

  return (
    <div className="flex items-center gap-2">
      <p>Count: {count}</p>
      <button className="border px-2 rounded-md" onClick={onIncrement}>
        Increment
      </button>
    </div>
  );
}
