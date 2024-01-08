// addToCartReducer.js

export const initialState = {
  cartItems: [],
};

const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const isItemInCart = state.cartItems.some(item => item.room_id === action.payload.room_id);

      return {
        ...state,
        cartItems: isItemInCart ? state.cartItems : [...state.cartItems, action.payload],
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.room_id !== action.payload.room_id),
      };

    default:
      return state;
  }
};

export default addToCartReducer;


// addToCartReducer.js

// export const initialState = {
//   cartItems: [],
// };

// const addToCartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return {
//         ...state,
//         cartItems: [...state.cartItems, action.payload],
//       };
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         cartItems: state.cartItems.filter(item => item !== action.payload),
//       };

//       // return {
//       //   ...state,
//       //   cartItems: Array.isArray(action.payload) ? action.payload : [],
//       // };

//       // return {
//       //   ...state,
//       //   cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
//       // };

//     // Add other cases for different actions if needed
//     default:
//       return state;
//   }
// };

// export default addToCartReducer;
