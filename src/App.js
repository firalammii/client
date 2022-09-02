import logo from './logo.svg';
import './App.css';
import BackButton from './components/BackButton';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  return (
    
    <div className="App">
      
      <h1>WELCOME to Dispute Management System</h1>
      <div>
        <Button onClick = {()=>navigate('/customer/signup')}> SIGNUP </Button>{"  "}
    
        <Button onClick = {()=>navigate('/customer/login')}> LOGIN </Button>
      </div>
      
    </div>
  );
}

export default App;
