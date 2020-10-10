import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  }
}));

export default function AddEmployee() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("1998-04-02T21:11:54")
  );
  const [displayName, setDisplayName] = React.useState("");
  const [messageValue, setMessageValue] = React.useState("");
  const [messageLife, setMessageLife] = React.useState("");
  const [messageLifeUnit, setMessageLifeUnits] = React.useState("1");
  const [messageType, setMessageType] = React.useState("1");

  const handleDateChange = date => setSelectedDate(date);
  const handleNameChange = event => setDisplayName(event.target.value);
  const handleMessageValueChange = event => setMessageValue(event.target.value);
  const handleMessageLifeChange = event => setMessageLife(event.target.value);
  const handleMessageLifeUnitChange = event => setMessageLifeUnits(event.target.value);
  const handleMessageTypeChange = event => setMessageType(event.target.value);

  const [message, setMessage] = React.useState("Nothing saved in the session");

  async function sampleFunc(toInput) {
    const response = await fetch("/message", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(toInput) // body data type must match "Content-Type" header
    });
    let body = await response.json();
    console.log(body.messageId);
    setMessage(body.messageId ? "Data sucessfully updated" : "Data updation failed");
  }

  const handleSubmit = variables => {
    const toInput = { displayName, messageValue, messageLife, messageLifeUnit,messageType };
    sampleFunc(toInput);
    setDisplayName("");
    setMessageValue("");
    setMessageLife("");
    setMessageLifeUnits("")
    setMessageType("");
  };

  if (firstLoad) {
    // sampleFunc();
    setLoad(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Links
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                value={displayName}
                label="Name"
                name="displayName"
                autoComplete="displayName"
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="Message Value"
                name="messageValue"
                variant="outlined"
                required
                fullWidth
                value={messageValue}
                id="messageValue"
                label="Message Value"
                onChange={handleMessageValueChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="messageLife"
                value={messageLife}
                label="Life"
                name="messageLife"
                autoComplete="messageLife"
                onChange={handleMessageLifeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
			  <Select
				   value={messageLifeUnit}
				   onChange={handleMessageLifeUnitChange}
				   displayEmpty
				   className={classes.selectEmpty}
				   inputProps={{ 'aria-label': 'Without label' }}
			  >
			   <MenuItem value={1}>Minutes</MenuItem>
			   <MenuItem value={2}>Hours</MenuItem>
			   <MenuItem value={3}>Days</MenuItem>
			  </Select>
            </Grid>
	        <Grid item xs={12} sm={6}>
			     <InputLabel>
			          Type of Link
     			 </InputLabel>
            </Grid>

            <Grid item xs={12} sm={6}>
			  <Select
				   value={messageType}
				   onChange={handleMessageTypeChange}
				   displayEmpty
				   className={classes.selectEmpty}
				   inputProps={{ 'aria-label': 'Without label' }}
			  >
			   <MenuItem value={1}>Message</MenuItem>
			   <MenuItem value={2}>URL</MenuItem>
			  </Select>
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventDefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Save
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Link to="/view">View Links</Link>
            </Grid>
          </Grid>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}
