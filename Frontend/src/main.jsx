import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// GoogleOAuthProvider is handled inside App.jsx
// (it checks VITE_GOOGLE_CLIENT_ID before wrapping)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
