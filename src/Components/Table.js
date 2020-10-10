import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 600
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: `10px`,
    height: "100%",
    width: "99%",
    marginTop: theme.spacing(7)
  },
  link: {
    color: "rgba(0,0,0,0.65)",
    textDecoration: "none",
    marginLeft: "10%",
    alignSelf: "flex-start",
    "&:hover": {
      color: "rgba(0,0,0,1)"
    }
  }
}));

export default function SimpleTable() {
  const classes = useStyles();

  const [data, upDateData] = React.useState([]);
  const [firstLoad, setLoad] = React.useState(true);
  let isLoading = true;

  async function sampleFunc() {
    let response = await fetch("/message");
    let body = await response.json();
    upDateData(body);
  }

  if (firstLoad) {
    sampleFunc();
    setLoad(false);
  }

  if (data.length > 0) isLoading = false;

  return (
    <div className={classes.paper}>

      <Typography component="h1" variant="h5">
        List of Links
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          style={{ width: "80%", margin: "0 10px" }}
          component={Paper}
        >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Link Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map(row => (
                <TableRow key={row.name}>

					{((row.status === 0)?
								 <TableCell align="center"><a target="_blank" href='/notFound' rel="noopener noreferrer">{row.displayName}</a></TableCell>

				           :     ((row.messageType === 1)?
				                  <TableCell align="center"><a target="_blank" href={'/viewMsg?id=' + row.messageId} rel="noopener noreferrer">{row.displayName}</a></TableCell>
				:
					                  <TableCell align="center"><Link to={{ pathname: "https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies" }} target="_blank" /><a target="_blank" href={row.messageValue} rel="noopener noreferrer">{row.displayName}</a></TableCell>
				))
}
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Link className={classes.link} to="/add">
        {" "}
        <Typography align="left">
          &#x2190; Add more links
        </Typography>{" "}
      </Link>
    </div>
  );
}
