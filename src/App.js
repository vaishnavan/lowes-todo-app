import React, { useContext } from 'react';
import { todoContext } from './context/TodoProvider';

function App() {
  const { todoData } = useContext(todoContext);
  console.log(todoData);
  return <h1>vaishnavan</h1>;
}

export default App;
