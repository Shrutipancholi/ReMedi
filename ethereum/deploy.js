// deployed contract address = 0x1eA429D7868ab2B642fB399b30f97b8a431Ac04a

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledRemedi = require("./build/ReMedi.json");

const provider = new HDWalletProvider(
	"alpha bring team town benefit name april enrich soul picture solar believe",
	"https://rinkeby.infura.io/v3/e2644903d71c4c1faa5e38782db313f9"
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log("Attempting to deploy from accounts ", accounts[0]);

	const result = await new web3.eth.Contract(compiledRemedi.abi)
		.deploy({ data: compiledRemedi.evm.bytecode.object })
		.send({ from: accounts[0] });

	console.log("Contract deployed to", result.options.address);
};

deploy();
