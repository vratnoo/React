import React from 'react';

import './App.css';

function App() {
  return ( <Welcome/>);

}

function Fancyborder(props){
	return(
		<div className="Button">
			{props.children}
		</div>
		)
}

function Welcome(props){
	return(
     <Fancyborder>
      <h5>Vratnoo testing compostions</h5>
      <p>Life is all about learning Something New every day!</p>
     </Fancyborder>
		)
}

export default App;
