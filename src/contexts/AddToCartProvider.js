// AddToCartProvider.js
import addToCartReducer, {initialState} from '../reducers/addToCartReducer'
import {createContext , useReducer } from "react";


export const addToCartContext = createContext();
const AddToCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addToCartReducer, initialState);
  
    return (
      <addToCartContext.Provider value={{ state, dispatch }}>
        {children}
      </addToCartContext.Provider>
    );
  };
  export default AddToCartProvider;