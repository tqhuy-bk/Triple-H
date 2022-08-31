import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from "./reducers";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);


export default store;