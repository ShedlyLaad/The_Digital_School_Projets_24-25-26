import './App.css';
// import Spinn from './spinn';
import React from 'react';
import Movies from './movie.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container">
{/* <Spinn start={0}/>
<Spinn start={8}/>
<Spinn start={15}/> */}
<Movies/>
</div>

  );
}

export default App;
