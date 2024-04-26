
//import route and routes for initializing routes with specific paths 
import { Route, Routes, Navigate } from "react-router-dom";

//import navbar to set it to always be at top of page no matter the route
import Navbar from "./components/Navbar";

//import AuthContextProvider for protected routes
import { AuthContextProvider } from './context/Authcontext'

//import all pages for routes
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Discover from "./pages/Discover";
import Overview from "./pages/Overview";


//Routes on website with protected routes labeled as such


function App() {
  return (
  <>
    <AuthContextProvider>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
        <Route path="/overview/:id" element={<Overview />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
    </AuthContextProvider>
  </>
  );
}

export default App;
