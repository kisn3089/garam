import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import SnowPage from './pages/SnowPage';
import Venom from './components/Venom/Venom';
import VenomPage from './pages/VenomPage';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <SnowPage />,
    element: <VenomPage />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
