import React from "react";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
