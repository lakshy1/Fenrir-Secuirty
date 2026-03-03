import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import bgImage from "../assets/background-image.png";
import { useTheme } from "../context/ThemeContext";
import PageTransition from "../components/ui/PageTransition";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { theme, toggleTheme, isSwitching, targetTheme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || password.length < 8) {
      setError("Enter a valid email and password (8+ characters).");
      return;
    }

    setError("");
    sessionStorage.setItem("dashboard_entry_loader", "1");
    navigate("/dashboard");
  };

  return (
    <PageTransition
      className="relative min-h-screen lg:h-screen lg:min-h-0 flex flex-col lg:flex-row bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark ? "bg-[#030712]/72" : "bg-[#020617]/38"
        }`}
      />

      <div className="absolute top-6 left-8 z-20 text-white">
        <div className="flex items-center gap-3 select-none align-middle">
          <div className="w-7 h-7 rounded-full bg-[#5FAE9E] flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-2xl font-medium tracking-wide text-white">aps</span>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Switch application theme"
        className={`absolute top-6 right-6 z-20 h-10 px-4 rounded-full inline-flex items-center gap-2 text-sm font-medium border transition ${
          isDark
            ? "bg-[#111827]/90 border-[#334155] text-[#e2e8f0] hover:bg-[#1f2937]"
            : "bg-white/95 border-[#cfd8e3] text-[#1f2937] hover:bg-white"
        }`}
      >
        {isDark ? <Moon size={15} /> : <Sun size={15} />}
        {isDark ? "Dark" : "Light"} mode
      </button>

      <div className="relative z-10 lg:w-1/2 w-full flex flex-col justify-center px-16 py-20 text-white gap-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight mb-6">
            Security operations with <br />
            <span className="text-[#0CC8A8]">confidence</span> every day.
          </h1>

          <div className="space-y-4 text-gray-200 text-sm">
            <p>What you get</p>
            <Feature text="Real-time scan visibility with contextual findings." />
            <Feature text="Faster triage with severity-first workflows." />
            <Feature text="Report-ready artifacts for teams and stakeholders." />
          </div>

          <div className="text-sm text-gray-100 mt-12 sm:mt-20 lg:mt-36">
            <div className="flex items-center gap-2">
              <span className="text-[#0CC8A8]">*</span>
              <span>Trustpilot</span>
            </div>
            <p className="text-white font-medium mt-4 text-lg">
              Rated 4.5/5.0{" "}
              <span className="text-gray-300 text-sm align-text-top">(100k+ reviews)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 lg:w-1/2 w-full flex items-center justify-center px-6 py-16">
        <div
          className={`w-full max-w-md rounded-2xl shadow-2xl border p-10 ${
            isDark ? "bg-[#0f172a]/95 border-[#334155]" : "bg-white border-gray-200"
          }`}
        >
          <h2
            className={`text-3xl font-medium text-center mb-3 ${
              isDark ? "text-[#e2e8f0]" : "text-gray-900"
            }`}
          >
            Log in
          </h2>

          <p
            className={`text-sm text-center mb-4 ${
              isDark ? "text-[#94a3b8]" : "text-gray-500"
            }`}
          >
            Need an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-[#0CC8A8] underline cursor-pointer font-medium"
            >
              Sign up
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address*"
              dark={isDark}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password (8+ characters)*"
                dark={isDark}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error && e.target.value.length >= 8) {
                    setError("");
                  }
                }}
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 transition duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>

            {error && <p className="text-sm text-red-500 -mt-3">{error}</p>}

            <div className="flex items-center justify-between text-sm">
              <label
                className={`inline-flex items-center gap-2 ${
                  isDark ? "text-[#cbd5e1]" : "text-gray-600"
                }`}
              >
                <input type="checkbox" className="w-4 h-4 accent-[#0CC8A8] cursor-pointer" />
                Remember me
              </label>
              <button type="button" className="text-[#0CC8A8] underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#519c9e] hover:bg-[#417c7e] text-white py-3 rounded-full font-medium transition-all duration-200"
            >
              Log in
            </button>
          </form>
        </div>
      </div>

      {isSwitching && (
        <div className="fixed inset-0 z-[100] bg-black/45 backdrop-blur-[2px] flex items-center justify-center">
          <div className="inline-flex items-center gap-3 rounded-xl bg-white/95 px-5 py-3 text-[#1f2937] text-sm font-semibold">
            <span className="h-4 w-4 rounded-full border-2 border-[#9ca3af] border-t-[#111827] animate-spin" />
            Switching into {targetTheme} mode
          </div>
        </div>
      )}
    </PageTransition>
  );
}

function Input({
  type = "text",
  placeholder,
  dark = false,
  value,
  onChange,
  minLength,
  required = true,
}) {
  return (
    <input
      type={type}
      aria-label={placeholder}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      minLength={minLength}
      required={required}
      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0CC8A8] text-sm transition-all duration-200"
      style={
        dark
          ? {
              borderColor: "#334155",
              backgroundColor: "#111827",
              color: "#e2e8f0",
            }
          : {
              borderColor: "#d1d5db",
              backgroundColor: "#f9fafb",
              color: "#374151",
            }
      }
    />
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#0CC8A8]">+</span>
      <p>{text}</p>
    </div>
  );
}

const EyeClosed = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z" />
  </svg>
);

const EyeOpen = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 6C7 6 3 12 3 12C3 12 7 18 12 18C17 18 21 12 21 12C21 12 17 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" />
  </svg>
);
