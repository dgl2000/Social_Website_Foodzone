import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import Landing from './components/landing/Landing';
import { foodZoneApp } from './reducers';
import Main from './components/main/Main';
import Profile from './components/profile/Profile';
import PrivateRoutes from './PrivateRoutes';

const store = configureStore({ reducer: foodZoneApp });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path={"/"} element={<Landing />}>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route exact path={"/main"} element={<Main />}>
            </Route>
            <Route exact path={"/profile"} element={<Profile />}>
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
