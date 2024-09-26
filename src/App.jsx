import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="container min-h-screen">
      
      <div className="relative mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
