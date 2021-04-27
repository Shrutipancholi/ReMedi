import React, { Component } from "react";
import ReMedi from "../../ethereum/ReMedi";
import {
	Card,
	Container,
	Header,
	Button,
	Icon,
	Segment,
} from "semantic-ui-react";
import { Link } from "../../routes";
import Layout from "../../components/Layout";

class PatientPage extends Component {
	static async getInitialProps(props) {
		const address = props.query.address;
		const files = await ReMedi.methods.getFiles().call({ from: address });
		return { files, address };
	}

	renderFiles() {
		if (this.props.files.length == 0) {
			return (
				<Segment>
					<Header icon textAlign="center">
						<Icon name="pdf file outline" />
						No documents are uploaded.
					</Header>
				</Segment>
			);
		}
		console.log(this.props.info);
		const items = this.props.files.map((file) => {
			return {
				header: file[2],
				description: file[3],
				extra: (
					<Container textAlign="center">
						<a href={`https://www.ipfs.io/ipfs/${file[0]}`}>
							<Button primary>View File</Button>
						</a>
						<Button onClick={() => navigator.clipboard.writeText(file[0])}>
							Copy File Hash
						</Button>
					</Container>
				),
			};
		});
		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<Link route={`/Patient/${this.props.address}/upload`}>
					<a>
						<Button icon primary labelPosition="right">
							Upload File
							<Icon name="upload" />
						</Button>
					</a>
				</Link>

				<Link route={`/Patient/${this.props.address}/access`}>
					<a>
						<Button icon labelPosition="right" style={{ marginTop: "2em" }}>
							Access Menu
							<Icon name="right arrow" />
						</Button>
					</a>
				</Link>
				<Header>Patient Home Page</Header>
				{this.renderFiles()}
			</Layout>
		);
	}
}

export default PatientPage;
