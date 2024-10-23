import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen dark:text-white dark:bg-black">
      <NavBar />
      <div className="relative w-full h-full max-sm:mt-16 background">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
