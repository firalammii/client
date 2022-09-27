import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import InputAdornment from '@mui/material/InputAdornment';
import { Input, TextField } from '@material-ui/core';


//import { Button, MenuItem, TextField, Box } from '@mui/material';


const estimatedTimes = [
  {
    id: "selectone",
    label: "select one"
  },
  {
    value: 'before-midnight',
    label: 'Before Mid Night'
  },
  {
    value: 'midnight',
    label: 'at Mid Night'
  },
  {
    value: 'after-midnight',
    label: 'After Mid Night'
  },
  {
    value: 'before-noon',
    label: 'Before Noon'
  },
  {
    value: 'noon',
    label: 'at Noon'
  },
  {
    value: 'afternoon',
    label: 'After Noon'
  },
]

const banks = [
  {
    id: "selectone",
    label: "select one"
  },
  {
    id: 'commercial-bank-of-ethiopia',
    label: 'CBE',
    value: 'Commercial Bank of Ethiopia',
  },
  {
    id: 'berhan-bank',
    label: 'Berhan Bank',
    value: 'Berhan Bank',
  },
  {
    id: 'dashen-bank',
    label: 'Dashen Bank',
    value: 'Dashen Bank',
  },
  {
    id: 'oromia-bank',
    label: 'Oromia Bank',
    value: 'Oromia Bank',
  },
  {
    id: 'amhara-bank',
    label: 'Amhara Bank',
    value: 'Amhara Bank',
  },
  {
    id: 'debub-global-bank',
    label: 'Debub Global Bank',
    value: 'Debub Global Bank',
  },
  {
    id: 'oromia-cooperative-bank',
    label: 'COOP',
    value: 'Oromia Cooperative Bank',
  },
  {
    id: 'awash-bank',
    label: 'Awash Bank',
    value: 'Awash Bank',
  },
  {
    id: 'abbysinia-bank',
    label: 'Abbysinia Bank',
    value: 'Abbysinia Bank',
  },
  {
    id: 'hibret-bank',
    label: 'Hibret Bank',
    value: 'Hibret Bank',
  },
];

export default function Request() {

  const [debitedBank, setDebitedBank] = React.useState("");
  const [atmOwnerBank, setAtmOwnerBank] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [debitedDate, setDebitedDate] = React.useState(new Date());
  const [estimatedTime, setEstimatedTime] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [debitedAmount, setDebitedAmount] = React.useState("00");

  const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
  const localUrl = "http://localhost:3000";

  const handleCheck = () => {
    console.log(debitedBank+ "\n" +cardNumber+ "\n" +atmOwnerBank + "\n" +debitedDate + "\n" +estimatedTime + "\n" + debitedAmount)
    if(debitedBank && cardNumber && atmOwnerBank && debitedDate && estimatedTime && debitedAmount !== ""){
      console.log(debitedBank+ "\n" +cardNumber+ "\n" +atmOwnerBank + "\n" +debitedDate + "\n" +estimatedTime + "\n" + debitedAmount)
      setChecked(true)
    }
    else {
      setChecked(false)
      alert("fields cannot be empty")
    }
  }

  const handleSubmit = () => {
    
    if(checked){
      axios
      .post(herokuUrl + "/request/post", {debitedBank, cardNumber, atmOwnerBank, debitedDate, estimatedTime, debitedAmount})
      .then(res => {

        alert("sorry that "+ res.data.result.atmOwnerBank + " wrongly debited " + res.data.result.debitedAmount +
          " from your " + res.data.result.debitedBank +" account");
        
        setAtmOwnerBank("");
        setCardNumber("");
        setChecked(false);
        setDebitedBank("");
        setDebitedDate("");
        setEstimatedTime("");
        setDebitedAmount("00")
          
      })
      .catch(err => console.error(err));
    }
    else {
      alert("fields cannot be empty")
    }
  }


  return (
    <form className= "forminputs" style={{border: "2px solid grey", width: 400}}>
        <TextField
        className= "forminputs"
          id="debited-bank"
          select
          required
          variant={'outlined'}
          label="Debited Bank"
          value={debitedBank}
          onChange={(e) => setDebitedBank(e.target.value)}
          helperText="Please select the wrongly debited bank"
        >
          {banks.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
        className= "forminputs"
          id="card-number"
          required
          autoComplete='off'
          label="Card Number"
          variant={'outlined'}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          helperText="Please enter your card number"
        />
        
        {/* <input
        className= "forminputs"
          id="your-account-number"
          disabled
          required
          label="Your Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          inputProps={{ 'aria-label': 'controlled' }}
          helperText="Your Account Number will be dispalyed Here"
        /> */}

        <TextField
        className= "forminputs"
          id="atm-owner-bank"
          select
          required
          variant={'outlined'}
          label="ATM Owner Bank"
          value={atmOwnerBank}
          onChange={(e)=> setAtmOwnerBank(e.target.value)}
          helperText="Please select the wrongly debited bank"
        >
          {banks.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
        className= "forminputs"
          id="debited-date"
          type="date"
          variant={'outlined'}
          required
          label="dd/mm/yyyy"
          value={debitedDate}
          onChange={(e) => setDebitedDate(e.target.value)}
          helperText="Please select the exact date"
        />
        <TextField
        className= "forminputs"
          id="estimated-time"
          select
          label="Estimated Time"
          variant={'outlined'}
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          helperText="Please select Estimated time"
        >
          {estimatedTimes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>

        <TextField
        className= "forminputs"
          id= "amount-debited"
          type= {"number"}
          required
          label= "Amount"
          value= {debitedAmount}
          variant={'outlined'}
          onChange= {(e) => setDebitedAmount(e.target.value)}

          InputProps={{
            endAdornment: <InputAdornment position="end">ETB</InputAdornment>,
          }}
          helperText="Please enter the wrongly debited amount"
        />
        
      <div>
        <input 
          type= {"checkbox"}
          checked= {checked}
          onChange= {handleCheck}
      />
        {"  "}<label 
            onDoubleClick= { handleCheck}
        >
            I agree that the above informations are correct
        </label>
      </div>
      <div>
        <Button onClick= {handleSubmit}>
            Submit Request
        </Button>
      </div>
      
      
    </form>
  );
}

//export default Request;



