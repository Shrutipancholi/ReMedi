import web3 from "./web3";
import ReMedi from "./build/ReMedi.json";

const instance = new web3.eth.Contract(
	ReMedi.abi,
	"0x1eA429D7868ab2B642fB399b30f97b8a431Ac04a"
);
export default instance;
