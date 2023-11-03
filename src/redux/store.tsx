import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Children from "../types/childer";
import skillReducer, { skillName } from "./slice/skills";
import educationReducer, { educationName } from "./slice/education";



const reducer = {
  [skillName]: skillReducer,
  [educationName]: educationReducer,
};

const Store = configureStore({
  reducer
});

const StoreProvider = ({ children }: Children) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default StoreProvider;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
