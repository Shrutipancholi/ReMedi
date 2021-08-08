import web3 from "./web3";
import ReMedi from "./build/ReMedi.json";

const instance = new web3.eth.Contract(
	ReMedi.abi,
	"0x3338BF7A9D9763400Cc6b92306A6E1dAE53a495F"
);
export default instance;
