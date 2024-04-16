import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from './context/Authcontext'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Discover from "./pages/Discover";
import Overview from "./pages/Overview";





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


    </Routes>
    
    </AuthContextProvider>
    
    </>
  );
}

export default App;
