/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { FaEye, FaEyeSlash, FaUsers, FaHandshake, FaGoogle, FaChartLine, FaMobileAlt, FaMoneyBillWave } from "react-icons/fa";

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      // Sign in logic
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        console.error(result.error);
      } else {
        router.push("/dashboard");
      }
    } else {
      // Sign up logic
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password }),
        });

        if (response.ok) {
          // Automatically sign in the user after successful signup
          const signInResult = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (signInResult?.error) {
            console.error(signInResult.error);
          } else {
            router.push("/dashboard");
          }
        } else {
          const errorData = await response.json();
          console.error('Signup failed:', errorData.message);
          // Here you would typically show an error message to the user
        }
      } catch (error) {
        console.error('Signup error:', error);
        // Here you would typically show an error message to the user
      }
    }
  };

  const handleSocialSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/dashboard' });
      if (result?.error) {
        console.error(`Error signing in with Google:`, result.error);
      }
    } catch (error) {
      console.error(`Error signing in with Google:`, error);
    }
  };

  const toggleSignInMode = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsSignIn(!isSignIn);
      setIsFlipping(false);
    }, 300); // Half of the animation duration
  };

  return (
    <>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
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

          {/* Right Column - Login/Signup Form */}
          <div className="w-1/2 bg-white flex items-center justify-center">
            <div className={`w-full max-w-md p-8 transition-transform duration-600 ${isFlipping ? 'rotate-y-180' : ''}`}>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">
                {isSignIn ? "Sign in to your account" : "Create an account"}
              </h2>
              <p className="text-[#6B7280] mb-8">
                {isSignIn ? (
                  <>
                    Don't have an account?{" "}
                    <button onClick={toggleSignInMode} className="font-bold text-[#111827] hover:underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button onClick={toggleSignInMode} className="font-bold text-[#111827] hover:underline">
                      Sign in
                    </button>
                  </>
                )}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isSignIn && (
                  <>
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-[#111827] text-base focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] text-[#111827] text-base focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        required
                      />
                    </div>
                  </>
                )}
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
                {!isSignIn && (
                  <p className="text-xs text-[#6B7280]">
                    By signing up you agree to our <Link href="/terms" className="font-bold text-[#111827] hover:underline">Terms of Use</Link> and <Link href="/privacy" className="font-bold text-[#111827] hover:underline">Privacy Policy</Link>.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#10B981] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#059669] transition duration-300"
                >
                  {isSignIn ? "Sign In" : "Sign Up"}
                </button>
              </form>
              <div className="mt-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E5E7EB]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-[#6B7280]">or continue with</span>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handleSocialSignIn}
                    className="flex justify-center items-center px-4 py-2 border border-[#D1D5DB] rounded-md shadow-sm text-sm font-medium text-[#111827] bg-white hover:bg-gray-50 w-full"
                  >
                    <FaGoogle className="mr-2" /> Sign in with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}