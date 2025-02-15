import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";

function App() {
  const {authUser} = useAuthContext();
  console.log(authUser);

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-slate-600 via-gray-400">
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/home" /> : <Landing />} />
          <Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App;