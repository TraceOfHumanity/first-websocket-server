import { auth } from "firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { CreateChat } from "pages/CreateChat";
import { Home } from "pages/Home";

import { Header } from "components/Header";
import { PopupsContainer } from "components/popups";

import { removeActiveUser, setActiveUser } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        console.log(user.displayName);
        dispatch(
          setActiveUser({
            uid: user.uid,
            userName: user.displayName,
            email: user.email,
          }),
        );
      } else {
        dispatch(removeActiveUser());
      }
    });
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
