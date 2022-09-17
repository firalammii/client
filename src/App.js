
import './App.css';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import {TextField} from '@material-ui/core'

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
      <div>
        <TextField 
          type = {"text"}
                id={"middleName"}
                
                label = {"Middle Name"}
                placeholder = {"middle Name"}
                variant = {"outlined"}
                
                
        />

        <TextField
          id="debited-bank"
          select
          required
          label="Debited Bank"
          // value={debitedBank}
          // onChange={(e) => setDebitedBank(e.target.value)}
          helperText="Please select the wrongly debited bank"
        >
          {/* {banks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))} */}
        </TextField>
      </div>
    </div>
  );
}

export default App;
