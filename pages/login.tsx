import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaUsers, FaHandshake, FaFacebook, FaGoogle, FaChartLine, FaMobileAlt, FaMoneyBillWave } from "react-icons/fa";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here
    // For now, we'll just redirect to the dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Feature Highlights */}
      <div className="w-1/2 bg-gradient-to-r from-[#A7F3D0] via-[#C4B5FD] to-white relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        <div className="relative z-10 p-12 flex flex-col h-full">
          <h1 className="text-5xl font-bold text-[#111827] mb-12">
            Track Expenses.<br />Settle Debts.
          </h1>
          <div className="space-y-8 mb-auto">
            <div className="flex items-start">
              <FaUsers className="text-3xl text-[#111827] mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">Simplify Group Expenses</h2>
                <p className="text-[#6B7280]">Easily track shared expenses and split costs fairly among friends and family.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaChartLine className="text-3xl text-[#111827] mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">Visualize Spending Patterns</h2>
                <p className="text-[#6B7280]">Get insights into your spending habits with intuitive charts and graphs.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaMoneyBillWave className="text-3xl text-[#111827] mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">Multiple Currency Support</h2>
                <p className="text-[#6B7280]">Handle expenses in different currencies with automatic conversion.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaMobileAlt className="text-3xl text-[#111827] mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">Mobile-Friendly</h2>
                <p className="text-[#6B7280]">Access your expenses on-the-go with our responsive mobile app.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaHandshake className="text-3xl text-[#111827] mr-4 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-[#111827]">Settle Up Instantly</h2>
                <p className="text-[#6B7280]">Send or receive payments to settle debts instantly with integrated payment options.</p>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-[#111827]">Khaata</div>
          <div className="text-lg text-[#6B7280] mt-2">Bill katne ka time aa gaya!</div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Create an account.</h2>
          <p className="text-[#6B7280] mb-8">
            Already have an account? <Link href="/signin" className="font-bold text-[#111827] hover:underline">Sign in</Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-[#111827] text-base focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="E-mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-[#111827] text-base focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                required
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-[#111827] text-base focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-[#6B7280]">
              By signing up you agree to our <Link href="/terms" className="font-bold text-[#111827] hover:underline">Terms of Use</Link> and <Link href="/privacy" className="font-bold text-[#111827] hover:underline">Privacy Policy</Link>.
            </p>
            <button
              type="submit"
              className="w-full bg-[#10B981] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#059669] transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#6B7280]">or sign up with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex justify-center items-center px-4 py-2 border border-[#D1D5DB] rounded-md shadow-sm text-sm font-medium text-[#111827] bg-white hover:bg-gray-50">
                <FaFacebook className="mr-2" /> Facebook
              </button>
              <button className="flex justify-center items-center px-4 py-2 border border-[#D1D5DB] rounded-md shadow-sm text-sm font-medium text-[#111827] bg-white hover:bg-gray-50">
                <FaGoogle className="mr-2" /> Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}