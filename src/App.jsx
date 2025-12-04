import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AuthModal from "./pages/Views/Forms/Sesion";

import Capacitaciones from "./pages/Views/Capacitaciones"
import Dashboard from "./pages/Views/Dashboard"
import Evaluaciones from "./pages/Views/Evaluaciones"
import Perfil from "./components/layout/Perfil";


function App() {

  const [visibleApp, SetVisibleApp] = useState(false)
  const [user, SetUser] = useState("");
  const [idUser, SetIdUser] = useState(0)  
  const [rolUser, SetRolUser] = useState(false)
  const [userData, setUserData] = useState({
      idUser: 0,
      user: "",
      cargo: "",
      ciudad: "",
      rolUser: false,
    });
  const [authOpen, setAuthOpen] = useState(true);
  const [view, setView] = useState("Home")
  const API_BASE_URL = import.meta.env.VITE_API_URL 


  useEffect(() => {
    if (user === "" || idUser === 0) {
      SetVisibleApp(false)
      setAuthOpen(true)
    } else {
      SetVisibleApp(true);
      setAuthOpen(false)
    }
  }, []);

  return (
    visibleApp ?
      <>
        <Header rolUser={rolUser} setView={setView} user={user} setAuthOpen={setAuthOpen} />
        <main style={{ display: view === "Home" ? "block" : "none" }} className="main-container">
          <Home />
        </main>
        <main style={{ display: view === "Capacitaciones" ? "block" : "none" }} className="main-container">
          <Capacitaciones API_BASE_URL={API_BASE_URL} />
        </main>
        <main style={{ display: view === "Dashboard" ? "block" : "none" }} className="main-container">
          <Dashboard API_BASE_URL={API_BASE_URL} />
        </main>
        <main style={{ display: view === "Evaluaciones" ? "block" : "none" }} className="main-container">
          <Evaluaciones userData={userData} API_BASE_URL={API_BASE_URL} />
        </main><main style={{ display: view === "Perfil" ? "block" : "none" }} className="main-container">
          <Perfil API_BASE_URL={API_BASE_URL} idUser={idUser} userData={userData} setUserData={setUserData}/>
        </main>

        <Footer />
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </> :
      <>
        <AuthModal userData={userData} API_BASE_URL={API_BASE_URL} SetVisibleApp={SetVisibleApp} SetUser={SetUser} SetIdUser={SetIdUser} SetRolUser={SetRolUser} isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </>
  );
}

export default App;
