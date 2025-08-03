import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPost from './components/NewPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts/new" element={<NewPost />} />
      </Routes>
    </Router>
  );
}

export default App;