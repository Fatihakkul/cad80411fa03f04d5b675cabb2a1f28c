import React from "react"
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Home from "./components/Home";
import PreviewReservation from "./components/PreviewReservation";
import "./App.scss"


function App() {
  return (
    <div className="full-screen-container">
      <Helmet>
        <title>Otel Rezervasyon Sistemi</title>
      </Helmet>
      <Switch>
        <Route path='/preview' component={PreviewReservation} />
        <Route path="/" exact component={Home} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default withRouter(App);
