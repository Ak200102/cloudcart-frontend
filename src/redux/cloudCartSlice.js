// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     products: [],
//     userInfo: null,
//     orderCount: 0,
// }

// export const cloudCartSlice = createSlice({
//     name: 'cloudCart',
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             const item = state.products.find(
//                 (item) => item._id === action.payload._id
//             );
//             if (item) {
//                 item.quantity = (item.quantity || 0) + (action.payload.quantity || 1);
//             } else {
//                 state.products.push({
//                     ...action.payload,
//                     quantity: action.payload.quantity || 1,
//                 });
//             }
//         },
//         increaseQuantity: (state, action) => {
//             const item = state.products.find((item) => item._id === action.payload);

//             if (item) {
//                 item.quantity = (item.quantity || 0) + 1;
//             }
//         },
//         decreaseQuantity: (state, action) => {
//             const item = state.products.find((item) => item._id === action.payload);

//             if (item) {
//                 const currentQuantity = item.quantity || 1;
//                 if (currentQuantity === 1) {
//                     item.quantity = 1;
//                 } else {
//                     item.quantity = currentQuantity - 1;
//                 }
//             }
//         },
//         deleteProduct: (state, action) => {
//             state.products = state.products.filter((item) => item._id !== action.payload);
//         },
//         resetCart: (state) => {
//             state.products = []
//         },
//         addUser: (state, action) => {
//             state.userInfo = action.payload;
//         },
//         removeUser: (state) => {
//             state.userInfo = null;
//         },
//         setOrderCount: (state, action) => {
//             state.orderCount = action.payload;
//         },
//         resetOrderCount: (state) => {
//             state.orderCount = 0;
//         },
//     },
// });

// export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct, resetCart, addUser, removeUser,setOrderCount, resetOrderCount} = cloudCartSlice.actions;
// export default cloudCartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
  products: [],
  orderCount: 0,
};

export const cloudCart = createSlice({
  name: "cloudCart",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },

    removeUser: (state) => {
      state.userInfo = null;
      state.token = null;
    },

    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity = (item.quantity || 0) + (action.payload.quantity || 1);
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);

      if (item) {
        item.quantity = (item.quantity || 0) + 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);

      if (item) {
        const currentQuantity = item.quantity || 1;
        if (currentQuantity === 1) {
          item.quantity = 1;
        } else {
          item.quantity = currentQuantity - 1;
        }
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
    setOrderCount: (state, action) => {
      state.orderCount = action.payload;
    },
    resetOrderCount: (state) => {
      state.orderCount = 0;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  addUser,
  removeUser,
  setOrderCount,
  resetOrderCount,
} = cloudCart.actions;
export default cloudCart.reducer;