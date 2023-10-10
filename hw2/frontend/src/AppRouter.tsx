// Import necessary modules
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // Import your main application component
import ListDetailPage from '@/components/ListDetailPage'; // Import the ListDetailPage component

// Define your routes using the Routes and Route components
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Your main page route */}
        <Route path="/page/:id" element={<ListDetailPage />} /> {/* ListDetailPage route */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
