import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPageView from "./MainPageView.js";
import PrePageView from "./PrePageView.js";

const App = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/" component={PrePageView} />
					<Route exact path="/main" component={MainPageView} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
