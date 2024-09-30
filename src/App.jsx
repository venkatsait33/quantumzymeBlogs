import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen ">
      <NavBar/>
      <div className="relative w-full h-full">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
