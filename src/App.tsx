import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import TopicList from './pages/TopicList';
import ProblemDetail from './pages/ProblemDetail';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicId" element={<TopicList />} />
          <Route path="/topic/:topicId/problem/:problemId" element={<ProblemDetail />} />
        </Routes>
      </main>
    </div>
  );
}
