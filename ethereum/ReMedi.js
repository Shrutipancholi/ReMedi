import web3 from "./web3";
import ReMedi from "./build/ReMedi.json";

const instance = new web3.eth.Contract(
	ReMedi.abi,
	"0x79E8208d9511337f8C1c5CDeB6c9f320153eDe5b"
);
export default instance;
