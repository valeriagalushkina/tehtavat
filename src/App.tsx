import { useState, useEffect, useCallback } from 'react'
import LoginForm from './LoginForm'
import reactLogo from 'dist/assets/react-CHdo91hT.svg'
import viteLogo from 'dist/assets/vite.svg'
import './App.css'
import React from 'react';

function App() {
  const [count, setCount] = useState(0)
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>((event) => {
    console.log('Toiminto(X, Y): (' + event.pageX + ', ' + event.pageY + ')');
    setCount((count) => count + 1);
  }, [setCount]);
  useEffect(() => {
    console.log('Viesti efektifunktiosta');
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={(handleClick)}>
          Laskurin arvo {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
            <LoginForm />
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;