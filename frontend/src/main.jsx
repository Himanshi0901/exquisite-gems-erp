import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  InventoryProvider,
} from "./context/InventoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InventoryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border:
              "1px solid rgba(234,179,8,0.2)",
          },
        }}
      />
    </InventoryProvider>
  </React.StrictMode>
);