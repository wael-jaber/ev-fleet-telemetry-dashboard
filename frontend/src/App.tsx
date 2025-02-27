import "./App.css";
import { Dashboard } from "@containers/index";
import { initI18n } from "@locales/i18n";

function App() {
  initI18n();
  return <Dashboard />;
}

export default App;
