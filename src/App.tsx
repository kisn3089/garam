import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import Snow from './pages/Snow';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Snow />,
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
