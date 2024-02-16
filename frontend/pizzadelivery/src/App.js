import Login from "./Pages/Login/login";
import Register from "./Pages/Register/Register"
import Offers from './Pages/Offers/offers';
import Navbar from "./Components/Navbar";
import Pizza from "./Components/Pizza";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Cart from "./Pages/Cart/Cart";
import MyOrder from "./Pages/MyOrder/MyOrder";
import Admin from "./Pages/Admin/Admin";
import SingleOrder from "./Pages/SingleOrder/SingleOrder";
import { useSelector } from "react-redux";
function App() {
  const pizza = useSelector((state)=>state.Order.response);
  // console.log(pizza);
  return (
    
    <div className="w-full min-h-full">
      <div className="wrapper">
      <Router>
      <Navbar/>
          <Routes>
            <Route path="/" element={<Pizza/>}/>
            <Route path="user/login" element={<Login/>}/>
            <Route path="user/register" element={<Register/>}/>
            <Route path="user/offers" element={<Offers/>}/>
            <Route path="user/cart" element={<Cart/>}/>
            <Route path="user/order" element={<MyOrder/>}/>
            <Route path="admin/order" element={<Admin/>}/>
            <Route
              path="user/order/:customerId"
              element={
                pizza.length > 0 ? (
                  <SingleOrder pizza={pizza} />
                ) : (
                  <div>Loading or No Data Available</div>
                )
              }
            />
            </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;
