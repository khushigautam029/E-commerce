import { Lock, Phone, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Utility/api";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/users/register", {
        username,
        phone,
        password,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-pink-50 to-blue-100 px-4">

      {/* Background Blur */}
      <div className="absolute w-60 h-60 bg-pink-200 rounded-full blur-[120px] opacity-30 top-16 left-16"></div>
      <div className="absolute w-60 h-60 bg-sky-200 rounded-full blur-[120px] opacity-30 bottom-16 right-16"></div>

      {/* Signup Card */}
      <div
        className="
          relative
          w-full
          max-w-sm
          rounded-3xl
          bg-white/75
          backdrop-blur-xl
          border
          border-white/60
          shadow-[0_20px_45px_rgba(0,0,0,0.12)]
          hover:shadow-[0_28px_60px_rgba(0,0,0,0.16)]
          transition-all
          duration-500
          p-6
        "
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-sky-100 shadow-md">
            <UserPlus className="text-pink-500" size={24} />
          </div>

          <h2 className="mt-3 text-2xl font-bold text-slate-800">
            Create Account
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Join us and start shopping today
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Username */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Username
            </label>

            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-pink-300 focus-within:ring-4 focus-within:ring-pink-100">
              <User className="text-slate-400" size={17} />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Phone Number
            </label>

            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100">
              <Phone className="text-slate-400" size={17} />

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm focus-within:border-pink-300 focus-within:ring-4 focus-within:ring-pink-100">
              <Lock className="text-slate-400" size={17} />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ml-3 w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-pink-400
              via-pink-500
              to-sky-500
              py-2.5
              text-white
              font-semibold
              shadow-lg
              hover:scale-[1.02]
              hover:shadow-xl
              transition-all
              duration-300
              disabled:opacity-60
            "
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-5 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-pink-500 hover:text-pink-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;