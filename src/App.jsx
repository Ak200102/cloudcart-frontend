import { useEffect, useCallback } from "react";
import Banner from "./components/Banner";
import Container from "./components/Container";
import BestSellers from "./components/homeProducts/BestSeller";
import NewArrivals from "./components/homeProducts/NewArrival";
import ProductOfTheYear from "./components/homeProducts/ProductOfTheYear";
import SpecialOffers from "./components/homeProducts/SpecialOffer";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  addUser,
  removeUser,
  setOrderCount,
  resetOrderCount,
} from "./redux/cloudCartSlice";
import { serverUrl } from "../config";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const fetchUserOrderCount = useCallback(
    async (token) => {
      try {
        const response = await fetch(`${serverUrl}/api/order/my-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          dispatch(setOrderCount(data.orders.length));
        }
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        //  store ONLY user info
        dispatch(addUser(decodedToken));

        fetchUserOrderCount(token);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        dispatch(removeUser());
        dispatch(resetOrderCount());
      }
    } else {
      dispatch(removeUser());
      dispatch(resetOrderCount());
    }
  }, [token, dispatch, fetchUserOrderCount]);

  return (
    <main className="w-full overflow-hidden">
      <Banner />
      <Container className="py-5 md:py-10">
        <NewArrivals />
        <BestSellers />
        <ProductOfTheYear />
        <SpecialOffers />
      </Container>
    </main>
  );
}

export default App;
