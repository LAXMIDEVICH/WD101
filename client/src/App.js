import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Lost from "./components/Lost";
import AddLostItem from "./components/AddLostItem";
import Found from "./components/Found";
import AddFoundForm from "./components/AddFoundForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Lost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addLostItem",
    element: (
      <ProtectedRoute>
        <AddLostItem />
      </ProtectedRoute>
    ),
  },
  {
    path: "/found",
    element: (
      <ProtectedRoute>
        <Found />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addFoundItem",
    element: (
      <ProtectedRoute>
        <AddFoundForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
