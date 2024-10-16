import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const user = isLogin
      ? { email, password } // For login
      : { fullName, email, password }; // For signup

    const apiEndpoint = isLogin
      ? `${process.env.REACT_APP_API_URL}/login`
      : `${process.env.REACT_APP_API_URL}/register`;

    try {
      const res = await axios.post(apiEndpoint, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Check if res and res.data exist
      if (res && res.data && res.data.success) {
        toast.success(res.data.message);
        if (isLogin) {
          dispatch(setUser(res.data.user));
          navigate("/browse");
        } else {
          setIsLogin(true); // Switch to login view after successful registration
        }
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      // Check if error has response and response.data
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        // Handle cases where the error is different
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      dispatch(setLoading(false));
    }

    // Clear the form fields
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh] bg-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="banner"
        />
      </div>
      <form
        onSubmit={getInputData}
        className="flex flex-col w-3/12 p-12 my-36 left-0 right-0  mx-auto items-center justify-center absolute rounded-md bg-black opacity-90"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <div className="flex flex-col">
          {!isLogin && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Fullname"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-red-600 mt-6 p-3 text-white rounded-sm font-medium"
          >{`${
            isLoading ? "loading..." : isLogin ? "Login" : "Signup"
          }`}</button>
          <p className="text-white mt-2">
            {isLogin ? "New to Netflix?" : "Already have an account?"}
            <span
              onClick={loginHandler}
              className="ml-1 text-blue-900 font-medium cursor-pointer"
            >
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
