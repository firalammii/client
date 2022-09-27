import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
  const classes = useStyles();
const [mdate, setDate] = React.useState();

  return (<>
    <form  noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        variant="outlined"
        value = {mdate}
        defaultValue="2017-05-24"
        onChange={(e)=>setDate(e.target.value)}
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={() => document.getElementById("pa").innerHTML={mdate}}> display </Button>
    </form>
    <p id="pa">here</p>
    </>
  );
}
