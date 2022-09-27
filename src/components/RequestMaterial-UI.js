import React from 'react';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';


import { Button, MenuItem, TextField, Box } from '@material-ui/core';

const heroku_url = "https://dispute-mgt-sys-api.herokuapp.com";
const local_url = "http://localhost:3000";

const estimatedTimes =[
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
    id: 'commercial-bank-of-ethiopia',
    label: 'Commercial Bank of Ethiopia',
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
    label: 'Oromia Cooperative Bank',
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

function Request() {

  const [debitedBank, setDebitedBank] = React.useState("Commercial Bank of Ethiopia");
  const [atmOwnerBank, setAtmOwnerBank] = React.useState("Commercial Bank of Ethiopia");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [debitedDate, setDebitedDate] = React.useState();
  const [estimatedTime, setEstimatedTime] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [debitedAmount, setDebitedAmount] = React.useState("00");

  const handleSubmit = ()=>{
    if(debitedBank || cardNumber || atmOwnerBank || debitedDate || estimatedTime || debitedAmount === ""){
      alert("fields cannot be empty!!");
      return
    }
    axios
      .post(heroku_url + "/request/post", {debitedBank, cardNumber, atmOwnerBank, debitedDate, estimatedTime, debitedAmount})
      .then(res => alert("sorry that "+ res.data.result.atmOwnerBank + " wrongly debited " + res.data.result.debitedAmount +
        " from your " + res.data.result.debitedBank +" account"))
      .catch(err => console.error(err));
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '50ch', height: '6ch'},
      }}
      validate
      autoComplete="on"
      display={'flex'}
      flexDirection={'column'}
      justifyContent= {'center'}
      alignItems={'center'}
      marginTop={"3px"}
      border={"1px solid mediumblue"}

    >
        <TextField
          id="debited-bank"
          
          select
          required
          variant='outlined'
          label="Debited Bank"
          value={debitedBank}
          onChange={(e) => setDebitedBank(e.target.value)}
          helperText="Please select the wrongly debited bank"
        >
          {banks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      
         

        <TextField
          id="card-number"
          required
          
          autoComplete='off'
          variant='outlined'
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          helperText="Please enter your card number"
        />
        
        <TextField
          id="your-account-number"
          disabled
          required
          variant='outlined'
          label="Your Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          inputProps={{ 'aria-label': 'controlled' }}
          helperText="Your Account Number will be dispalyed Here"
        />
        <TextField
          id="atm-owner-bank"
          select
          required
          label="ATM Owner Bank"
          value={atmOwnerBank}
          variant='outlined'
          onChange={(e)=> setAtmOwnerBank(e.target.value)}
          helperText="Please select the wrongly debited bank"
        >
          {banks.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="debited-date"
          type="date"
          required
          label="dd/mm/yyyy"
          variant='outlined'
          value={debitedDate}
          onChange={(e) => setDebitedDate(e.target.value)}
          helperText="Please select the exact date"
        />
        <TextField
          id="estimated-time"
          select
          label="Estimated Time"
          variant='outlined'
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          helperText="Please select Estimated time"
        >
          {estimatedTimes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="amount-debited"
          type={"number"}
          required
          label="Amount"
          variant='outlined'
          value={debitedAmount}
          onChange={(e) => setDebitedAmount(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">ETB</InputAdornment>,
          }}
          helperText="Please enter the wrongly debited amount"
        />
        
      <div>
        <input 
          type={"checkbox"}
          checked={checked}
          onChange={(e) => setChecked(!checked)}
      />
        {"  "}<label 
            onDoubleClick={(e) => setChecked(!checked)}
        >
            I agree that the above informations are correct
        </label>
      </div>
      <div>
        <Button onClick={handleSubmit}>
            Submit Request
        </Button>
      </div>
      
      
    </Box>
  );
}

export default Request;



