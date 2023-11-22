import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './home/App';
import Vota from './vota/vota';
import Pagdesc from './pagdesc/pagdesc';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/vota",
    element: <Vota/>,
  },
  {
    path: "/pagdesc",
    element: <Pagdesc/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      
      <GoogleReCaptchaProvider reCaptchaKey="6LePCE0gAAAAAApfvKJVZ-WMJMAjIWbjUKVXIb0N">
        <RouterProvider router={router}/>
      
      </GoogleReCaptchaProvider>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
