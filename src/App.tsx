import { useState, useEffect, useCallback } from 'react';
import LoginForm from './LoginForm';
import reactLogo from 'dist/assets/react-CHdo91hT.svg';
import viteLogo from 'dist/assets/vite.svg';
import './App.css';

function App() {
  // Asetetaan eväste
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  // Haetaan evästeen arvo
  const getCookie = (name: string): number => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const num = parseInt(decodeURIComponent(parts.pop()?.split(';').shift() || ''), 10);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  // Lasketaan aloitusarvo evästeestä tai 0:sta
  const [count, setCount] = useState<number>(getCookie('Count') || 0);

  // HandleClick funktio
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      setCookie('Count', newCount.toString(), 1); // Tallennetaan uusi arvo evästeeseen
      return newCount;
    });
  }, []);

  // Effektin käyttö
  useEffect(() => {
    console.log('Viesti efektifunktiosta');
  }, []); // Tämä efekti ajetaan vain kerran komponentin renderöinnin jälkeen

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
        <button onClick={handleClick}>
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
  );
}

export default App;
