import { createStore } from "redux";
import { Reducer } from "./Reducers";

export const Mystore = createStore(Reducer)