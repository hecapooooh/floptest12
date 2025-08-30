import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/goodbye')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur HTTP : ' + response.status);
        }
        return response.json(); // le JSON est un tableau ici
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setText(data[0].name); // récupère le `name` du premier élément
        } else {
          setText("Aucun exercice reçu");
        }
      })
      .catch(error => {
        console.error('Erreur :', error);
        setText("Erreur lors de la récupération");
      });
  }, []); // <-- IMPORTANT : [] pour que useEffect ne tourne qu'une fois au montage

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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1>Réplique de chambeute : {text}</h1>
        <p>
          Premier exercice : <strong>{text}</strong>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
