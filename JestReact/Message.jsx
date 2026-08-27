import { useState } from 'react';

export default function Message() {
  const [message, setMessage] = useState(
    'Hello from React!',
  );

  const handleClick = () => {
    setMessage('Button clicked!');
  };

  return (
    <div>
      <h1>{message}</h1>

      <button onClick={handleClick}>
        Change Message
      </button>
    </div>
  );
}