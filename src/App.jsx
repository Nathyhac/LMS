import { AuthProvider } from "./context/AuthContext";
import Routing from "./Routing/index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Routing />
    </AuthProvider>
  );
}

export default App;
