import { signInWithPopup } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import NavBar from "../components/NavBar";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("user Info", user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in with popup", error);
      });
  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto justify-center items-center flex flex-col min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <button onClick={handleLogin} className="btn btn-primary">
          Sign in with Google
        </button>
        <Link to="/" className="btn btn-outline mt-4">
          Home
        </Link>
      </div>
    </>
  );
};

export default Login;
