import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import { ThemeProvider } from "@theme/ThemeProvider";
import { WebSocketHandler } from "@websocket/WebSocketHandler";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <WebSocketHandler />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
