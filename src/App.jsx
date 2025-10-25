import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AuthModal from "./pages/Views/Forms/Sesion";


function App() {
  
  const [visibleApp, SetVisibleApp] = useState(false)
  const [user, SetUser] = useState("");
  const [idUser, SetIdUser] = useState(0)
  const [authOpen, setAuthOpen] = useState(true);

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
      <Header user={user} setAuthOpen={setAuthOpen} />
      <main className="main-container">
        <Home />
      </main>
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)}/>
    </> : 
    <>
      <AuthModal SetVisibleApp={SetVisibleApp} SetUser={SetUser} SetIdUser={SetIdUser} isOpen={authOpen} onClose={() => setAuthOpen(false)}/>
    </>
  );
}

export default App;
