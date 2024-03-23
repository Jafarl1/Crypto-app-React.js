import AppLayout from "./components/layout/AppLayout";
import { CryptoContextProvider } from "./context/CryptoContext";

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}

export default App;
