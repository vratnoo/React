import React,{Component} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
// import Basic from './dnd'
import Paper from './npaper'
function App(){
  return <Paper/>
}
// function App() {
 
//   return <DndProvider backend={Backend}>
//   <Basic id="1" index="1" content="First"/>
//   <Basic id="2" index="2" content="Second"/>
//   <Basic id="3" index="3" content="Third"/>
//   <Basic id="4" index="4" content="Forth"/>
//   <Basic id="5" index="5" content="Fifth"/>
//   </DndProvider>
// }


export default App
