// import React from 'react';
// import  ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import{createBrowserRouter, RouterProvider} from 'react-router-dom'
// import RootLayout from './components/layout/RootLayout.jsx'
// import About from './pages/About.jsx'
// import Cart from './pages/Cart.jsx'
// import Contact from './pages/Contact.jsx'
// import Offers from './pages/Offers.jsx'
// import Order from './pages/Order.jsx'
// import Product from './pages/Product.jsx'
// import Profile from './pages/Profile.jsx'
// import Shop from './pages/Shop.jsx'
// import Signin from './pages/Signin.jsx'
// import SignUp from './pages/SignUp.jsx'
// import SingleProduct from './pages/SingleProduct.jsx'
// const router=createBrowserRouter([
//   {
//     path:"/",
//     element:<RootLayout/>,
//     children:[{path:"/", element:<App/>},
//       {path:"/about", element:<About/>},
//       {path:"/cart", element:<Cart/>},
//       {path:"/contact", element:<Contact/>},
//       {path:"/offers", element:<Offers/>},
//       {path:"/orders", element:<Order/>},
//       {path:"/product", element:<Product/>},
//       {path:"/profile", element:<Profile/>},
//       {path:"/shop", element:<Shop/>},
//       {path:"/signin", element:<Signin/>},
//       {path:"/signup", element:<SignUp/>},
//       {path:"/product/:id", element:<SingleProduct/>},


//     ]
//   }
// ])


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router}/>
//   </React.StrictMode>
  
// )
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import SignIn from "./pages/Signin.jsx";
import SignUp from "./pages/SignUp.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import Offers from "./pages/Offers.jsx";
import Order from "./pages/Order.jsx";
import Product from "./pages/Product.jsx";
import Shop from "./pages/Shop.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import RootLayout from "./components/RootLayout.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import FAQ from "./pages/FAQ.jsx";
import Blog from "./pages/Blog.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { serverUrl } from "../config.js";

//  Wake Render backend (cold-start fix)
fetch(`${serverUrl}/health`).catch(() => {});


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/faq",
          element: <FAQ />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/offers",
          element: <Offers />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/checkout/:orderId",
          element: <Checkout />,
        },
        {
          path: "/payment-success",
          element: <PaymentSuccess />,
        },
        {
          path: "/payment/success",
          element: <PaymentSuccess />,
        },
        {
          path: "/product/:id",
          element: <SingleProduct />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);