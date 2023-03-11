import "./styles.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./context/MainContext";
import { AuthProvider } from "./context/AuthContext";
import { DatabaseProvider } from "./context/DatabaseContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <DatabaseProvider>
      <MainProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MainProvider>
    </DatabaseProvider>
  </AuthProvider>
);
