import React, { useState } from "react";

import { PopupWrapper } from "ui-elements/PopupWrapper";

export const SignupPopup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
      <PopupWrapper className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 transform">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введіть ваше імʼя"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введіть ваш email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введіть ваш пароль"
        />
        <button>Зареєструватися</button>
      </PopupWrapper>
    </div>
  );
};
