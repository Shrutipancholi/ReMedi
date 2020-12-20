import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route path="/" exact component={Login}></Route>
						<Route path="/register" component={Register}></Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
