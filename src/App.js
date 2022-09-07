
import './App.css';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>Hello THERE !!</h1>
      <h2>WELCOME to Dispute Management System</h2>
      <div >
        <Button className='buttons' onClick = {()=>navigate('/customer/signup')}> SIGNUP </Button>
    
        <Button className='buttons' onClick = {()=>navigate('/customer/login')}> LOGIN </Button>

      </div>
    </div>
  );
}

export default App;
