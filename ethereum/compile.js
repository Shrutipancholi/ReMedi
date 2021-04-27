const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const remediPath = path.resolve(__dirname, "contracts", "ReMedi.sol");
const source = fs.readFileSync(remediPath, "utf-8").toString();
var input = {
	language: "Solidity",
	sources: {
		ReMedi: {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			"*": {
				"*": ["*"],
			},
		},
	},
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts.ReMedi;

// abi : output.ReMedi.abi;
// bytecode: output.ReMedi.evm.bytecode.object;
// deployedBytecode : output.ReMedi.evm.deployedBytecode.object;

fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJSONSync(
		path.resolve(buildPath, contract.replace(":", "") + ".json"),
		output[contract]
	);
}
