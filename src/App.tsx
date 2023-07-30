import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import SnowPage from "./pages/SnowPage";
import VenomPage from "./pages/VenomPage";
import SpherePage from "./pages/SpherePage";

const router = createBrowserRouter([
  {
    path: "/venom",
    element: <VenomPage />,
  },
  {
    path: "/theme",
    element: <SpherePage />,
  },
  {
    path: "/*",
    element: <Navigate to="/venom" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
