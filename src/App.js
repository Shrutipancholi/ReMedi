import web3 from "./web3";
import "./App.css";
import { Component } from "react";
import storage from "./storage";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
	host: "ipfs.infura.io",
	port: 5001,
	protocol: "https",
});

class App extends Component {
	state = {
		buffer: null,
		filehash: "",
	};

	onChange = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		const reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => {
			this.setState({ buffer: Buffer(reader.result) });
		};
	};

	onSubmit = (event) => {
		event.preventDefault();
		console.log("Submiting the file to IPFS");
		ipfs.add(this.state.buffer, (error, result) => {
			console.log("IPFS result", result);
			console.log(result[0].hash);
			this.setState({ filehash: result[0].hash });
			if (error) {
				console.log(error);
				return;
			}
		});
	};

	render() {
		return (
			<div className="App">
				<h1>IPFS MODULE</h1>
				<br />
				<form onSubmit={this.onSubmit}>
					<input type="file" onChange={this.onChange} />
					<input type="submit" />
				</form>
				<h3>{this.state.filehash}</h3>
			</div>
		);
	}
}

export default App;
