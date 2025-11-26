import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AuthModal from "./pages/Views/Forms/Sesion";

import Capacitaciones from "./pages/Views/Capacitaciones"
import Dashboard from "./pages/Views/Dashboard"
import Evaluaciones from "./pages/Views/Evaluaciones"


function App() {
  
  const [visibleApp, SetVisibleApp] = useState(false)
  const [user, SetUser] = useState("");
  const [idUser, SetIdUser] = useState(0)
  const [rolUser, SetRolUser] = useState(false)
  const [authOpen, setAuthOpen] = useState(true);
  const [view, setView] = useState("Home")

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
      <main style={{ display: view === "Home" ? "block" : "none"}} className="main-container">
        <Home />
      </main>
      <main style={{ display: view === "Capacitaciones" ? "block" : "none"}} className="main-container">
        <Capacitaciones />
      </main>
      <main style={{ display: view === "Dashboard" ? "block" : "none"}} className="main-container">
        <Dashboard />
      </main>
      <main style={{ display: view === "Evaluaciones" ? "block" : "none"}} className="main-container">
        <Evaluaciones />
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)}/>
    </> : 
    <>
      <AuthModal SetVisibleApp={SetVisibleApp} SetUser={SetUser} SetIdUser={SetIdUser} SetRolUser={SetRolUser} isOpen={authOpen} onClose={() => setAuthOpen(false)}/>
    </>
  );
}

export default App;
