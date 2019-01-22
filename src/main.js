import React from "react";
import ReactDom from "react-dom";
import App from './App';

const reactTarget = document.getElementById("react-target");

ReactDom.render(<App/>, reactTarget)

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,

//     document.getElementById("root")
// );
// //registerServiceWorker();

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
