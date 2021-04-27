import React, { Component } from "react";
import { Header, Form, Message, Segment } from "semantic-ui-react";
import ipfsClient from "ipfs-http-client";
import ReMedi from "../../ethereum/ReMedi";
import { Router } from "../../routes";
import Layout from "../../components/Layout";

class Upload extends Component {
	state = {
		buffer: null,
		filehash: "",
		loading: false,
		filename: "",
		filedescription: "",
		errorMessage: "",
	};

	static async getInitialProps(props) {
		const address = props.query.address;
		return { address };
	}

	async uploadfile() {
		this.setState({ perrorMessage: "" });
		try {
			const { filehash, filedescription, filename } = this.state;
			await ReMedi.methods
				.create_file(filehash, filedescription, filename)
				.send({ from: this.props.address });
			Router.pushRoute(`/Patient/${this.props.address}`);
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	}

	onChange = (event) => {
		event.preventDefault();
		const file = event.target.files[0];
		const reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => {
			this.setState({ buffer: Buffer(reader.result) });
		};
	};

	onSubmit = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const ipfs = ipfsClient({
			host: "ipfs.infura.io",
			port: 5001,
			protocol: "https",
		});

		console.log("Submiting the file to IPFS");
		await ipfs.add(this.state.buffer, async (error, result) => {
			console.log("IPFS result", result);
			console.log(result[0].hash);
			this.setState({ filehash: result[0].hash }, () => {
				this.uploadfile();
			});
			if (error) {
				console.log(error);
				return;
			}
		});
	};

	render() {
		return (
			<Layout>
				<Header>Upload file</Header>
				<Segment>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
						<Form.Field>
							<label>Name</label>
							<Form.Input
								value={this.state.filename}
								onChange={(event) => {
									this.setState({ filename: event.target.value });
								}}
							/>
						</Form.Field>
						<Form.Field>
							<label>Description</label>
							<Form.TextArea
								value={this.state.filedescription}
								onChange={(event) => {
									this.setState({ filedescription: event.target.value });
								}}
							/>
						</Form.Field>
						<Form.Field>
							<label>File directory</label>
							<Form.Input type="file" onChange={this.onChange} />
						</Form.Field>
						<Form.Button
							color="blue"
							type="submit"
							loading={this.state.loading}
						>
							Submit
						</Form.Button>
						<Message error header="Oops!" content={this.state.errorMessage} />
					</Form>
				</Segment>
			</Layout>
		);
	}
}

export default Upload;
