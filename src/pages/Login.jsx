import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import NavBar from "../components/NavBar";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;   
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing in with popup", error);
      });
  };
  return (
    <>
      <NavBar />
      <div className="container flex flex-col items-center justify-center min-h-screen mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <button onClick={handleLogin} className="btn btn-primary">
          Sign in with Google
        </button>
        <Link to="/" className="mt-4 btn btn-outline">
          Home
        </Link>
      </div>
    </>
  );
};

export default Login;
