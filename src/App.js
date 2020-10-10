import React, { Component } from "react";
import AddLink from "./Components/AddLink";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Table from "./Components/Table";
import MessageView from "./Components/MessageView";

const PageNotFound = () => {  return (    <h3>404 - Not found</h3>  );};
class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/add" component={AddLink} />
        <Route exact path="/view" component={Table} />
        <Route exact path="/viewMsg" component={MessageView} />
        <Route exact path="/notFound" component={PageNotFound} />
      </Router>
    );
  }
}

export default App;
