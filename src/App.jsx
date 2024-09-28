import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="min-h-screen ">
      <NavBar/>
      <div className="relative w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
