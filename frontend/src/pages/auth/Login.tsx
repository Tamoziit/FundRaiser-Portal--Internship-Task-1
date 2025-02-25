import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Spinner from "../../components/Spinner";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useLogin();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(inputs);
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen w-full rounded-xl">
      <div
        className="absolute inset-0 bg-[url('/Logo.png')] bg-center bg-contain bg-no-repeat opacity-50 md:opacity-40"
      />
      <h1 className="text-[30px] md:text-[40px] lg:text-[50px] gradient-text-1">Login</h1>
      <div className="h-[3.3px] -mt-1 bg-yellow-600 w-10 rounded-lg" />

      <div className="flex w-full items-center justify-center">
        <div className="flex overflow-hidden">
          <div className="hidden lg:flex items-center justify-center w-[450px] glassmorphic backdrop-filter backdrop-blur-2xl p-6 border-2 border-gray-100 lg:rounded-l-lg">
            <img src="/mission1.jpg" alt="signup" className="object-cover rounded-lg h-[300px]" />
          </div>

          <form className="flex flex-col gap-7 items-start justify-center glassmorphic backdrop-filter backdrop-blur-2xl border-2 border-gray-100 rounded-lg lg:rounded-none lg:rounded-r-lg p-6 w-[320px] md:w-[380px] lg:w-[450px]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-50">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                className="input-primary"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-lg font-medium text-gray-50">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  required
                  className="input-primary w-full pr-10"
                  value={inputs.password}
                  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-1.5 text-gray-300 hover:text-gray-100"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center p-2 w-full">
              <button className="btn-submit w-full lg:w-[90%] disabled:bg-green-300" type="submit" disabled={loading}>
                {loading ?
                  <Spinner size="small" color="primary" />
                  :
                  "Login"
                }
              </button>
            </div>

            <div className="flex -mt-7 w-full items-center justify-center">
              <Link to="/signup" className="text-gray-50 hover:text-blue-300">Don't have an Account? Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;