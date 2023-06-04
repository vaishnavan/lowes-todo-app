import React from 'react';
import Todo from './components/Todo/Todo';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Todo />
    </ErrorBoundary>
  );
}

export default App;
