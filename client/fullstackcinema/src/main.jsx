import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reducer from "./redux/rootReducer.js";
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension"; // added for Redux browser extension

const store = createStore(reducer, composeWithDevTools());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
