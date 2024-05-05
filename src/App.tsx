import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './pages/results';
import CreateArticle from './pages/create-article';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Results />} />
        <Route path="/create-article" element={<CreateArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
