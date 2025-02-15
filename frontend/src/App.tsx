import { Route, Routes } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-slate-500 via-gray-300">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App;