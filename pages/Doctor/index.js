import React, { Component } from "react";
import Layout from "../../components/Layout";
import ReMedi from "../../ethereum/ReMedi";
import {
	Container,
	Card,
	Button,
	Icon,
	Header,
	Segment,
} from "semantic-ui-react";

class DoctorPage extends Component {
	static async getInitialProps(props) {
		const address = props.query.address;
		const files = await ReMedi.methods.getAccessFiles().call({ from: address });
		return { files, address };
	}

	renderFiles() {
		if (this.props.files.length == 0) {
			return (
				<Segment>
					<Header icon textAlign="center">
						<Icon name="pdf file outline" />
						No documents are listed for you.
					</Header>
				</Segment>
			);
		}
		const items = this.props.files.map((file) => {
			return {
				header: file[2],
				description: file[3],
				meta: `From : ${file[1]}`,
				extra: (
					<Container textAlign="center">
						<a href={`https://ipfs.io/ipfs/${file[0]}`} target="_blank">
							<Button color="green" fluid>
								View File
							</Button>
						</a>
					</Container>
				),
				style: { overflowWrap: "break-word" },
			};
		});
		return <Card.Group items={items} />;
	}
	render() {
		return (
			<Layout>
				<h1>Doctor Home Page</h1>
				{this.renderFiles()}
			</Layout>
		);
	}
}

export default DoctorPage;
