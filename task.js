const Web3 = require("web3");
const abi_def = require("./abi");
const ava_abi = require("./avaAbi");
const abi = abi_def;

const rpcURL = "https://mainnet.infura.io/v3/21d1df8208a048dfa2fa3acf5ba3776b";
const web3 = new Web3(rpcURL);
const ContractAddress = [
  { abi: abi, Address: "0xeDa3b617646B5fc8C9c696e0356390128cE900F8" },
  { abi: abi, Address: "0xd0F0C40FCD1598721567F140eBf8aF436e7b97cF" },
  { abi: ava_abi, Address: "0x86fc6f6c6702ceF7d3BaE87eF41256715416DB71" },
];

async function getdata() {
  for (let i = 0; i < ContractAddress.length; i++) {
    const contract = new web3.eth.Contract(
      ContractAddress[i].abi,
      ContractAddress[i].Address
    );
    await contract.methods.name().call((err, result) => {
      console.log(result, "name");
    });
    await contract.methods
      .balanceOf("0xD4f0053c4e9c599a719b36dc20d5dEd1198230af")
      .call((err, result) => {
        console.log(result, "Balance");
      });
  }
}

getdata();
