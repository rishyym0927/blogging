import "@radix-ui/themes/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Theme } from "@radix-ui/themes";

import { UserProvider } from "./contexts/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(

    <Theme>
      <App />
    </Theme>
 
);
