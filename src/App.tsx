import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import SnowPage from "./pages/SnowPage";
import VenomPage from "./pages/VenomPage";
import SpherePage from "./pages/SpherePage";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <SnowPage />,
    element: <SpherePage />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
