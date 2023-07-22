import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

axios.defaults.baseURL =
    process.env.REACT_APP_API_URL || "http://localhost:3001";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
