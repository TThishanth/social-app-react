import { useContext } from "react";
import LeftBar from "./components/leftBar/LeftBar";
import Navbar from "./components/navBar/Navbar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import "./styles/global.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ThemeModeContext } from "./context/themeModeContext";
import { AuthContext } from "./context/authContext";

function App() {

  const { currentUser } = useContext(AuthContext);
  
  const { darkMode } = useContext(ThemeModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${ darkMode ? "dark" : "light" }`}>
        <Navbar/>
        <div style={{ display: "flex" }}>
            <LeftBar/>
            <div style={{ flex: 6 }}>
              <Outlet/>
            </div>
            <RightBar/>
        </div>
      </div>
    );
  }

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }

    return children
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/profile/:id",
          element: <Profile/>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
