import { AuthProvider } from "./context/AuthContext";
import Routing from "./Routing/index";

function App() {
  return (
    <AuthProvider>
      <Routing />
    </AuthProvider>
  );
}

export default App;
