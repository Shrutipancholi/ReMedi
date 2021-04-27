import React, { Component } from "react";
import {
	Container,
	Header,
	Button,
	Grid,
	Segment,
	Divider,
	Icon,
	Form,
	Message,
} from "semantic-ui-react";
import { Router } from "../routes";
import Head from "next/head";
import web3 from "../ethereum/web3";
import ReMedi from "../ethereum/ReMedi";
import Layout from "../components/Layout";

class Users extends Component {
	state = {
		patientName: "",
		doctorName: "",
		ploading: false,
		dloading: false,
		perrorMessage: "",
		derrorMessage: "",
	};

	onSubmit = async (event) => {
		event.preventDefault();
		this.setState({ perrorMessage: "" });
		this.setState({ derrorMessage: "" });
		try {
			const accounts = await web3.eth.getAccounts();
			console.log(accounts);
			this.setState({ accounts: accounts });
			if (this.state.patientName !== "") {
				this.setState({ ploading: true });
				await ReMedi.methods
					.create_patient(this.state.patientName)
					.send({ from: accounts[0] });

				Router.pushRoute(`/Patient/${accounts[0]}`);
			} else if (this.state.doctorName !== "") {
				this.setState({ dloading: true });
				await ReMedi.methods
					.create_doctor(this.state.doctorName)
					.send({ from: accounts[0] });
				console.log(this.state.doctorName);
				Router.pushRoute(`/Doctor/${accounts[0]}`);
			}
		} catch (err) {
			if (this.state.patientName !== "")
				this.setState({ perrorMessage: err.message });
			else if (this.state.doctorName !== "")
				this.setState({ derrorMessage: err.message });
		}
		this.setState({ ploading: false });
		this.setState({ dloading: false });
	};

	render() {
		return (
			<Layout>
				<Grid
					textAlign="center"
					style={{ height: "100vh" }}
					verticalAlign="middle"
				>
					<Grid.Column style={{ maxWidth: 750 }}>
						<Header as="h1" color="teal">
							Please select user type
						</Header>

						<Segment placeholder>
							<Grid columns={2} stackable textAlign="center">
								<Divider vertical>Or</Divider>

								<Grid.Row verticalAlign="middle">
									<Grid.Column>
										<Icon name="user" color="blue" size="massive" />
										<Form
											size="large"
											onSubmit={this.onSubmit}
											error={!!this.state.perrorMessage}
										>
											<Form.Field>
												<Form.Input
													icon="user"
													iconPosition="left"
													placeholder="Name"
													value={this.state.patientName}
													onChange={(event) => {
														this.setState({ patientName: event.target.value });
													}}
												/>
											</Form.Field>
											<Message
												error
												header="Oops!"
												content={this.state.perrorMessage}
											/>

											<Button loading={this.state.ploading} color="blue" fluid>
												Register as patinet
											</Button>
										</Form>
										<br />
										<Button
											color="blue"
											fluid
											onClick={async (event) => {
												const accounts = await web3.eth.getAccounts();
												Router.pushRoute(`Patient/${accounts[0]}`);
											}}
										>
											Continue as patinet
										</Button>
									</Grid.Column>

									<Grid.Column>
										<Icon name="doctor" color="green" size="massive" />
										<Form
											size="large"
											onSubmit={this.onSubmit}
											error={!!this.state.derrorMessage}
										>
											<Form.Field>
												<Form.Input
													icon="doctor"
													iconPosition="left"
													patientName="Name"
													value={this.state.doctorName}
													onChange={(event) => {
														this.setState({ doctorName: event.target.value });
													}}
												/>
											</Form.Field>
											<Message
												error
												header="Oops!"
												content={this.state.derrorMessage}
											/>
											<Button loading={this.state.dloading} color="green" fluid>
												Register as doctor
											</Button>
										</Form>
										<br />
										<Button
											color="green"
											fluid
											onClick={async (event) => {
												const accounts = await web3.eth.getAccounts();
												Router.pushRoute(`Doctor/${accounts[0]}`);
											}}
										>
											Continue as docor
										</Button>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>
					</Grid.Column>
				</Grid>
			</Layout>
		);
	}
}

export default Users;
