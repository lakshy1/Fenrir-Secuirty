import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import bgImage from "../assets/background-image.png";
import { useTheme } from "../context/ThemeContext";
import PageTransition from "../components/ui/PageTransition";

export default function Signup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme, isSwitching, targetTheme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setPasswordError("");
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
            Expert level Cybersecurity <br />
            in <span className="text-[#0CC8A8]">hours</span> not weeks.
          </h1>

          <div className="space-y-4 text-gray-200 text-sm">
            <p>Whats Included</p>
            <Feature text="Effortlessly spider and map targets to uncover hidden security flaws" />
            <Feature text="Deliver high-quality, validated findings in hours, not weeks." />
            <Feature text="Generate professional, enterprise-grade security reports automatically." />
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
            Sign up
          </h2>

          <p
            className={`text-sm text-center mb-4 ${
              isDark ? "text-[#94a3b8]" : "text-gray-500"
            }`}
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#0CC8A8] underline cursor-pointer font-medium"
            >
              Log in
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="First name*" dark={isDark} />
            <Input placeholder="Last name*" dark={isDark} />
            <Input type="email" placeholder="Email address*" dark={isDark} />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password (8+ characters)*"
                dark={isDark}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError && e.target.value.length >= 8) {
                    setPasswordError("");
                  }
                }}
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500 transition duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
            {passwordError && <p className="text-sm text-red-500 -mt-3">{passwordError}</p>}

            <div
              className={`flex items-start gap-3 text-sm leading-relaxed ${
                isDark ? "text-[#cbd5e1]" : "text-gray-600"
              }`}
            >
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 accent-[#0CC8A8] cursor-pointer"
                required
              />
              <p>
                I agree to{" "}
                <span className="text-blue-500 underline cursor-pointer">Terms & Conditions</span>{" "}
                and acknowledge the{" "}
                <span className="text-blue-500 underline cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#519c9e] hover:bg-[#417c7e] text-white py-3 rounded-full font-medium transition-all duration-200"
            >
              Create account
            </button>
          </form>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              className="flex items-center justify-center flex-1 bg-black text-white py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
              aria-label="Continue with Apple"
            >
              <svg
                className="w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.6734 7.22198C10.7974 7.22198 9.44138 6.22598 8.01338 6.26198C6.12938 6.28598 4.40138 7.35397 3.42938 9.04597C1.47338 12.442 2.92538 17.458 4.83338 20.218C5.76938 21.562 6.87338 23.074 8.33738 23.026C9.74138 22.966 10.2694 22.114 11.9734 22.114C13.6654 22.114 14.1454 23.026 15.6334 22.99C17.1454 22.966 18.1054 21.622 19.0294 20.266C20.0974 18.706 20.5414 17.194 20.5654 17.11C20.5294 17.098 17.6254 15.982 17.5894 12.622C17.5654 9.81397 19.8814 8.46998 19.9894 8.40998C18.6694 6.47798 16.6414 6.26198 15.9334 6.21398C14.0854 6.06998 12.5374 7.22198 11.6734 7.22198ZM14.7934 4.38998C15.5734 3.45398 16.0894 2.14598 15.9454 0.849976C14.8294 0.897976 13.4854 1.59398 12.6814 2.52998C11.9614 3.35798 11.3374 4.68998 11.5054 5.96198C12.7414 6.05798 14.0134 5.32598 14.7934 4.38998Z" />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center justify-center flex-1 bg-[#f7f3f0] border border-gray-200 py-2.5 rounded-full text-sm font-medium text-gray-700 transition hover:bg-gray-200"
              aria-label="Continue with Google"
            >
              <svg
                className="w-7"
                viewBox="-0.5 0 48 48"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>Google-color</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="Color-" transform="translate(-401.000000, -860.000000)">
                      <g id="Google" transform="translate(401.000000, 860.000000)">
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        ></path>
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center justify-center flex-1 bg-[#5470d6] text-white py-2.5 rounded-full text-sm font-medium transition hover:bg-indigo-700"
              aria-label="Continue with Meta"
            >
              <svg
                className="w-8"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>meta_line</title>
                  <g
                    id="page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="Brand" transform="translate(-480.000000, -0.000000)">
                      <g id="meta_line" transform="translate(480.000000, 0.000000)">
                        <path
                          d="M8.06925,5.00237 C6.47461,4.89183 5.20472,5.81816 4.31715,6.9809 C3.42438,8.15046 2.79487,9.7015 2.44783,11.2489 C2.10089,12.7959 2.01419,14.4379 2.29341,15.813 C2.56477,17.1493 3.25726,18.5227 4.71368,18.9581 C6.10192,19.3731 7.34848,18.783 8.30022,17.9824 C9.25406,17.18 10.0806,16.0364 10.7459,14.9309 C11.2678,14.0637 11.7139,13.1803 12.0636,12.4265 C12.4134,13.1803 12.8595,14.0637 13.3814,14.9309 C14.0467,16.0364 14.8732,17.18 15.8271,17.9824 C16.7788,18.783 18.0254,19.3731 19.4136,18.9581 C20.87,18.5227 21.5625,17.1493 21.8339,15.813 C22.1131,14.4379 22.0264,12.7959 21.6795,11.2489 C21.3324,9.7015 20.7029,8.15046 19.8101,6.9809 C18.9226,5.81816 17.6527,4.89183 16.058,5.00237 C14.3243,5.12255 13.0879,6.47059 12.3715,7.49 C12.2613,7.64685 12.1586,7.80273 12.0636,7.95456 C11.9687,7.80273 11.866,7.64685 11.7558,7.49 C11.0394,6.47059 9.803,5.12255 8.06925,5.00237 Z M10.9193,10.0265 C10.6371,10.7417 9.95004,12.3747 9.03232,13.8996 C8.41066,14.9325 7.71866,15.8581 7.01275,16.4519 C6.30475,17.0474 5.7503,17.1805 5.28652,17.0419 C4.89094,16.9236 4.46993,16.4812 4.25341,15.415 C4.04476,14.3875 4.0958,13.0402 4.39936,11.6866 C4.70282,10.3335 5.23656,9.07262 5.90692,8.19443 C6.58247,7.30944 7.27559,6.95216 7.93095,6.99758 C8.69718,7.0507 9.46077,7.70266 10.1194,8.63992 C10.487,9.16295 10.7616,9.6916 10.9193,10.0265 Z M13.208,10.0265 C13.4902,10.7417 14.1773,12.3747 15.095,13.8996 C15.7166,14.9325 16.4086,15.8581 17.1145,16.4519 C17.8226,17.0474 18.377,17.1805 18.8408,17.0419 C19.2364,16.9236 19.6574,16.4812 19.8739,15.415 C20.0825,14.3875 20.0315,13.0402 19.7279,11.6866 C19.4245,10.3335 18.8907,9.07262 18.2204,8.19443 C17.5448,7.30944 16.8517,6.95216 16.1963,6.99758 C15.4301,7.0507 14.6665,7.70266 14.0079,8.63992 C13.6403,9.16295 13.3657,9.6916 13.208,10.0265 Z"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
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
