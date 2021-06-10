import web3 from "./web3";
import ReMedi from "./build/ReMedi.json";

const instance = new web3.eth.Contract(
	ReMedi.abi,
	"0x79efDFf9E69dFC7A303a0e7047098156c36fEbCe"
);
export default instance;
