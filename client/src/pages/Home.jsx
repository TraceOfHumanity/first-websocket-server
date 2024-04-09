import React from "react";
import { Link } from "react-router-dom";

import { WebsocketClient } from "components/WebsocketClient";

import { Button } from "ui-elements/Button";

export const Home = () => {
  return (
    <div>
      {/* <WebsocketClient /> */}
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/signup">
        <Button>Signup</Button>
      </Link>
    </div>
  );
};
