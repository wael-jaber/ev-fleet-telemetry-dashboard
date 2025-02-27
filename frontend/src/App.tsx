import "./App.css";
import { Dashboard } from "@containers/index";
import { initI18n } from "@locales/i18n";

import { store } from "@redux/store";
import { ThemeProvider } from "@theme/ThemeProvider";
import { WebSocketHandler } from "@websocket/WebSocketHandler";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

function App() {
  initI18n();
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
        >
          <WebSocketHandler />
          <Dashboard />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
