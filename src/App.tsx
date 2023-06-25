
import { ToastContainer } from 'react-toastify';
import './App.css';
import Route from './API/route';

function App() {
  return (
    <>
    <Route />
    <ToastContainer
      position={"bottom-center"}
      theme={"colored"}
    />
    </>
  );
}

export default App;
