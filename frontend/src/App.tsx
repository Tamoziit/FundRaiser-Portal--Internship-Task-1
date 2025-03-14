import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import DonationForm from "./pages/donate/DonationForm";
import Dashboard from "./pages/dashboard/Dashboard";
import Transactions from "./pages/transactions/Transactions";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import CompletePayment from "./pages/payments/CompletePayment";
import CancelPayement from "./pages/payments/CancelPayement";
import MissionPage from "./pages/mission/MissionPage";
import SelfDonationForm from "./pages/donate/SelfDonationForm";
import Refund from "./pages/payments/Refund";

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser);

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/home" /> : <Landing />} />
          <Route path="/login" element={authUser ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
          <Route path="/donate/:code" element={<DonationForm />} />
          <Route path="/donate/self/:code" element={authUser ? <SelfDonationForm /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/transactions" element={authUser ? <Transactions /> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={authUser ? <Leaderboard /> : <Navigate to="/" />} />
          <Route path="/mission" element={authUser ? <MissionPage /> : <Navigate to="/" />} />
          <Route path="/donate/complete-payment" element={<CompletePayment />} />
          <Route path="/donate/cancel-payment" element={<CancelPayement />} />
          <Route path="/refund" element={<Refund />} />

          <Route path="*" element={authUser ? <Navigate to="/home" /> : <Navigate to="/" />} />
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App;