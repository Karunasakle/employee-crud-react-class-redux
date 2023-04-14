import './App.css';
import Employee from './components/Employee';
import Formikform from './components/Formikform';
import Home from './components/Home';
import "./style.css"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <>
  <Employee/>/
  {/* <Home/> */}
  {/* <Formikform/> */}
   <ToastContainer autoClose={2000} />
  </>
  );
}

export default App;