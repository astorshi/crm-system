import { createStore, applyMiddleware } from "redux";
import getInitState from "./initialState";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducers/root";


// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));


const store = createStore(
  reducer,
  getInitState(),
  composeWithDevTools(applyMiddleware(thunk))
);

// store.subscribe(() => {
//   window.localStorage.setItem('redux', JSON.stringify(store.getState()))
// })

export default store;
