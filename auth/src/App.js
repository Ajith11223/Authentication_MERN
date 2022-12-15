import { useSelector } from "react-redux";
import { Route,Routes } from "react-router-dom";
import Forgot from "./Pages/Forgot/Forgot";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Reset from "./Pages/Reset/Reset";
import Verify from "./Pages/Verify/Verify";



function App() {
  const {user} = useSelector((state)=>({...state}))
  return (
   <div>
    <Routes>
      <Route path="/login" element={<Login/> } exact/>
      <Route path={"/"} element={user?<Home/>:<Login/> } exact/>
      <Route path="/signup" element={<Register/> } exact/>
      <Route path="/forgot" element={<Forgot/> } exact/>
      <Route path="/verify" element={<Verify/> } exact/>
      <Route path="/reset" element={<Reset/> } exact/>
    </Routes>
   </div>
  );
}

export default App;
