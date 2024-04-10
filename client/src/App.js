import { auth } from "firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { CreateChat } from "pages/CreateChat";
import { Home } from "pages/Home";

import { Header } from "components/Header";
import { PopupsContainer } from "components/popups";

function App() {
  const { checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <PopupsContainer />
    </div>
  );
}

export default App;
