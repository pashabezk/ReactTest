import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SamuraiJSApp from "./App";
import ReactDOM from "react-dom/client";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<SamuraiJSApp/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();