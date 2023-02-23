import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import RoutesApp from "./routes";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App;