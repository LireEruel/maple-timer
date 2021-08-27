import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPageView from "./MainPageView.js";

const App = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/" component={MainPageView} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
