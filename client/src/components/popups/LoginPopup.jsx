import { auth } from "firebase.config";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useAuth } from "hooks/useAuth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "ui-elements/Button";
import { OpacityBg } from "ui-elements/OpacityBg";
import { PopupWrapper } from "ui-elements/PopupWrapper";

import { toggleLoginPopup } from "../../redux/slices/popupsSlice";

export const LoginPopup = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // const handleSignup = () => {
  //   signIn(username, email, password);
  // };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        // signIn(user.displayName, user.email, user.uid);
        // console.log(user);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="">
      <form>
        <PopupWrapper className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введіть ваше імʼя"
            autoComplete="username"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введіть ваш email"
            autoComplete="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введіть ваш пароль"
            autoComplete="current-password"
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
          >
            уваійти з допомогою Google
          </Button>
          {/* <Button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Зареєструватися
          </Button> */}
        </PopupWrapper>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
      <OpacityBg onClick={() => dispatch(toggleLoginPopup())} />
    </div>
  );
};
