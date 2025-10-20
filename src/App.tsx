import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <BrowserRouter>
       <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
