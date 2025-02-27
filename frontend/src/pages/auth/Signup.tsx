import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import Spinner from "../../components/Spinner";

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
    dob: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    pincode: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, signup } = useSignup();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(inputs);
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen w-full pb-6 pt-4 lg:pt-0">
      <div
        className="absolute inset-0 bg-[url('/Logo.png')] bg-center bg-contain bg-no-repeat opacity-70 md:opacity-60"
      />
      <h1 className="text-[30px] md:text-[35px] lg:text-[40px] gradient-text-2">Signup</h1>
      <div className="h-[3.3px] -mt-1 bg-blue-500 w-10 rounded-lg" />

      <div className="flex w-full items-center justify-center">
        <div className="flex overflow-hidden">
          <div className="hidden lg:flex items-center justify-center w-[450px] glassmorphic-2 backdrop-filter backdrop-blur-2xl p-6 border-2 !border-gray-700 rounded-lg lg:!rounded-none lg:!rounded-l-lg">
            <img src="/signup.jpg" alt="signup" className="object-cover object-center h-full rounded-lg" />
          </div>

          <form className="flex flex-col gap-4 items-start justify-center glassmorphic-2 backdrop-filter backdrop-blur-2xl border-2 !border-gray-700 rounded-lg lg:!rounded-none lg:!rounded-r-lg p-6 w-[320px] md:w-[380px] lg:w-[450px]" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 w-full z-10">
              <label className="text-lg font-medium text-gray-800">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                required
                className="input-primary"
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full z-10">
              <label className="text-lg font-medium text-gray-800">Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                className="input-primary"
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full z-10">
              <label className="text-lg font-medium text-gray-800">Password</label>
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

            <div className="flex flex-col gap-1 w-full z-10">
              <label className="text-lg font-medium text-gray-800">Mobile Number</label>
              <input
                type="text"
                placeholder="Enter your Mobile No."
                required
                className="input-primary"
                value={inputs.mobileNo}
                onChange={(e) => setInputs({ ...inputs, mobileNo: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full z-10">
              <label className="text-lg font-medium text-gray-800">Date of Birth</label>
              <input
                type="date"
                required
                className="input-primary"
                value={inputs.dob}
                onChange={(e) => setInputs({ ...inputs, dob: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1 w-full z-10">
              <label className="text-lg font-medium text-gray-800">Gender</label>
              <div className="flex gap-4 w-full items-center justify-between">
                {["Male", "Female", "Others"].map((gender) => (
                  <label key={gender} className="flex items-center gap-2 text-gray-700 font-semibold">
                    <input
                      type="radio"
                      name="gender"
                      value={gender[0]}
                      checked={inputs.gender === gender[0]}
                      onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                      className="w-5 h-[15.5px]"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full z-10">
              <label className="text-lg font-medium text-gray-800">Address</label>
              <div className="grid grid-cols-2 gap-4 w-full">
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="input-primary"
                  value={inputs.city}
                  onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  required
                  className="input-primary"
                  value={inputs.state}
                  onChange={(e) => setInputs({ ...inputs, state: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  className="input-primary"
                  value={inputs.country}
                  onChange={(e) => setInputs({ ...inputs, country: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  required
                  className="input-primary"
                  value={inputs.pincode}
                  onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-start justify-center p-2 w-full z-10">
              <button className="btn-submit w-full lg:w-[90%] disabled:bg-green-300" type="submit" disabled={loading}>
                {loading ? <Spinner size="small" color="primary" /> : "Signup"}
              </button>
            </div>

            <div className="flex -mt-5 -mb-0.5 w-full items-center justify-center z-10">
              <Link to="/login" className="text-gray-700 hover:text-blue-700 hover:font-semibold">Already have an Account? Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;