const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledReMedi = require("../ethereum/build/ReMedi.json");

let accounts;
let remedi;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();
	remedi = await new web3.eth.Contract(compiledReMedi.abi)
		.deploy({ data: compiledReMedi.evm.deployedBytecode.object })
		.send({ from: accounts[0], gas: "30000000" });
});

describe("ReMedi", () => {
	it("deploys the contract", () => {
		assert.ok(remedi.options.address);
	});

	it("creates a patient", async () => {
		await remedi.methods
			.create_patient("Rohan")
			.send({ from: accounts[0], gas: "3000000" });
		const patient = await remedi.methods.patients(accounts[0]).call();
		assert.equal(patient.Patient_id, accounts[0]);
	});

	it("creates a file", async () => {
		await remedi.methods
			.create_patient("Rohan")
			.send({ from: accounts[0], gas: "3000000" });
		await remedi.methods
			.create_file("101", "F1 from P1", "F1")
			.send({ from: accounts[0], gas: "3000000" });
		const file = await remedi.methods.getFiles(accounts[0]).call();
		assert.equal(file[0].File_id, "101");
	});

	it("gives file access", async () => {
		await remedi.methods
			.create_patient("Patient 1")
			.send({ from: accounts[0], gas: "3000000" });

		await remedi.methods
			.create_file("101", "F1 from P1", "F1")
			.send({ from: accounts[0], gas: "3000000" });

		await remedi.methods
			.create_doctor("Doctor 1")
			.send({ from: accounts[1], gas: "3000000" });

		await remedi.methods
			.grant_FileAccess(accounts[1], "101")
			.send({ from: accounts[0], gas: "3000000" });

		const files = await remedi.methods
			.getAccessFiles(accounts[1])
			.call({ from: accounts[1], gas: "3000000" });

		assert.ok(files.length !== 0);
	});

	it("denies file access", async () => {
		await remedi.methods
			.create_patient("Patient 1")
			.send({ from: accounts[0], gas: "3000000" });

		await remedi.methods
			.create_file("101", "F1 from P1", "F1")
			.send({ from: accounts[0], gas: "3000000" });

		await remedi.methods
			.create_doctor("Doctor 1")
			.send({ from: accounts[1], gas: "3000000" });

		await remedi.methods
			.grant_FileAccess(accounts[1], "101")
			.send({ from: accounts[0], gas: "3000000" });

		await remedi.methods
			.denied_FileAccess(accounts[1], "101")
			.send({ from: accounts[0], gas: "3000000" });

		const files = await remedi.methods
			.getAccessFiles(accounts[1])
			.call({ from: accounts[1], gas: "3000000" });

		assert.ok(files.length === 0);
	});
});
