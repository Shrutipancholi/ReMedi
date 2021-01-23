import web3 from "./web3";

const address = "0x18f724e6D5e93610E70AAff0592dbFD730098Cdf";

const abi = [
	{
		constant: false,
		inputs: [{ name: "x", type: "string" }],
		name: "set",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "get",
		outputs: [{ name: "", type: "string" }],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
];

export default new web3.eth.Contract(abi, address);
