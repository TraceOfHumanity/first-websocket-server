import { useAuth } from "hooks/useAuth";
import React, { useState } from "react";

import { Button } from "ui-elements/Button";
import { PopupWrapper } from "ui-elements/PopupWrapper";

export const SignupPopup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signIn } = useAuth();

  const handleSignup = () => {
    signIn(username, email, password);
  };

  return (
    <div>
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
              handleSignup();
            }}
          >
            Зареєструватися
          </Button>
        </PopupWrapper>
      </form>
    </div>
  );
};
