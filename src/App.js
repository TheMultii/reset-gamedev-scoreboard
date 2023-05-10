import './App.css';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <ScoreBoard />
    </div>
  );
}

const ScoreBoard = () => {
  const [data, setData] = useState([]);
  const [fetchData, setFetchData] = useState("");

  const addZero = (num) => `${num < 10 ? '0' : ''}${num}`;

  useEffect(() => {
    async function fetchData() {
      const x = await fetch('http://212.106.184.211/score?game=RA');
      setData(JSON.parse(await x.text()));
      const dt = new Date();
      setFetchData(`${addZero(dt.getHours())}:${addZero(dt.getMinutes())}:${addZero(dt.getSeconds())}`)
    }
    fetchData();
  }, []);
  
  return <div>
    <header>
      <img src="https://i.imgur.com/Nv1vb2O.png" />
      <h1>Scoreboard</h1>
    </header>
    <div className="first3">
      {
        data.slice(0, 3).map((item, index) => {
          return (
            <div key={index}>
              <h1>{item.score}</h1>
              <h3>{item.vcode}</h3>
            </div>
          )
        })
      }
    </div>
    <div className="normal_items">
    {
      data.slice(4, data.length).map((item, index) => {
        return (
          <div className="normal_item" key={index}>
            <div>
              <p>{item.score}</p>
              <p>{item.vcode}</p>
            </div>
            <div>
              <p>{item.created_at}</p>
            </div>
          </div>
        )
      })
    }
    </div>
    <footer>
      <p>Data pobrania wyników: {fetchData}</p>
    </footer>
  </div>
}

export default App;
