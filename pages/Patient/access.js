import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Header, Message, Tab } from "semantic-ui-react";
import ReMedi from "../../ethereum/ReMedi";

class Access extends Component {
	state = { doctor: "", filehash: "", loading: "", errorMessage: "" };

	static async getInitialProps(props) {
		const address = props.query.address;
		return { address };
	}

	renderGrantAccess = () => {
		return (
			<Tab.Pane attached={false}>
				<Header>Grant File Access</Header>
				<Form onSubmit={this.GrantAccess} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Doctor Account Address</label>
						<Form.Input
							value={this.state.doctor}
							onChange={(event) => {
								this.setState({ doctor: event.target.value });
							}}
						/>
					</Form.Field>
					<Form.Field>
						<label>File Hash</label>
						<Form.Input
							value={this.state.filehash}
							onChange={(event) => {
								this.setState({ filehash: event.target.value });
							}}
						/>
					</Form.Field>
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Form.Button loading={this.state.loading} color="blue" type="submit">
						Grant Access
					</Form.Button>
				</Form>
			</Tab.Pane>
		);
	};

	renderRevokeAccess = () => {
		return (
			<Tab.Pane attached={false}>
				<Header>Revoke File Access</Header>
				<Form onSubmit={this.RevokeAccess} error={!!this.state.errorMessage}>
					<Form.Field>
						<label>Doctor Account Address</label>
						<Form.Input
							value={this.state.doctor}
							onChange={(event) => {
								this.setState({ doctor: event.target.value });
							}}
						/>
					</Form.Field>
					<Form.Field>
						<label>File Hash</label>
						<Form.Input
							value={this.state.filehash}
							onChange={(event) => {
								this.setState({ filehash: event.target.value });
							}}
						/>
					</Form.Field>
					<Message error header="Oops!" content={this.state.errorMessage} />
					<Form.Button loading={this.state.loading} color="blue" type="submit">
						Revoke Access
					</Form.Button>
				</Form>
			</Tab.Pane>
		);
	};

	renderControls = () => {
		const panes = [
			{
				menuItem: "Grant File Access",
				render: () => {
					return this.renderGrantAccess();
				},
			},
			{
				menuItem: "Revoke File Access",
				render: () => {
					return this.renderRevokeAccess();
				},
			},
		];

		return <Tab menu={{ secondary: true }} panes={panes} />;
	};

	GrantAccess = async (event) => {
		event.preventDefault();
		this.setState({ loading: true, errorMessage: "" });
		try {
			await ReMedi.methods
				.grant_FileAccess(this.state.doctor, this.state.filehash)
				.send({ from: this.props.address });
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	RevokeAccess = async (event) => {
		event.preventDefault();
		this.setState({ loading: true, errorMessage: "" });
		try {
			await ReMedi.methods
				.denied_FileAccess(this.state.doctor, this.state.filehash)
				.send({ from: this.props.address });
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	};

	render() {
		return (
			<Layout>
				<Header>Access Control</Header>
				{this.renderControls()}
			</Layout>
		);
	}
}

export default Access;
