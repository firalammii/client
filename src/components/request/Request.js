import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import "../css/inputs.css";

//import InputAdornment from '@mui/material/InputAdornment';
//import { Input, TextField } from '@material-ui/core';
//import { Button, MenuItem, TextField, Box } from '@mui/material';

const estimatedTimes = [
  {
    id: "selectone",
    label: "select one"
  },
  {
    
    id: 'before-midnight',
    label: 'Before Mid Night',
    value: 'Before Mid Night'
  },
  {
    id: 'midnight',
    label: 'at Mid Night',
    value: 'at Mid Night'
  },
  {
    id: 'after-midnight',
    label: 'After Mid Night',
    value: 'After Mid Night'
  },
  {
    id: 'before-noon',
    label: 'Before Noon',
    value: 'Before Noon'
  },
  {
    id: 'noon',
    label: 'at Noon',
    value: 'at Noon'
  },
  {
    id: 'afternoon',
    label: 'After Noon',
    value: 'After Noon'
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

const herokuUrl = "https://dispute-api.herokuapp.com";
const localUrl = "http://localhost:3000";

export default function Request() {

  const [debitedBank, setDebitedBank] = React.useState("");
  const [atmOwnerBank, setAtmOwnerBank] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [debitedDate, setDebitedDate] = React.useState();
  const [estimatedTime, setEstimatedTime] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [debitedAmount, setDebitedAmount] = React.useState("00");

  const handleCheck = () => {
    // console.log(debitedBank+ "\n" +cardNumber+ "\n" +atmOwnerBank + "\n" +debitedDate + "\n" +estimatedTime + "\n" + debitedAmount)
    if(debitedBank !== "" && cardNumber !== "" && atmOwnerBank !== "" &&
    debitedDate !== "" && estimatedTime !== "" && !(debitedAmount === "00" || debitedAmount === "")){
      // console.log("all different from empty "+debitedBank+ "\n" +cardNumber+ "\n" +atmOwnerBank + "\n" +debitedDate + "\n" +estimatedTime + "\n" + debitedAmount)
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
      .post(herokuUrl + "/request/post", {
        debitedBank, cardNumber, atmOwnerBank, 
        debitedDate, estimatedTime, debitedAmount})
      .then(res => {
        alert("sorry that "+ res.data.result.atmOwnerBank + " wrongly debited ETB: " + 
        res.data.result.debitedAmount + " from your " + res.data.result.debitedBank +
        " account! \n ------------------------------------\n Request is successfully sent");
        
        setAtmOwnerBank("");
        setCardNumber("");
        setChecked(false);
        setDebitedBank("");
        setDebitedDate("");
        setEstimatedTime("");
        setDebitedAmount("00")
          
      })
      .catch(err => alert(err.message));
    }
    else {
          // console.log("empty fields "+debitedBank+ "\n" +cardNumber+ 
          // "\n" +atmOwnerBank + "\n" +debitedDate + "\n" +estimatedTime + "\n" + debitedAmount)
      alert("Please make sure the checkbox is checked!!")
    }
  }


  return (
    <section className="section">
      <form title='Fill your dispute request'
        style={
          {
            border: "2px solid grey", width: "auto", alignItems: "stretch",
            margin: "0.5rem", padding: "0.5rem 0.5rem", display: "flex", flexDirection: "column",
            borderRadius: "0.5rem",
          }
        }
      >
        <h4 
          style={
          {
            textAlign: "center", justifyContent: "center", display: "flex", flexDirection: "column",
            backgroundColor: "GrayText",height:"3rem", padding: "1rem", border: "1px solid grey", borderRadius: "0.5rem",
          }
        }
        >
          Request Form
        </h4>
        <label htmlFor="debited-bank">Debited Bank: </label>
        <select
          className= "inputs"
          id="debited-bank"
          disabled ={checked}
          required
          variant={'outlined'}
          label="Debited Bank"
          value={debitedBank}
          onChange={(e) => setDebitedBank(e.target.value)}
          helpertext="Please select the wrongly debited bank"
        >
          {banks.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label htmlFor="card-number">Card Number: </label>
        <input
          className= "inputs"
          id="card-number"
          type={"number"}
          required
          disabled ={checked}
          autoComplete='off'
          label="Card Number"
          variant={'outlined'}
          placeholder="1234623529870254"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          helpertext="Please enter your card number"
        />
        
        {/* <input
          className= "inputs"
          id="your-account-number"
          disabled
          required
          label="Your Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          inputProps={{ 'aria-label': 'controlled' }}
          helperText="Your Account Number will be dispalyed Here"
        /> */}

        <label htmlFor="atm-owner-bank">ATM Owner Bank: </label>
        <select
          className= "inputs"
          id="atm-owner-bank"
          disabled ={checked}
          required
          variant={'outlined'}
          label="ATM Owner Bank"
          value={atmOwnerBank}
          onChange={(e)=> setAtmOwnerBank(e.target.value)}
          helpertext="Please select the wrongly debited bank"
        >
          {banks.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label htmlFor="debited-date">Debited Date: </label>
        <input
          className= "inputs"
          id="debited-date"
          type="date"
          variant={'outlined'}
          required
          disabled ={checked}
          label="dd/mm/yyyy"
          value={debitedDate}
          onChange={(e) => setDebitedDate(e.target.value)}
          helpertext="Please select the exact date"
        />

        <label htmlFor="estimated-time">Estimated Time: </label>
        <select
          className= "inputs"
          id="estimated-time"
          disabled ={checked}
          label="Estimated Time"
          variant={'outlined'}
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          helpertext="Please select Estimated time"
        >
          {estimatedTimes.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label htmlFor="amount-debited">Debited Amount: </label>
        <input
          className= "inputs"
          id= "amount-debited"
          type= {"number"}
          required
          disabled ={checked}
          label= "Amount"
          value= {debitedAmount}
          variant={'outlined'}
          onChange= {(e) => setDebitedAmount(e.target.value)}

          // InputProps={{
          //   endAdornment: <InputAdornment position="end">ETB</InputAdornment>,
          // }}
          // helperText="Please enter the wrongly debited amount"
        />
        <span>
          <input 
            type= {"checkbox"}
            checked= {checked}
            onChange= {handleCheck}
          />
          {" "}
          <label style={{display:"inline"}}
            onDoubleClick= { handleCheck}
          >
            I agree that the above informations are correct
          </label>
        </span>

        <Button  className="buttons" onClick= {handleSubmit}>
          Submit Request
        </Button>

      </form>
    </section>
  );
}

//export default Request;



