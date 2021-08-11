import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./app.scss";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import firebase from "firebase";
import Map from "./components/Map/Map";
import AppRouter from "./components/AppRouter";

firebase.initializeApp({
  apiKey: "AIzaSyCEaMwnGACHNiTrYriV3BPH06i2xE8tpQA",
  authDomain: "weather-dashboard-7f468.firebaseapp.com",
  projectId: "weather-dashboard-7f468",
  storageBucket: "weather-dashboard-7f468.appspot.com",
  messagingSenderId: "31629217478",
  appId: "1:31629217478:web:ae6763c937bb4747a291c7",
  measurementId: "G-ZJBQRY2GJB",
});

function App() {
  return (
    <div className="app">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
