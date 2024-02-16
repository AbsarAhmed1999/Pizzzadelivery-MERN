import React, { useEffect, useState } from "react";
import { getAllPizzas } from "../../api/InternalApi";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, setpizzaData } from "../../reducers/AddToCart";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function Offers() {
  const [allData, setAllData] = useState([]);
  const [pizzaName, setPizzaName] = useState("");
  const [base, setBase] = useState(null);
  const [sauce, setSauce] = useState(null);
  const [veggies, setVeggies] = useState(null);
  const [itemAddToCart , setItemAddToCart] = useState(false);
  const navigate = useNavigate();
  
  const checkAut = useSelector((state)=>state.login.isAuth)

  useEffect(()=>{
    if(checkAut === false){
      navigate('/user/login')
    }
  },[])

  const getUserId = useSelector((state)=>state.login.id);

  const handleBase = (event) => {
    const selectedPizzaId = event.target.id;
    const selectedPizza = allData.find(
      (pizza) => pizza._id === selectedPizzaId
    );
    const pizzaName = selectedPizza.name;
     // Split the selected base string to extract the name and price
  const baseName = event.target.value;

  setPizzaName(pizzaName);
  setBase(baseName); // Set the base name
  };


  const handleSauce = (event) => {
    setSauce(event.target.value);
  };

  const handleVeggies = (event) => {
    setVeggies(event.target.value);
  };

  const ADD_TO_CART = (event) => {
    const selectedPizzaId = event.target.id;
    const selectedPizza = allData.find(
      (pizza) => pizza._id === selectedPizzaId
    );
    const total = () => {
      let key;
      for (key in pizzaQuantities) {
        if (event.target.id === key) {
          return pizzaQuantities[key];
        }
      }
      if (
        pizzaQuantities[key] === null ||
        pizzaQuantities[key] === undefined ||
        pizzaQuantities[key] === "0" ||
        pizzaQuantities[key] === 0
      ) {
        alert("ADD PIZZA QUANTITY");
      }
    };
    const image = selectedPizza.img;
    if (base === null || sauce === null || veggies === null) {
      alert("Add Base, Sauce & Veggies")
    } else {
      const allPizza = {
        id: selectedPizzaId,
        customerId: getUserId,
        Name: pizzaName,
        base: base,
        sauce: sauce,
        veggies: veggies,
        image: image,
        count: total(),
      };
      if(total()>0){
        dispatch(setpizzaData(allPizza));
      }
    }
    setItemAddToCart(true);
    setTimeout(()=>{
      setItemAddToCart(false);
    },2000)

  };

  useEffect(() => {
    async function Data() {
      let response = await getAllPizzas();
      setAllData(response.data.allPizza);
    }
    Data();
  }, []);

  const dispatch = useDispatch();
  const pizzaQuantities = useSelector(
    (state) => state.addToCart.pizzaQuantities
  );

  return (
    <div className="grid grid-cols-4 gap-4 ml-10">
    <div className="hidden">ITEM ADDED TO CART</div>
      {allData.map((pizzadata) => (
        <div key={pizzadata._id}>
          <div className="w-20 text-center">
            <img src={`${pizzadata.img}`} alt="dancingfajita" />
          </div>
          <div>{pizzadata.name}</div>
          <div className="mt-2">
            Base:{" "}
            <select
              id={pizzadata._id}
              className="bg-orange-200 shadow-xl"
              onChange={handleBase}
            >
              <option disabled selected>
                --Select Base --
              </option>
              <option value={pizzadata.PizzaBase[0]._id}>
                {pizzadata.PizzaBase[0].name}{" "}
               
              </option>
              <option value={pizzadata.PizzaBase[1]._id}>
                {pizzadata.PizzaBase[1].name}{" "}
              </option>
              <option value={pizzadata.PizzaBase[2]._id}>
                {pizzadata.PizzaBase[2].name}{" "}
              </option>
              <option value={pizzadata.PizzaBase[3]._id}>
                {pizzadata.PizzaBase[3].name}{" "}
              </option>
              <option value={pizzadata.PizzaBase[4]._id}>
                {pizzadata.PizzaBase[4].name}{" "}
              </option>
            </select>
          </div>
          <div className="mt-2">
            Sauce:{" "}
            <select
              id={pizzadata._id}
              className="bg-orange-200 shadow-xl"
              onChange={handleSauce}
            >
              <option disabled selected>
                --Select Sauce --
              </option>
              <option value={pizzadata["Pizza Sauce"][0]._id}>
                {pizzadata["Pizza Sauce"][0].name}
              </option>
              <option value={pizzadata["Pizza Sauce"][1]._id}>
                {pizzadata["Pizza Sauce"][1].name}{" "}
              </option>
              <option value={pizzadata["Pizza Sauce"][2]._id}>
                {pizzadata["Pizza Sauce"][2].name}
              </option>
              <option value={pizzadata["Pizza Sauce"][3]._id}>
                {pizzadata["Pizza Sauce"][3].name}{" "}
              </option>
              <option value={pizzadata["Pizza Sauce"][4]._id}>
                {pizzadata["Pizza Sauce"][4].name}
              </option>
            </select>
          </div>
          <div className="mt-2">
            Veggies:{" "}
            <select
              id={pizzadata._id}
              className="bg-orange-200 shadow-xl"
              onChange={handleVeggies}
            >
              <option disabled selected>
                --Select Veggies --
              </option>
              <option value={pizzadata.Veggies[0]._id}>
                {pizzadata.Veggies[0].name}{" "}
              </option>
              <option value={pizzadata.Veggies[1]._id}>
                {pizzadata.Veggies[1].name}{" "}
              </option>
              <option value={pizzadata.Veggies[2]._id}>
                {pizzadata.Veggies[2].name}{" "}
              </option>
              <option value={pizzadata.Veggies[3]._id}>
                {pizzadata.Veggies[3].name}{" "}
              </option>
              <option value={pizzadata.Veggies[4]._id}>
                {pizzadata.Veggies[4].name}{" "}
              </option>
              <option value={pizzadata.Veggies[5]._id}>
                {pizzadata.Veggies[5].name}{" "}
              </option>
              <option value={pizzadata.Veggies[6]._id}>
                {pizzadata.Veggies[6].name}{" "}
              </option>
              <option value={pizzadata.Veggies[7]._id}>
                {pizzadata.Veggies[7].name}{" "}
              </option>
            </select>
            <div className="mt-5">{pizzadata.description}</div>
            <button
              id={pizzadata._id}
              onClick={ADD_TO_CART}
              className="bg-orange-500 rounded-xl mt-5 text-white font-bold w-28 hover:bg-orange-600 hover:text-lg hover:font-bold"
            >
              Add to Cart
            </button>
            <div className="flex w-32 mt-2">
              <button
                className="w-10 text-center bg-orange-500 font-bold text-white text-xl hover:bg-orange-600 hover:text-lg hover:font-bold"
                onClick={() => dispatch(decrement({ pizzaId: pizzadata._id }))}
              >
                -
              </button>
              <div className="w-10 text-center font-bold">
                {pizzaQuantities[pizzadata._id] || 0}
              </div>
              <button
                className="w-10 text-center bg-orange-500 font-bold text-white text-xl hover:bg-orange-600 hover:text-lg hover:font-bold"
                onClick={() => dispatch(increment({ pizzaId: pizzadata._id }))}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default Offers;
