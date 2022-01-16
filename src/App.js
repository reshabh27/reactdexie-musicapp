import React from 'react';
import Maincopy from "./components/Maincopy";

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <h1>React Dexie</h1>
          <p>Music player</p>
       </div>
      </header>
      <main>
        <Maincopy/>
      </main>
    </div>
  );
}

export default App;
