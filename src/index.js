import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import './styles.mobile.css';
import './styles.regular.css';
import App from './App';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const rootElement = document.getElementById("root");
const customHistory = createBrowserHistory({
  // basename: config.urlBasename || ""
});

ReactDOM.render(
  <Router history={customHistory}>
    <Route
      component={({ history }) => {
        window.appHistory = history;
        return <App />;
      }}
    />
  </Router>,
  rootElement
);